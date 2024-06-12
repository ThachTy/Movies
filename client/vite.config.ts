import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  server: { port: 3500 },
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
      "@locales/en": "/src/locales/en",
      "@locales/vn": "/src/locales/vn",
      "@i18n": "/src/i18n",
      "@context": "/src/context",
    },
  },
});
