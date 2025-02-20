import { defineConfig } from "@tanstack/start/config"
import tsConfigPaths from "vite-tsconfig-paths"
import tailwindcss from "@tailwindcss/vite"
import { nodePolyfills } from "vite-plugin-node-polyfills"

export default defineConfig({
  vite: {
    plugins: [
      tsConfigPaths({
        projects: ["./tsconfig.json"],
      }),
      tailwindcss(),
    ],
  },
  server: {
    preset: "vercel",
  },
  routers: {
    client: {
      vite: {
        plugins: [
          nodePolyfills({
            globals: {
              Buffer: true,
            },
          }),
        ],
      },
    },
  },
  tsr: {
    customScaffolding: {
      routeTemplate: [
        "%%tsrImports%%",
        "\n\n",
        "function RouteComponent() { return <></> };\n\n",
        "%%tsrExportStart%%{\n component: RouteComponent\n }%%tsrExportEnd%%\n",
      ].join(""),
    },
  },
})
