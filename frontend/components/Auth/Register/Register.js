import { SafeAreaView, TextInput, View, Text, TouchableOpacity, Alert } from "react-native";
import AuthService from "../../../authentication/Auth.Service";
import { styles } from "../Login/LoginStyles";
import React from "react";

export default function RegisterScreen() {

    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [checkPassword, setCheckPassword] = React.useState("");

    const onPress = async () => {
        if (password === checkPassword) {
            await AuthService.register(username, password).then(response => {
                console.log(response.data.payload);
                navigation.navigate('Login');
            });
        } else {
            Alert.alert("Please try again!", "Password does not match.");
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.text}>Username</Text>
            <TextInput style={styles.textInput} value={username} onChangeText={setUsername} textAlign="center" />

            <Text style={styles.text}>Password</Text>
            <TextInput style={styles.textInput} value={password} onChangeText={setPassword} textAlign="center" secureTextEntry />

            <Text style={styles.text}>Confirm Password</Text>
            <TextInput style={styles.textInput} value={checkPassword} onChangeText={setCheckPassword} textAlign="center" secureTextEntry />

            <TouchableOpacity style={styles.button} onPress={onPress}>
                <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#fff'}}>Register</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}