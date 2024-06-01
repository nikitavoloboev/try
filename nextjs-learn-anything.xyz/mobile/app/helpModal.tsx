import { Linking, Text, TouchableOpacity } from "react-native"
import { ScrollView } from "react-native-gesture-handler"

export default function helpModal() {
	return (
		<ScrollView>
			<TouchableOpacity
				onPress={() => {
					Linking.openURL(
						"https://github.com/learn-anything/learn-anything.xyz",
					)
				}}
			>
				<Text style={{ color: "blue" }}>Check GitHub for code.</Text>
			</TouchableOpacity>
		</ScrollView>
	)
}
