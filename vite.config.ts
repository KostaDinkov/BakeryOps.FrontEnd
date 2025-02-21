import { defineConfig, loadEnv } from 'vite';
import {UserConfig} from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  // Load all environment variables based on the current mode
  const env = loadEnv(mode, process.cwd())
  // Merge them into process.env for use in the config
  Object.assign(process.env, env)
  
  return {
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
  } satisfies UserConfig;
});
