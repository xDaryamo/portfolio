// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import icon from 'astro-icon';

// https://astro.build/config
export default defineConfig({
  integrations: [react({ jsxRuntime: 'classic' }), icon()],
  
  server: {
    host: true,        
    allowedHosts: true  
  },

  preview: {
    host: true,
    allowedHosts: true
  }
});
