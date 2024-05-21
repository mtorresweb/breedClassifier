import { useRef, useState } from "react";
import {
	Text,
	View,
	Image,
	Pressable,
	Platform,
	StyleSheet,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import { Feather } from "@expo/vector-icons";
import defaultImage from "./assets/dog.jpg";

const DEFAULT_IMAGE = Image.resolveAssetSource(defaultImage).uri;

export default function App() {
	const [breed, setBreed] = useState("");
	const [image, setImage] = useState(null);

	const img = useRef(null);

	const pickImage = async () => {
		// No permissions request is necessary for launching the image library
		const result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.All,
			quality: 1,
		});

		if (!result.canceled) {
			setImage(result.assets[0].uri);

			const bodyContent = new FormData();
			const imageUri = result.assets[0].uri;
			const response = await fetch(imageUri);
			const blob = await response.blob();

			bodyContent.append("image", blob, result.assets[0].fileName);

			const res = await axios.post(
				"http://localhost:3000/model/upload",
				bodyContent,
				{
					headers: {
						"Content-Type": "multipart/form-data",
						Accept: "application/json",
					},
				},
			);
		}
	};

	return (
		<View style={styles.container}>
			<View style={styles.menu}>
				<Feather name="user" size={26} color="#070F2B" />
				<Text style={styles.title}>Pet Classifier</Text>
			</View>

			<View style={styles.controls}>
				<View>
					<Image
						ref={img}
						style={styles.image}
						source={{ uri: image || DEFAULT_IMAGE }}
						width={299}
						height={299}
					/>
				</View>

				{breed && <Text style={styles.result}>{breed}</Text>}

				<View style={styles.options}>
					<Pressable style={styles.pressable} onPress={pickImage}>
						<Feather name="image" size={24} color="#070F2B" />
					</Pressable>
					<View style={{ width: 2, backgroundColor: "#070F2B" }} />
					<Pressable style={styles.pressable} onPress={pickImage}>
						<Feather name="camera" size={24} color="#070F2B" />
					</Pressable>
				</View>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flexDirection: "column",
		backgroundColor: "#ffffff",
		alignItems: "center",
		flexGrow: 1,
	},
	menu: {
		flexDirection: "row",
		width: "100%",
		padding: 20,
		marginTop: 20,
		alignItems: "center",
	},
	title: {
		fontSize: 30,
		color: "#070F2B",
		marginLeft: "auto",
		marginRight: "auto",
	},
	controls: {
		flexDirection: "column",
		justifyContent: "center",
		flexGrow: 1,
	},
	image: {
		borderRadius: 20,
	},
	options: {
		flexDirection: "row",
		justifyContent: "space-around",
		backgroundColor: "#F3F1F5",
		borderRadius: 5,
		padding: 10,
		marginTop: 30,
		borderWidth: 1,
		borderColor: "#070F2B",
	},
	pressable: {
		flexGrow: 1,
		alignItems: "center",
	},
	result: {
		fontSize: 25,
		color: "#070F2B",
		marginTop: 20,
		fontWeight: "bold",
		alignSelf: "center",
	},
});
