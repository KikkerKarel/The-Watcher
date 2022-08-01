import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#121212'
    },
    textInput: {
        backgroundColor: 'white',
        borderRadius: 5,
        backgroundColor: '#4A0000',
        height: 30,
        width: '60%',
        justifyContent: 'center',
        color: '#fff',
        marginTop: '2%'
    },
    text: {
        color: '#fff',
        marginTop: '5%',
        // right: 80,
        fontSize: 20
    },
    button: {
        backgroundColor: '#fff',
        marginTop: '10%',
        width: '25%',
        height: '7.5%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#4A0000',
        borderRadius: 5
    },
    buttonText: {
        fontSize: 25,
        fontWeight: 'bold',
        color: '#fff'
    }
});