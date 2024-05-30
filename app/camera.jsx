import { CameraView, useCameraPermissions } from "expo-camera";
import { useState, useRef } from "react";
import {
	Pressable,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
	Dimensions,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import { observer, Reactive, useObservable } from "@legendapp/state/react";
import { enableReactNativeComponents } from "@legendapp/state/config/enableReactNativeComponents";
import { state } from "../context/state";
import { router } from "expo-router";

export default observer(() => {
	const [permission, requestPermission] = useCameraPermissions();
	const camera = useRef(null);

	if (!permission) {
		// Camera permissions are still loading.
		return <View />;
	}

	if (!permission.granted) {
		// Camera permissions are not granted yet.
		return (
			<View style={styles.container}>
				<Text style={{ textAlign: "center" }}>
					We need your permission to show the camera
				</Text>
				<Pressable style={styles.pressable} onPress={requestPermission}>
					<Text
						style={{
							alignSelf: "center",
							color: "#fff",
							fontSize: 18,
						}}
					>
						Grant Permission
					</Text>
				</Pressable>
			</View>
		);
	}

	const takePicture = async () => {
		const picture = await camera.current.takePictureAsync();
		state.photoUri.set(picture.uri);
		router.replace("/");
	};

	return (
		<View style={styles.container}>
			<CameraView ref={camera} style={styles.camera} facing={"back"} />
			<View style={styles.buttonContainer}>
				<TouchableOpacity style={styles.button} onPress={takePicture}>
					<Entypo name="circle" size={80} color="black" />
				</TouchableOpacity>
			</View>
		</View>
	);
});

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
	},
	camera: {
		width: 299,
		height: 299,
		alignSelf: "center",
		marginTop: 150,
	},

	buttonContainer: {
		flex: 1,
		flexDirection: "row",
		backgroundColor: "transparent",
		margin: 64,
	},
	button: {
		flex: 1,
		alignSelf: "flex-end",
		alignItems: "center",
	},
	text: {
		fontSize: 24,
		fontWeight: "bold",
		color: "white",
	},
	pressable: {
		padding: 10,
		borderWidth: 1,
		borderColor: "black",
		borderRadius: 5,
		backgroundColor: "#921dff",
		width: 200,
		alignSelf: "center",
		marginTop: 20,
	},
});
