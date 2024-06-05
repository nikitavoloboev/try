import { useQuery } from "@tanstack/react-query"

export default function App() {
	const { isPending, error, data } = useQuery({
		queryKey: ["home"],
		queryFn: () =>
			fetch("https://nikiv-drophunt.web.val.run").then((res) => res.json()),
	})

	if (isPending) return "Loading..."

	if (error) return "An error has occurred: " + error.message

	return <div>{JSON.stringify(data)}</div>
	// return <div></div>
}
