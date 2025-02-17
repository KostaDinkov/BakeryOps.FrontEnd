import { defineConfig } from 'vitest/config';
import {UserConfig} from "vite";
import react from "@vitejs/plugin-react";


export default defineConfig({
  server: {
    host: true,
    port: 5173,
    allowedHosts:["localhost","192.168.1.195"]
  },
  
  build: {
    outDir: "build",
  },
  plugins: [react()],
  test: {
    environment: 'node',
    include: ['tests/**/*.test.ts']
  }
} satisfies UserConfig);
