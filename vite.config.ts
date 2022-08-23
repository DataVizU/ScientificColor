import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import type { ConfigEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";

const baseConfig = {
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          lodash: ["lodash"],
        },
      },
    },
  },
};

// https://vitejs.dev/config/
export default defineConfig((env: ConfigEnv) => {
  if (env.mode === "vercel") {
    return {
      ...baseConfig,
    };
  } else {
    return {
      ...baseConfig,
      base: "/ScientificColor/",
    };
  }
});
