import axios from "axios";
import React, { useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity } from "react-native";

var countries = [
    {
        country: 'South Korea'
    },
    {
        country: 'China'
    },
    {
        country: 'Japan'
    },
    {
        country: 'Taiwan'
    },
    {
        country: 'Thailand'
    },
];

const dataHeaders = ['#', 'Title', 'Score'];

export default function ListScreen() {

    useEffect(() => {
        loadOnlyOnce();
    }, []);

    const [dramas, setDramas] = React.useState([]);

    const loadOnlyOnce = () => {
        axios.get("/get").then(response => {
            setDramas(response.data.payload);
        });
    }

    const [open, setOpen] = React.useState(false);
    const [key, setKey] = React.useState([]);
    const openInfo = (event) => {
        console.log(event);
        setOpen(!open);
        dramas.forEach(item => {
            if (item.title === event) {
                setKey(item);
            }
        });
    }

    let additionalInfo =
    <View>
        <Text style={styles.text}>Country: {key.country}</Text>
        <Text style={styles.text}>Episodes: {key.episodes}</Text>
        <Text style={styles.text}>Duration: {key.duration} min</Text>
        <Text style={styles.text}>Genres: {key.genres}</Text>
    </View>;

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                {countries.map((country) => {
                    return (
                        <View style={styles.scroll} key={country.country}>
                            <Text style={styles.header}>{country.country}</Text>
                            <View style={[styles.row, styles.borderBottom]}>
                                <Text style={[styles.tableText, styles.rest]}>#</Text>
                                <Text style={[styles.tableText, styles.title]}>Title</Text>
                                <Text style={[styles.tableText, styles.rest]}>Score</Text>
                            </View>
                            {dramas.map((drama, index) => {
                                if (country.country === drama.country)
                                    return (
                                        <TouchableOpacity style={[styles.scrollview, styles.shadowProp]} key={drama.title} onLongPress={() => openInfo(drama.title)}>
                                            <View style={[styles.row, styles.rowHeight]}>
                                                <Text style={[styles.tableText, styles.rest]}>{index + 1}</Text>
                                                <Text style={[styles.tableText, styles.title]}>{drama.title}</Text>
                                                <Text style={[styles.score, styles.rest]}>{
                                                    drama.score !== null ? (
                                                        drama.score
                                                    ) : "N/A"
                                                }</Text>
                                            </View>
                                            {/* {open ? (
                                                <View>
                                                    <Text style={styles.text}>Title: {drama.title}</Text>
                                                    <Text style={styles.text}>Country: {drama.country}</Text>
                                                    <Text style={styles.text}>Episodes: {drama.episodes}</Text>
                                                    <Text style={styles.text}>Duration: {drama.duration} min</Text>
                                                    <Text style={styles.text}>Genres: {drama.genres}</Text>
                                                </View>
                                            ) : null} */}
                                        </TouchableOpacity>
                                    )
                            })}
                            {open ? (
                                // <View>
                                //     <Text style={styles.text}>Title: {drama.title}</Text>
                                //     <Text style={styles.text}>Country: {drama.country}</Text>
                                //     <Text style={styles.text}>Episodes: {drama.episodes}</Text>
                                //     <Text style={styles.text}>Duration: {drama.duration} min</Text>
                                //     <Text style={styles.text}>Genres: {drama.genres}</Text>
                                // </View>
                                additionalInfo
                            ) : null}
                        </View>
                    )
                })}
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
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
        // borderRadius: 12,
        overflow: 'hidden',
        textAlign: 'center',
        // marginTop: '2%',
        borderStyle: 'solid',
        borderWidth: '1px',
        // borderColor: '#fff',
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
        borderBottomWidth: '1px'
    }
});