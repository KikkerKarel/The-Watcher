import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#121212',
        borderRadius: 5
    },
    textInput: {
        backgroundColor: '#4A0000',
        borderRadius: 5,
        height: 30,
        width: '60%',
        justifyContent: 'center',
        textAlign: 'center',
        color: '#fff',
    },
    text: {
        color: 'white',
        fontSize: 15,
        fontWeight: 'bold',
        marginTop: '5%'
    },
    picker: {
        color: '#fff',
        backgroundColor: '#4A0000',
        height: 75,
        overflow: 'hidden',
        width: '60%',
        borderRadius: 5,
        justifyContent: 'center',
    },
});