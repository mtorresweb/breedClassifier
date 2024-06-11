import { observable } from "@legendapp/state";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { router } from "expo-router";

export const state = observable({
	user: {},
	pets: [],
	photoUri: "",
	selectedPet: {},
});

export const setSelectedPet = (pet) => {
	state.selectedPet.set(pet);
};

export const setUser = async (userData) => {
	try {
		const user = await axios.post(
			"http://10.0.2.2:3000/user/signup",
			userData,
			{
				headers: {
					"Content-Type": "application/json",
				},
			},
		);
		state.user.set(user.data.user);
		await AsyncStorage.setItem("user", JSON.stringify(user.data.user));
		router.replace("/");
	} catch (error) {
		console.log("Error ", error);
	}
};

export const logIn = async (userData) => {
	try {
		const user = await axios.post("http://10.0.2.2:3000/user/login", userData, {
			headers: {
				"Content-Type": "application/json",
			},
		});
		state.user.set(user.data.user);
		await AsyncStorage.setItem("user", JSON.stringify(user.data.user));
		router.replace("/");
	} catch (error) {
		console.log("Error ", error);
	}
};

export const getUser = async () => {
	try {
		let user = await AsyncStorage.getItem("user");
		user = JSON.parse(user);

		if (user?.email) {
			state.user.set(user);
			return true;
		}
		return false;
	} catch (error) {
		console.log("Error ", error);
		return false;
	}
};

export const logOut = async () => {
	try {
		await AsyncStorage.removeItem("user");
		state.user.set({});
		router.replace("/logIn");
	} catch (error) {
		console.log("Error ", error);
	}
};

export const getPets = async () => {
	try {
		const res = await axios.get("http://10.0.2.2:3000/pet/list", {
			headers: {
				Authorization: `Bearer ${state.user.get().token}`,
			},
		});

		console.log(res);
		return res.data.pets;
	} catch (error) {
		console.log("Error ", error);
	}
};
