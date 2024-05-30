import { observable } from "@legendapp/state";
//import AsyncStorage from "@react-native-async-storage/async-storage";

export const state = observable({
	photoUri: "",
});

/* export const getTasks = async () => {
	try {
		let tasks = await AsyncStorage.getItem("tasks");
		tasks = JSON.parse(tasks);

		if (tasks && tasks.length > 0) {
			state.tasks.set(tasks);
		}
	} catch (error) {
		console.log(error, "reading error");
	}
}; */
