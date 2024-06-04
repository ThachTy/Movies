import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  resolve: {
    alias: {
      "@": "/src",
      "@components": "/src/components",
      "@config": "/src/config",
      "@layouts": "/src/layouts",
      "@templates": "/src/templates",
      "@features": "/src/features",
      "@pages": "/src/pages",
      "@interfaces": "/src/interfaces",
      "@base": "/src/base",
    },
  },
});
