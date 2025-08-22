import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: "::", // allows access from LAN/localhost
    port: 8080, // dev server runs on http://localhost:8080
  },
  plugins: [
    react(), // enables React with SWC (fast compiler)
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"), // use @ as shortcut to src/
    },
  },
});
