import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueDevTools from "vite-plugin-vue-devtools";
import { ViteImageOptimizer } from "vite-plugin-image-optimizer";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    ViteImageOptimizer({
      jpg: { quality: parseInt(process.env.VITE_IMAGE_QUALITY || "85") },
      png: { quality: parseInt(process.env.VITE_IMAGE_QUALITY || "85") },
      webp: { quality: parseInt(process.env.VITE_IMAGE_QUALITY || "85") },
    }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
