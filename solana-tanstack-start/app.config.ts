import { defineConfig } from "@tanstack/start/config"
import tsConfigPaths from "vite-tsconfig-paths"
import react from "@vitejs/plugin-react"
import { nodePolyfills } from "vite-plugin-node-polyfills"
import { NodeGlobalsPolyfillPlugin } from "@esbuild-plugins/node-globals-polyfill"

export default defineConfig({
  vite: {
    plugins: () => [
      tsConfigPaths({
        projects: ["./tsconfig.json"],
      }),
      react(),
      nodePolyfills(),
    ],
    build: {
      sourcemap: false,
      rollupOptions: {
        output: {
          manualChunks: {
            coral: ["@coral-xyz/anchor"],
            jotai: ["jotai"],
            react: ["react", "react-dom"],
            reactHotToast: ["react-hot-toast"],
            reactRouter: ["react-router", "react-router-dom"],
            solanaWeb3: ["@solana/web3.js"],
            solanaWalletAdapters: [
              "@solana/wallet-adapter-base",
              "@solana/wallet-adapter-react",
              "@solana/wallet-adapter-react-ui",
            ],
            tabler: ["@tabler/icons-react"],
            tanstack: ["@tanstack/react-query"],
          },
        },
      },
    },
    define: {
      global: "globalThis",
    },
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
})
