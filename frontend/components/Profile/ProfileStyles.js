import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#121212',
    },
    header: {
        // backgroundColor: '#4A0000',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        marginTop: '5%'
    },
    headerText: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#fff'
    },
    statsContainer: {
        backgroundColor: '#4A0000',
        alignItems: 'center',
        marginTop: '2%',
        height: 200,
        borderRadius: 5
    },
    statsHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        height: '25%',
        justifyContent: 'center'
    },
    statsBody: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        height: '75%',
        flexDirection: 'row'
    },
    statsTextBody: {
        // backgroundColor: 'white',
        width: '50%',
        height: '100%',
        justifyContent: 'center',
        // alignItems: 'center',
    },
    statsText: {
        color: '#fff',
        fontSize: 15,
        left: 10
    },
    settingsContainer: {
        // width: '100%',
        // backgroundColor: 'white',
        height: 200,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    text: {
        color: '#fff',
        fontSize: 15,
    },
    textInput: {
        backgroundColor: 'white', 
        width: '100%', 
        borderRadius: 5,
        marginTop: '10%',
        height: 30,
    },
    confirmButton: {
        marginTop: '10%', 
        backgroundColor: '#fff', 
        borderRadius: 5, 
        width: '40%', 
        height: 25, 
        justifyContent: 'center', 
        alignItems: 'center',
    }
});