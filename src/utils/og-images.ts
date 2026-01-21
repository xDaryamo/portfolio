import fs from 'node:fs/promises';
import path from 'node:path';

const CACHE_DIR = path.join(process.cwd(), 'node_modules', '.cache');
const CACHE_FILE = path.join(CACHE_DIR, 'og-images.json');

let memoryCache: Record<string, string | null> | null = null;
let savePromise: Promise<void> | null = null;

// Concurrency Control
const queue: (() => Promise<void>)[] = [];
let running = 0;
const MAX_CONCURRENCY = 2; // Limit to 2 parallel requests

async function processQueue() {
  if (running >= MAX_CONCURRENCY || queue.length === 0) return;
  
  running++;
  const task = queue.shift();
  
  if (task) {
    try {
      await task();
    } finally {
      running--;
      processQueue();
    }
  }
}

function limitConcurrency<T>(fn: () => Promise<T>): Promise<T> {
  return new Promise((resolve, reject) => {
    queue.push(async () => {
      try {
        resolve(await fn());
      } catch (e) {
        reject(e);
      }
    });
    processQueue();
  });
}

async function ensureCache() {
  try {
    await fs.mkdir(CACHE_DIR, { recursive: true });
  } catch (e) {
    // Ignore error if it already exists
  }
}

async function getCache() {
  if (memoryCache) return memoryCache;
  try {
    const data = await fs.readFile(CACHE_FILE, 'utf-8');
    memoryCache = JSON.parse(data);
  } catch {
    memoryCache = {};
  }
  return memoryCache!;
}

async function saveCache() {
    if (!memoryCache) return;
    if (savePromise) return;

    savePromise = (async () => {
        await new Promise(resolve => setTimeout(resolve, 500)); // Debounce
        await ensureCache();
        await fs.writeFile(CACHE_FILE, JSON.stringify(memoryCache, null, 2));
        savePromise = null;
    })();
}

async function fetchWithRetry(url: string, retries: number): Promise<string | null> {
  for (let i = 0; i < retries; i++) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 seconds timeout

    try {
      // Add a small random delay before request to avoid thundering herd
      await new Promise(r => setTimeout(r, Math.random() * 1000));
      
      console.log(`[OG-Image] Fetching: ${url} (Attempt ${i + 1}/${retries})`);
      
      const response = await fetch(url, {
        signal: controller.signal,
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; PortfolioBot/1.0; +http://localhost)'
        }
      });
      
      clearTimeout(timeoutId);

      if (response.ok) {
        const html = await response.text();
        const match = html.match(/<meta property="og:image" content="([^"]+)"/);
        const imageUrl = match ? match[1] : null;
        
        if (imageUrl) {
           console.log(`[OG-Image] Found: ${url} -> ${imageUrl}`);
           return imageUrl;
        }
      }
      
      if (response.status === 429) {
          console.warn(`[OG-Image] Rate limited for ${url}. Waiting longer...`);
          await new Promise(r => setTimeout(r, 5000)); // Wait 5s on rate limit
      }

    } catch (error) {
      clearTimeout(timeoutId);
      const isLastAttempt = i === retries - 1;
      
      if (error instanceof Error && error.name === 'AbortError') {
        console.warn(`[OG-Image] Timeout: ${url}`);
      } else {
        console.error(`[OG-Image] Error fetching ${url}:`, error);
      }

      if (isLastAttempt) return null;
      
      // Wait 2 seconds before retrying
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
  }
  return null;
}

export async function fetchOgImage(url: string, retries = 3): Promise<string | null> {
  const cache = await getCache();
  if (url in cache) {
    return cache[url];
  }

  // Wrap the fetch in the concurrency limiter
  return limitConcurrency(async () => {
      // Double check cache inside the lock (in case another parallel request solved it)
      if (url in cache) return cache[url];

      const result = await fetchWithRetry(url, retries);
      
      // Cache the result (even if null, to avoid constant refetching of bad URLs? 
      // No, let's only cache successes for now, or the user will never see it if it failed once).
      // Actually, if we succeed, we save.
      if (result) {
          cache[url] = result;
          saveCache();
      }
      
      return result;
  });
}
