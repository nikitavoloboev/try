import { createFileRoute } from "@tanstack/react-router"
import { useSuspenseQuery } from "@tanstack/react-query"
import { testFetch } from "~/actions"

function RouteComponent() {
  const { data, error, isLoading } = useSuspenseQuery({
    queryKey: ["testFetch"],
    queryFn: async () => {
      const res = await testFetch()
      return res
    },
  })
  console.log(data, "data")
  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error loading data</div>

  return (
    <>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </>
  )
}

export const Route = createFileRoute("/")({
  component: () => <RouteComponent />,
})
