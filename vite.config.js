import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

// https://vite.dev/config/
export default defineConfig({
  base: "/", // 깃헙 액션 CI/CD 경로 설정
  // npm install vite-plugin-svgr --save-dev
  plugins: [react(), svgr()],
  define: {
    // "process.env": env,
    // __APP_ENV__: process.env.VITE_VERCEL_ENV,
  },
});
