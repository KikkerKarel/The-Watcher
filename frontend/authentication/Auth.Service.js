import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

class Authservice {
    async login(username, password) {
        const response = await axios
        .post("/user/login", { username, password });
        if (response.status === 200 && response.data.payload) {
            await AsyncStorage.setItem("token", response.data.payload.token);
            await AsyncStorage.setItem("userId", response.data.payload.userId.toString());
            await AsyncStorage.setItem("username", response.data.payload.username);
            console.log("Set token!");
            return await AsyncStorage.getItem("token");
        }
        return response;
    }

    async isLoggedIn(){
        return await AsyncStorage.getItem("token") != null;
    }

    async logout(){
        await AsyncStorage.multiRemove(["userId", "token", "username"]);
    }

    register(username, password) {
        return axios.post("/user/register", {
            username,
            password
        });
    }
}

export default new Authservice();