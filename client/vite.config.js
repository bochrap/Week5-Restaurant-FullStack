import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve("index.html"),
        menu: resolve("menu.html"),
        contact: resolve("contact.html"),
        basket: resolve("basket.html"),
      },
    },
  },
});
