import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from "react-native";
import AuthService from "../../../authentication/Auth.Service";

export default function LogoutScreen({ navigation }) {

    const logout = async () => {
        await AuthService.logout().then(() => {
            navigation.navigate('Login');
        });
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.text}>Are you sure you want to logout?</Text>

            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={logout}>
                    <Text style={styles.text}>Yes</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('List')}>
                    <Text style={styles.text}>Cancel</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 0.3,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        color: '#fff',
        fontSize: 20
    },
    buttonContainer: {
        top: 50,
        flexDirection: 'row',
        width: '30%',
        justifyContent: 'space-between'
    },
    button: {
        flex:1,
    }
});