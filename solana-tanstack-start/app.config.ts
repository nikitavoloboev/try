import { NodeGlobalsPolyfillPlugin } from "@esbuild-plugins/node-globals-polyfill"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import { nodePolyfills } from "vite-plugin-node-polyfills"
import viteTsconfigPaths from "vite-tsconfig-paths"

// TODO: failing with `Cannot read properties of undefined (reading 'server')`
export default defineConfig({
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
  plugins: [viteTsconfigPaths(), react(), nodePolyfills()],
})
