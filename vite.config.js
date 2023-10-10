import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    rollupOptions: {
      // Add "axios" as an external dependency
      external: ["axios"],
    },
  },
  plugins: [react()],
});
