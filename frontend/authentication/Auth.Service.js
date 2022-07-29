import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

class Authservice {
    async login(username, password) {
        const response = await axios
        .post("/user/login", { username, password });
        if (response.status === 200 && response.data.payload) {
            await AsyncStorage.setItem("token", response.data.payload);
            console.log("Set token!");
            return await AsyncStorage.getItem("token");
        }
        return response;
    }

    async isLoggedIn(){
        return await AsyncStorage.getItem("token") != null;
    }

    async logout(){
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