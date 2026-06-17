// @ts-check
import { defineConfig, fontProviders } from 'astro/config';

import mdx from '@astrojs/mdx';

import tailwindcss from '@tailwindcss/vite';

// Wraps each link's contents in a <span> so the span can be rotated on hover
// while the <a> itself stays put — giving the link a stable hitbox. Also tags
// successive links with alternating spin directions.
function rehypeSpinLinks() {
  return (tree) => {
    let count = 0;
    const walk = (node) => {
      if (!node.children) return;
      for (const child of node.children) {
        if (child.type === 'element' && child.tagName === 'a') {
          child.properties ??= {};
          child.properties['data-spin'] = count++ % 2 === 0 ? 'cw' : 'ccw';
          child.children = [{
            type: 'element',
            tagName: 'span',
            properties: { className: ['link-inner'] },
            children: child.children,
          }];
        }
        walk(child);
      }
    };
    walk(tree);
  };
}

// https://astro.build/config
export default defineConfig({
  integrations: [mdx({ rehypePlugins: [rehypeSpinLinks] })],
  fonts: [{
    provider: fontProviders.google(),
    name: "Space Grotesk",
    cssVariable: "--font-space-grotesk"
  }],
  vite: {
    plugins: [tailwindcss()]
  }
});