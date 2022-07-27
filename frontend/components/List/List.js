import axios from "axios";
import React, { useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from "react-native";

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

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                {countries.map((country) => {
                    return (
                        <View style={styles.scroll} key={country.country}>
                            <Text style={styles.header}>{country.country}</Text>
                            {dramas.map((drama) => {
                                if (country.country === drama.country)
                                    return (
                                        <View style={[styles.scrollview, styles.shadowProp]} key={drama.title}>
                                            <View style={{ flex: 1 }}>
                                                <Text style={styles.text}>Title: {drama.title}</Text>
                                                <Text style={styles.text}>Country: {drama.country}</Text>
                                                <Text style={styles.text}>Episodes: {drama.episodes}</Text>
                                                <Text style={styles.text}>Duration: {drama.duration} min</Text>
                                                <Text style={styles.text}>Genres: {drama.genres}</Text>
                                            </View>
                                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                                <Text style={styles.score}>{
                                                    drama.score !== null ? (
                                                        drama.score
                                                    ) : "N/A"
                                                }</Text>
                                            </View>
                                        </View>
                                    )
                            })}
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
        // justifyContent: 'center',
    },
    scroll: {
        top: 10,
        marginTop: '5%',
        width: 400,
        // height: 150,
    },
    scrollview: {
        flexDirection: 'row',
        backgroundColor: '#8A0707',
        borderRadius: 12,
        overflow: 'hidden',
        textAlign: 'center',
        marginTop: '2%',
        borderStyle: 'solid',
        borderWidth: '1px',
        borderColor: '#fff',
    },
    header: {
        color: '#fff',
        left: 10,
        fontSize: 25
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
    }
});