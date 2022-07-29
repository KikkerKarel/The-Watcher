import React from "react";
import { View, Text, TextInput, SafeAreaView, TouchableOpacity } from "react-native";
import AuthService from "../../../authentication/Auth.Service";
import { styles } from "./LoginStyles";

export default function LoginScreen({ navigation }) {

    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");

    const [redirect, setRedirect] = React.useState(false);

    const onPress = async () => {
        await AuthService.login(username, password).then(data => {
            console.log(data);
            setRedirect(true);
        });

        if(redirect) {
            navigation.navigate('List');
        }
    }

    const toRegisterScreen = () => {
        navigation.navigate('Register')
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.text}>Username</Text>
            <TextInput style={styles.textInput} onChangeText={setUsername} value={username} textAlign="center" />
            <Text style={styles.text}>Password</Text>
            <TextInput style={styles.textInput} secureTextEntry={true} onChangeText={setPassword} value={password} textAlign="center" />

            <TouchableOpacity style={styles.button} onPress={onPress}>
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>

            <TouchableOpacity style={{ top: 50}} onPress={toRegisterScreen}>
                <Text style={{ fontWeight: 'bold', fontSize: 20, color: '#fff'}}>Click here to register</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}