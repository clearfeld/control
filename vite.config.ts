import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import svgr from "vite-plugin-svgr";
import styleX from "vite-plugin-stylex";

// @ts-expect-error process is a nodejs global
const host = process.env.TAURI_DEV_HOST;

// https://vitejs.dev/config/
export default defineConfig(async () => ({
  optimizeDeps: {
    include: [
      // 'react',
      // 'react-dom'
    ],

    exclude: [
      "@controlkit/ui"
    ],
  },

  plugins: [
    svgr(),

    react(),

    styleX(),
  ],

  resolve: {
		alias: {
			"@src": path.resolve(__dirname, "src"),
			"@store": path.resolve(__dirname, "src/store"),
      "@commons": path.resolve(__dirname, "src/commons"),
      "@assets": path.resolve(__dirname, "src/assets"),
		},
	},

  // Vite options tailored for Tauri development and only applied in `tauri dev` or `tauri build`
  //
  // 1. prevent vite from obscuring rust errors
  clearScreen: false,
  // 2. tauri expects a fixed port, fail if that port is not available
  server: {
    port: 1420,
    strictPort: true,
    host: host || false,
    hmr: host
      ? {
          protocol: "ws",
          host,
          port: 1421,
        }
      : undefined,
    watch: {
      // 3. tell vite to ignore watching `src-tauri`
      ignored: ["**/src-tauri/**"],
    },
  },
}));
