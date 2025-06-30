import { resolve } from "node:path";
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    environment: "jsdom",
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
      "@son-q/api": resolve(__dirname, "./packages/api/src"),
      "@son-q/queries": resolve(__dirname, "./packages/queries/src"),
      "@son-q/types": resolve(__dirname, "./packages/types/src"),
      "@son-q/ui": resolve(__dirname, "./packages/ui/src"),
      "@son-q/utils": resolve(__dirname, "./packages/utils/src"),
    },
  },
});
