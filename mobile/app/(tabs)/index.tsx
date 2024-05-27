import { Button, StyleSheet } from "react-native"
import { ThemedView } from "../../components/Themed"
import { trpc } from "../../utils/trpc-client"

export default function Home() {
	console.log("calling trpc")
	const greetingQuery = trpc.greeting.useQuery()
	console.log(greetingQuery, "greet")
	console.log(greetingQuery.error, "err")

	return (
		<ThemedView style={styles.container}>
			<Button title="Test tRPC" onPress={async () => {}} />
			{/* <Button title="Go to Profile" onPress={() => {}} /> */}
		</ThemedView>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: 90,
	},
})
