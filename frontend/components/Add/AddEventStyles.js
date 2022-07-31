import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({ 
    container: {
        flex: 1,
        alignItems: 'center',
    },
    textInput: {
        backgroundColor: 'white',
        borderRadius: 15,
        height: 30,
        width: '60%',
        justifyContent: 'center',
        textAlign: 'center'
    },
    text: {
        color: 'white',
        fontSize: 25,
        fontWeight: 'bold',
        marginTop: '5%'
    },
    picker: {
        color: 'white',
        backgroundColor: '#fff',
        height: 100,
        overflow: 'hidden',
        width: '60%',
        borderRadius: 15,
        justifyContent: 'center'
    },
    button: {
        color: 'white',
        backgroundColor: 'white',
        marginTop: '10%',
        width: '30%',
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15
    },
    buttonText: {
        fontSize: 25,
        fontWeight: 'bold',
    },

    episodes: {
        flexDirection: 'row',
        width: '75%',
        flex: 0.5,
        justifyContent: 'space-between',
    },
    episodesOption: {
        color: '#fff',
        flex: 1,
        fontSize: 20
    },
});