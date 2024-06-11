import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native";
import { state } from "../context/state";
import { AntDesign } from "@expo/vector-icons";
import { router } from "expo-router";
import { Image } from "expo-image";

const Pet = () => {
	const pet = state.selectedPet.get();

	const goBack = () => {
		router.replace("/profile");
	};

	return (
		<ScrollView contentContainerStyle={styles.container}>
			<View style={styles.navigation}>
				<Pressable onPress={goBack}>
					<AntDesign name="back" size={24} color="black" />
				</Pressable>
			</View>
			<Image
				style={styles.image}
				source={{ uri: `http://10.0.2.2:3000/pet/getimage/${pet.image}` }}
			/>
			<Text style={styles.name}>{pet.name}</Text>
			<Text style={styles.description}>{pet.description}</Text>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: "column",
		backgroundColor: "#ffffff",
		flexGrow: 1,
		alignItems: "center",
	},
	navigation: {
		flexDirection: "row",
		width: "100%",
		paddingLeft: 30,
		paddingRight: 30,
		marginTop: 40,
		alignItems: "center",
		justifyContent: "space-between",
	},
	image: {
		width: 130,
		height: 200,
		marginTop: 40,
		borderRadius: 10,
	},
	name: {
		fontSize: 25,
		color: "#921dff",
		marginTop: 20,
		fontWeight: "bold",
		alignSelf: "center",
	},
	description: {
		fontSize: 20,
		color: "#070F2B",
		marginTop: 20,
		alignSelf: "center",
		padding: 20,
	},
});

export default Pet;
