import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

class Authservice {
    async login(username, password) {
        const response = await axios
        .post("/user/login", { username, password });
        if (response.status === 200 && response.data.token) {
            await AsyncStorage.setItem("token", response.data.token);
            // localStorage.setItem("token", response.data.token);
            console.log("Set token!");
            // return localStorage.getItem("token");
            return await AsyncStorage.getItem("token");
        }
        return response;
    }

    async isLoggedIn(){
        // return localStorage.getItem("token") != null;
        return await AsyncStorage.getItem("token") != null;
    }

    async logout(){
        // localStorage.removeItem("user");
        // localStorage.removeItem("token");
        await AsyncStorage.removeItem("user");
        await AsyncStorage.removeItem("token");
    }

    register(username, password) {
        return axios.post("/user/register", {
            username,
            password
        });
    }
}

export default new Authservice();