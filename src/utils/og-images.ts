import fs from 'node:fs/promises';
import path from 'node:path';

const CACHE_DIR = path.join(process.cwd(), 'node_modules', '.cache');
const CACHE_FILE = path.join(CACHE_DIR, 'og-images.json');

let memoryCache: Record<string, string | null> | null = null;
let savePromise: Promise<void> | null = null;

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
    // Simple debounce/locking to avoid writing too often
    if (savePromise) return;

    savePromise = (async () => {
        await new Promise(resolve => setTimeout(resolve, 500)); // Debounce
        await ensureCache();
        await fs.writeFile(CACHE_FILE, JSON.stringify(memoryCache, null, 2));
        savePromise = null;
    })();
}

export async function fetchOgImage(url: string, retries = 3): Promise<string | null> {
  const cache = await getCache();
  if (url in cache) {
    return cache[url];
  }

  for (let i = 0; i < retries; i++) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000); // 8 seconds timeout

    try {
      const response = await fetch(url, {
        signal: controller.signal,
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }
      });
      
      clearTimeout(timeoutId);

      if (response.ok) {
        const html = await response.text();
        const match = html.match(/<meta property="og:image" content="([^"]+)"/);
        const imageUrl = match ? match[1] : null;

        // Save to cache (only if we found something or explicitly want to cache nulls, 
        // here we cache whatever we found, even if it is null, to avoid re-fetching empty ones?)
        // The original code returned null if not found.
        // If we cache null, we stop trying to fetch it.
        // If the user adds an image later to the external site, we might miss it.
        // But for performance, caching null is better. 
        // Let's cache the result, whatever it is.
        
        // Wait, if imageUrl is null, maybe we shouldn't cache it permanently?
        // But if we don't, we keep hitting the URL.
        // Let's cache it.
        cache[url] = imageUrl;
        saveCache();
        return imageUrl;
      }
    } catch (error) {
      clearTimeout(timeoutId);
      const isLastAttempt = i === retries - 1;
      
      if (error instanceof Error && error.name === 'AbortError') {
        console.warn(`Timeout fetching OG image for ${url} (Attempt ${i + 1}/${retries})`);
      } else {
        console.error(`Error fetching OG image for ${url} (Attempt ${i + 1}/${retries}):`, error);
      }

      if (isLastAttempt) {
          // If all retries fail, maybe we shouldn't cache the failure?
          // Or we should? If it's a network error, maybe not.
          return null;
      }
      
      // Wait 1 second before retrying
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }
  return null;
}
