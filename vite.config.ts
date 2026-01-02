import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/hotpepper": {
        target: "https://webservice.recruit.co.jp",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/hotpepper/, ""),
      },
    },
  },
});
