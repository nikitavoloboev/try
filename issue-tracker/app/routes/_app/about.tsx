import { createFileRoute } from "@tanstack/react-router"

function RouteComponent() {
  return <div className="p-2">Hello from About!</div>
}

export const Route = createFileRoute("/_app/about")({
  component: RouteComponent,
})
