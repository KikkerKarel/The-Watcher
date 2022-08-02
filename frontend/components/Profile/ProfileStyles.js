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
        alignItems: 'center'
    },
    text: {
        color: '#fff',
        fontSize: 15
    }
});