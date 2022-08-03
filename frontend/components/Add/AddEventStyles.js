import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({ 
    container: {
        flex: 1,
        backgroundColor: '#121212'
    },
    textInput: {
        backgroundColor: '#4A0000',
        borderRadius: 5,
        height: 30,
        width: '60%',
        justifyContent: 'center',
        textAlign: 'center',
        color: '#fff'
    },
    text: {
        color: '#fff',
        fontSize: 25,
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
        justifyContent: 'center'
    },
    button: {

        backgroundColor: 'white',
        marginTop: '10%',
        width: '30%',
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5
    },
    buttonText: {
        fontSize: 25,
        fontWeight: 'bold',
    },

    episodes: {
        flexDirection: 'row',
        width: '80%',
        flex: 0.5,
        justifyContent: 'space-between',
    },
    episodesOption: {
        color: '#fff',
        flex: 1,
        fontSize: 20
    },
});