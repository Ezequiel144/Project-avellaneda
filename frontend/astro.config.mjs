// @ts-check
import netlify from "@astrojs/netlify";
import react from "@astrojs/react";
import { defineConfig } from "astro/config";

import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  integrations: [react()],
  vite: {
    plugins: [tailwindcss()],
  },
  output: "server",
  /* adapter: node({
    mode: "standalone",
  }), */
  adapter: netlify(),
});
