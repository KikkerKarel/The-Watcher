import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#121212',
    },
    scroll: {
        marginTop: '5%',
        width: 400,
    },
    scrollview: {
        flexDirection: 'column',
        backgroundColor: '#4A0000',
        overflow: 'hidden',
        textAlign: 'center',
        borderStyle: 'solid',
        borderWidth: 0.5,
        borderBottomColor: '#D3D3D3',
        borderRadius: 5

    },
    header: {
        color: '#E5E4E2',
        marginLeft: '2%',
        fontSize: 25,
    },
    text: {
        color: '#E5E4E2',
        fontSize: 15,
        left: 10
    },
    shadowProp: {
        shadowColor: 'white',
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 1,
        shadowRadius: 3,
        elevation: 20
    },
    score: {
        color: '#E5E4E2',
        fontSize: 20,
        fontWeight: 'bold',
    },

    row: {
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    rowHeight: {
        height: 60,
    },
    tableText: {
        color: '#E5E4E2',
        fontSize: 15,
    },
    title: {
        left: 10,
        width: '60%',
    },
    rest: {
        width: '20%',
        textAlign: 'center'
    },
    progressBar: {
        left: 10, 
        height: 10, 
        borderRadius: 2,
        top: 5
    }
});