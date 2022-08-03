import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#121212'
    },
    scroll: {
        top: 10,
        marginTop: '5%',
        width: 400,
    },
    scrollview: {
        flexDirection: 'column',
        backgroundColor: '#4A0000',
        // backgroundColor: 'transparent',
        overflow: 'hidden',
        textAlign: 'center',
        borderStyle: 'solid',
        borderWidth: 0.5,
        borderBottomColor: '#D3D3D3',
        borderRadius: 5

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
        left: 10,
        width: '60%',
    },
    rest: {
        width: '20%',
        textAlign: 'center'
    },
});