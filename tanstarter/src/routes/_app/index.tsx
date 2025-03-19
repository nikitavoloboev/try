import { createFileRoute } from "@tanstack/react-router"

function RouteComponent() {
  return (
    <>
      <h1 className="text-2xl font-bold">Issue Tracker</h1>
    </>
  )
}

export const Route = createFileRoute("/_app/")({
  component: RouteComponent,
})
