import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    scroll: {
        top: 10,
        marginTop: '5%',
        width: 400,
    },
    scrollview: {
        flexDirection: 'column',
        backgroundColor: '#4A0000',
        overflow: 'hidden',
        textAlign: 'center',
        borderStyle: 'solid',
        borderWidth: 1,
        borderBottomColor: '#fff',

    },
    header: {
        color: '#fff',
        marginLeft: '2%',
        fontSize: 25,
    },
    text: {
        color: '#fff',
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
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
    },

    row: {
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    rowHeight: {
        height: 40
    },
    tableText: {
        color: '#fff',
        fontSize: 15,
    },
    title: {
        width: '70%',
    },
    rest: {
        width: '15%',
        textAlign: 'center'
    },
    borderBottom: {
        borderBottomColor: '#fff',
        borderStyle: 'solid',
        borderBottomWidth: 1
    }
});