// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  vite: {
      server: {
        allowedHosts: true // Permette tutti gli host per il dev server
      },
      preview: {
        allowedHosts: true // Permette tutti gli host per astro preview
      }
  }
});
