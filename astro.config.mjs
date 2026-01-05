// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  vite: {
    preview: {
      allowedHosts: ['staging.dariomazza.net', 'dariomazza.net']
    },
    server: {
      allowedHosts: ['staging.dariomazza.net', 'dariomazza.net']
    }
  }
});
