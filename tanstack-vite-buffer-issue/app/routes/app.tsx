import { createFileRoute, Outlet } from "@tanstack/react-router"
import { TonConnectUIProvider } from "@tonconnect/ui-react"

function LayoutComponent() {
  return (
    <TonConnectUIProvider manifestUrl="https://gist.github.com/nikitavoloboev/e85e6d2ea1ebb6cb61a9e736aab915b5">
      <Outlet />
    </TonConnectUIProvider>
  )
}

export const Route = createFileRoute("/app")({
  component: LayoutComponent,
})
