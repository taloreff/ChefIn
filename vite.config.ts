import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import fs from "fs";
export default defineConfig({
  server: {
    port: 443,
    https: {
      key: fs.readFileSync("./chefin-privateKey.key"),
      cert: fs.readFileSync("./chefin.crt"),
    },
  },
  plugins: [react()],
});