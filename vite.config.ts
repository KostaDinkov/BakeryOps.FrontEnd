import {UserConfig} from "vite";
import react from "@vitejs/plugin-react";


export default  {
  server: {
    host: true,
    port: 5173,
    allowedHosts:["localhost","192.168.1.195"]
  },
  
  build: {
    outDir: "build",
  },
  plugins: [react()],
} satisfies UserConfig;
