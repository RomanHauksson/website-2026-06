// @ts-check
import { defineConfig, fontProviders } from 'astro/config';

import mdx from '@astrojs/mdx';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  integrations: [mdx()],
  fonts: [{
    provider: fontProviders.google(),
    name: "Space Grotesk",
    cssVariable: "--font-space-grotesk"
  }],
  vite: {
    plugins: [tailwindcss()]
  }
});