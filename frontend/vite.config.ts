import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api/uapi/": {
        target: "https://openapi.koreainvestment.com:9443",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
        secure: false,
      },
      "/api": {
        target: "https://j11b201.p.ssafy.io/",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, "/api"),
        secure: false,
      },
    },
    port: 3000,
  },
});
