// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // IMPORTANT for GitHub Pages: project site under /gamearenafinall/
  base: "/gamearenafinall/",
});
