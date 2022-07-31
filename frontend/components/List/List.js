import axios from "axios";
import React, { useCallback, useEffect } from "react";
import { View, Text, ScrollView, SafeAreaView, TouchableOpacity, RefreshControl } from "react-native";
import { styles } from "./ListStyles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";
import AuthService from "../../authentication/Auth.Service";

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

    const isFocused = useIsFocused();

    useEffect(() => {
        if(isFocused){
            loadOnlyOnce();
        }
    }, [isFocused]);

    const [refreshing, setRefreshing] = React.useState(false);
    const [isLoggedIn, setIsLoggedIn] = React.useState(false);

    const [dramas, setDramas] = React.useState([]);

    const loadOnlyOnce = async () => {
        if (await AuthService.isLoggedIn()) {
            setIsLoggedIn(true);
            const userId = await AsyncStorage.getItem("userId");
            await axios.get(`/drama/get/${userId}`).then(response => {
                setDramas(response.data.payload);
                setRefreshing(true);
                wait(1000).then(() => setRefreshing(false));
            }).catch(err => {
                console.log(err);
            });
        } else {
            setIsLoggedIn(false);
        }
       
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
            <Text style={styles.text}>Genre(s): {key.genres}</Text>
        </View>;

    return (
        <SafeAreaView style={styles.container}>
            {isLoggedIn ? (
                <ScrollView refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={loadOnlyOnce} tintColor='#fff' colors={'#fff'} />}>
                    {countries.map((country) => {
                        return (
                            <View style={styles.scroll} key={country.country}>
                                <Text style={styles.header}>{country.country}</Text>
                                <View style={[styles.row, styles.borderBottom]}>
                                    <Text style={[styles.tableText, styles.title]}>Title</Text>
                                    <Text style={[styles.tableText, styles.rest]}>Episodes</Text>
                                    <Text style={[styles.tableText, styles.rest]}>Score</Text>
                                </View>
                                {dramas.map((drama) => {
                                    if (country.country === drama.country)
                                        return (
                                            <TouchableOpacity style={[styles.scrollview, styles.shadowProp]} key={drama.Id} onLongPress={() => openInfo(drama.Id)}>
                                                <View style={[styles.row, styles.rowHeight]}>
                                                    <Text style={[styles.tableText, styles.title]}>{drama.title}</Text>
                                                    <Text style={[styles.tableText, styles.rest]}>{drama.episodes}</Text>
                                                    <Text style={[styles.score, styles.rest]}>{
                                                        drama.score !== null ? (
                                                            drama.score
                                                        ) : "N/A"
                                                    }</Text>
                                                </View>
                                                {open ? (
                                                    drama.Id === key.Id ? (
                                                        additionalInfo
                                                    ) : null
                                                ) : null}
                                            </TouchableOpacity>
                                        )
                                })}
                            </View>
                        )
                    })}
                </ScrollView>
            ) : <Text style={styles.text}>Please log in to view your list !</Text>}
        </SafeAreaView>
    )
}