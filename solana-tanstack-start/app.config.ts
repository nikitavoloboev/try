import { NodeGlobalsPolyfillPlugin } from "@esbuild-plugins/node-globals-polyfill"
import { defineConfig } from "@tanstack/start/config"
import { nodePolyfills } from "vite-plugin-node-polyfills"
import tsConfigPaths from "vite-tsconfig-paths"

export default defineConfig({
  routers: {
    client: {
      vite: {
        plugins: () => [nodePolyfills()],
        optimizeDeps: {
          esbuildOptions: {
            plugins: [
              // @ts-ignore
              NodeGlobalsPolyfillPlugin({
                process: true,
              }),
            ],
          },
        },
      },
    },
  },
  vite: {
    plugins: () => [
      tsConfigPaths({
        projects: ["./tsconfig.json"],
      }),
    ],
  },
})
