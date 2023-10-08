import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
// 报错，需要安装Node类型声明文件：pnpm i -D @types/node
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 5273,
  },
});
