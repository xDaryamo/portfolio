// @ts-check
import { defineConfig } from 'astro/config';

export default defineConfig({
 
  server: {
    host: true,        
    allowedHosts: true  
  },

  preview: {
    host: true,
    allowedHosts: true
  }
});