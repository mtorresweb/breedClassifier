Blob.prototype[Symbol.toStringTag] = "Blob";
File.prototype[Symbol.toStringTag] = "File";
import { useRef, useState, useEffect } from "react";
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
import defaultImage from "../assets/dog.jpg";
import { Link, router, useRootNavigationState } from "expo-router";
import { observer, Reactive, useObservable } from "@legendapp/state/react";
import { enableReactNativeComponents } from "@legendapp/state/config/enableReactNativeComponents";
import { state, getUser } from "../context/state";
import mime from "mime";

const DEFAULT_IMAGE = Image.resolveAssetSource(defaultImage).uri;

export default observer(() => {
	const [breed, setBreed] = useState("");
	const [image, setImage] = useState(null);
	const rootNavigationState = useRootNavigationState();

	const img = useRef(null);

	const openGallery = async () => {
		// No permissions request is necessary for launching the image library
		const result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.All,
			quality: 1,
		});

		if (!result.canceled) {
			const imageUri = result.assets[0].uri;
			setImage(imageUri);

			const bodyContent = new FormData();

			bodyContent.append("image", {
				type: result.assets[0].mimeType,
				uri: imageUri,
				name: result.assets[0].fileName,
			});

			try {
				const res = await axios.post(
					"http://10.0.2.2:3000/model/upload",
					bodyContent,
					{
						headers: {
							"Content-Type": "multipart/form-data",
							Accept: "application/json",
							Authorization: `Bearer ${state.user.get().token}`,
						},
					},
				);

				console.log(res.data);
				setBreed(res.data.breed);
			} catch (error) {
				console.log("Error ", error);
			}
		}
	};

	const checkUser = async () => {
		const user = await getUser();

		if (!user) router.replace("/logIn");
	};

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		const photoUri = state.photoUri.get();
		const user = state.user.get();

		if (photoUri) {
			sendCameraPhoto(photoUri);
			state.photoUri.set("");
		}

		if (!user.email && rootNavigationState?.key) {
			checkUser();
		}
	}, [rootNavigationState]);

	const sendCameraPhoto = async (cameraPhotoUri) => {
		if (!cameraPhotoUri) {
			return;
		}

		setImage(cameraPhotoUri);

		const bodyContent = new FormData();

		bodyContent.append("image", {
			type: mime.getType(cameraPhotoUri),
			uri: cameraPhotoUri,
			name: cameraPhotoUri.split("/").pop(),
		});

		try {
			const res = await axios.post(
				"http://10.0.2.2:3000/model/upload",
				bodyContent,
				{
					headers: {
						"Content-Type": "multipart/form-data",
						Accept: "application/json",
						Authorization: `Bearer ${state.user.get().token}`,
					},
				},
			);

			setBreed(res.data.breed);
		} catch (error) {
			console.log("Error ", error);
		}
	};

	return (
		<View style={styles.container}>
			<View style={styles.menu}>
				<Link href="/profile">
					<Feather name="user" size={26} color="#070F2B" />
				</Link>

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
					<Pressable style={styles.pressable} onPress={openGallery}>
						<Feather name="image" size={24} color="#070F2B" />
					</Pressable>
					<View style={{ width: 2, backgroundColor: "#070F2B" }} />
					<Pressable style={styles.pressable}>
						<Link href="/camera">
							<Feather name="camera" size={24} color="#070F2B" />
						</Link>
					</Pressable>
				</View>
			</View>
		</View>
	);
});

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
		color: "#921dff",
		marginTop: 20,
		fontWeight: "bold",
		alignSelf: "center",
	},
});
