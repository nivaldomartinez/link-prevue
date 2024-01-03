import { defineConfig } from "vite";
import vue2 from "@vitejs/plugin-vue2";
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue2(), cssInjectedByJsPlugin()],
  build: {
    lib: {
      entry: "./src/index.js",
      name: "link-prevue",
      fileName: "link-prevue",
    },
    rollupOptions: {
      external: ["vue"],
      output: {
        globals: {
          vue: "vue",
        },
      },
    },
  },
});
