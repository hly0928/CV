import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import node from '@astrojs/node';

export default defineConfig({
  site: 'https://cv.hly0928.com',
  output: 'server',
  integrations: [mdx(), sitemap()],
  vite: { plugins: [tailwindcss()] },
  adapter: node({ mode: 'standalone' }),
  server: { host: '0.0.0.0' },
});
