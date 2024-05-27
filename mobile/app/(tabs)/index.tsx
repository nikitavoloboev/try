import { Button, StyleSheet } from "react-native"
import { ThemedView } from "../../components/Themed"

export default function Home() {
	return (
		<ThemedView style={styles.container}>
			<Button title="Go to Profile" onPress={() => {}} />
		</ThemedView>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: 90,
	},
})
