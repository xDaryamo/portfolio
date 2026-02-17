import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';

const CACHE_DIR = path.join(process.cwd(), 'node_modules', '.cache');
const CACHE_FILE = path.join(CACHE_DIR, 'og-images.json');
const OG_ASSETS_DIR = path.join(process.cwd(), 'public', 'og-images');

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

async function ensureDir(dir: string) {
  try {
    await fs.mkdir(dir, { recursive: true });
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
        await ensureDir(CACHE_DIR);
        await fs.writeFile(CACHE_FILE, JSON.stringify(memoryCache, null, 2));
        savePromise = null;
    })();
}

async function downloadAndSaveImage(imageUrl: string, originalUrl: string): Promise<string | null> {
    try {
        await ensureDir(OG_ASSETS_DIR);
        
        // Generate a safe filename based on original URL
        const hash = crypto.createHash('md5').update(originalUrl).digest('hex');
        
        // Improved extension logic
        let ext = 'png'; // Default
        const urlObj = new URL(imageUrl);
        const pathname = urlObj.pathname;
        const lastDotIndex = pathname.lastIndexOf('.');
        if (lastDotIndex !== -1) {
            const possibleExt = pathname.substring(lastDotIndex + 1).toLowerCase();
            if (['png', 'jpg', 'jpeg', 'webp', 'gif', 'svg'].includes(possibleExt)) {
                ext = possibleExt;
            }
        }

        const filename = `${hash}.${ext}`;
        const filePath = path.join(OG_ASSETS_DIR, filename);
        const localPath = `/og-images/${filename}`;
        
        // Check if file already exists
        try {
            await fs.access(filePath);
            return localPath;
        } catch {
            // Not found, proceed to download
        }

        console.log(`[OG-Image] Downloading: ${imageUrl} to ${filename}`);
        const response = await fetch(imageUrl);
        if (!response.ok) throw new Error(`Failed to download: ${response.statusText}`);
        
        const buffer = await response.arrayBuffer();
        await fs.writeFile(filePath, Buffer.from(buffer));
        
        return localPath;
    } catch (error) {
        console.error(`[OG-Image] Error saving image for ${originalUrl}:`, error);
        return null; // Return null instead of fallback to remote URL to avoid caching the bad result
    }
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
           return await downloadAndSaveImage(imageUrl, url);
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
  
  // If we have a cache entry AND it points to a local image, use it.
  // Otherwise, we re-fetch to try to get a local copy.
  if (url in cache && cache[url]?.startsWith('/og-images/')) {
    return cache[url];
  }

  // Wrap the fetch in the concurrency limiter
  return limitConcurrency(async () => {
      // Double check cache inside the lock
      if (url in cache && cache[url]?.startsWith('/og-images/')) {
        return cache[url];
      }

      const result = await fetchWithRetry(url, retries);
      
      if (result) {
          cache[url] = result;
          saveCache();
      }
      
      return result;
  });
}
