import { View, Text, StyleSheet, Pressable, ScrollView } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { logOut, setSelectedPet } from "../context/state";
import { router } from "expo-router";
import { state, getPets } from "../context/state";
import { useEffect, useState } from "react";
import { Image } from "expo-image";
import { FlashList } from "@shopify/flash-list";

const Profile = () => {
	const user = state.user.get();
	const [pets, setPets] = useState([]);

	const closeSession = () => {
		logOut();
	};

	const goBack = () => {
		router.replace("/");
	};

	const goToPet = (item) => {
		setSelectedPet(item);
		router.replace("/pet");
	};

	const fetchPets = async () => {
		const res = await getPets();
		setPets(res);
	};

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		fetchPets();
	}, []);

	const renderItem = ({ item }) => (
		<Pressable style={styles.item} onPress={() => goToPet(item)}>
			<Image
				style={styles.image}
				source={{ uri: `http://10.0.2.2:3000/pet/getimage/${item.image}` }}
			/>
		</Pressable>
	);

	return (
		<ScrollView contentContainerStyle={styles.container}>
			<View style={styles.navigation}>
				<Pressable onPress={goBack}>
					<AntDesign name="back" size={24} color="black" />
				</Pressable>
				<Pressable onPress={closeSession}>
					<AntDesign name="logout" size={24} color="black" />
				</Pressable>
			</View>
			<View style={styles.img}>
				<AntDesign name="user" size={44} color="black" />
			</View>
			<View style={styles.userDetails}>
				<Text style={styles.userDetailsText}>Nombre: {user.name}</Text>
				<Text style={styles.userDetailsText}>Email: {user.email}</Text>
			</View>
			<Text style={styles.mascotasTitle}>Mascotas</Text>
			<FlashList
				numColumns={3}
				data={pets}
				renderItem={renderItem}
				keyExtractor={(item) => item.id}
				estimatedItemSize={130}
			/>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: "column",
		backgroundColor: "#ffffff",
		flexGrow: 1,
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
	img: {
		justifyContent: "center",
		alignItems: "center",
		marginTop: 40,
		borderRadius: 100,
		borderWidth: 1,
		borderColor: "#070F2B",
		backgroundColor: "#F3F1F5",
		width: 100,
		height: 100,
		alignSelf: "center",
	},
	userDetails: {
		marginTop: 20,
		alignItems: "center",
		gap: 10,
	},
	userDetailsText: {
		fontSize: 20,
		color: "#070F2B",
	},
	mascotasTitle: {
		fontSize: 30,
		color: "#070F2B",
		marginLeft: "auto",
		marginRight: "auto",
		marginTop: 40,
		marginBottom: 20,
	},
	item: {
		marginLeft: "auto",
		marginRight: "auto",
	},
	image: {
		flex: 1,
		width: 130,
		height: 200,
		backgroundColor: "#0553",
	},
});

export default Profile;
