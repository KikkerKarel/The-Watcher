import axios from "axios";
import React, { useCallback, useEffect } from "react";
import { View, Text, ScrollView, SafeAreaView, TouchableOpacity, RefreshControl } from "react-native";
import { styles } from "./ListStyles";

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

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}

export default function ListScreen() {

    useEffect(() => {
        loadOnlyOnce();
    }, []);

    const [refreshing, setRefreshing] = React.useState(false);
    const onRefresh = useCallback(() => {
        setRefreshing(true);
        wait(2000).then(() => setRefreshing(false));
    }, []);

    const [dramas, setDramas] = React.useState([]);

    const loadOnlyOnce = async() => {
        await axios.get("/drama/get").then(response => {
            setDramas(response.data.payload);
        });
    }

    const [open, setOpen] = React.useState(false);
    const [key, setKey] = React.useState([]);
    const openInfo = (event) => {
        setOpen(!open);
        dramas.forEach(item => {
            if (item.Id === event) {
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
            <ScrollView refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor='#fff' colors={'#fff'} />}>
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
                                        <TouchableOpacity style={[styles.scrollview, styles.shadowProp]} key={drama.Id} onLongPress={() => openInfo(drama.Id)}>
                                            <View style={[styles.row, styles.rowHeight]}>
                                                <Text style={[styles.tableText, styles.rest]}>{index + 1}</Text>
                                                <Text style={[styles.tableText, styles.title]}>{drama.title}</Text>
                                                <Text style={[styles.score, styles.rest]}>{
                                                    drama.score !== null ? (
                                                        drama.score
                                                    ) : "N/A"
                                                }</Text>
                                            </View>
                                            {open ? (
                                                drama.Id === key.Id ? (
                                                    additionalInfo
                                                ): null
                                            ) : null}
                                        </TouchableOpacity>
                                    )
                            })}
                        </View>
                    )
                })}
            </ScrollView>
        </SafeAreaView>
    )
}