import { View, Text, StyleSheet, TextInput, Pressable } from "react-native";
import { setUser } from "../context/state";
import { useState } from "react";
import { Link } from "expo-router";

const SignUp = () => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const send = () => {
		setUser({ name, email, password });
	};

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Regístrate</Text>
			<View style={styles.inputs}>
				<TextInput
					value={name}
					onChangeText={setName}
					style={styles.input}
					placeholder="Name"
				/>
				<TextInput
					value={email}
					onChangeText={setEmail}
					style={styles.input}
					placeholder="Email"
				/>
				<TextInput
					value={password}
					onChangeText={setPassword}
					style={styles.input}
					placeholder="Password"
				/>
			</View>
			<Link style={styles.link} href="/logIn">
				<Text style={styles.textLink}>Inicia sesion</Text>
			</Link>
			<Pressable onPress={send} style={styles.send}>
				<Text style={styles.sendText}>Enviar</Text>
			</Pressable>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: "column",
		backgroundColor: "#ffffff",
		alignItems: "center",
		flexGrow: 1,
		padding: 50,
	},
	title: {
		fontSize: 30,
		color: "#070F2B",
		marginLeft: "auto",
		marginRight: "auto",
	},
	inputs: {
		marginTop: 80,
		width: "100%",
		gap: 20,
	},
	input: {
		backgroundColor: "#F3F1F5",
		borderRadius: 5,
		padding: 10,
	},
	send: {
		backgroundColor: "#070F2B",
		padding: 10,
		borderRadius: 5,
		marginTop: 30,
	},
	sendText: {
		color: "#ffffff",
		fontSize: 20,
	},
	link: {
		marginTop: 30,
		marginBottom: 30,
	},
	textLink: {
		color: "#070F2B",
		fontSize: 20,
	},
});

export default SignUp;
