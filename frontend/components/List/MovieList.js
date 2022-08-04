import axios from "axios";
import React, { useEffect } from "react";
import { View, Text, ScrollView, SafeAreaView, TouchableOpacity, RefreshControl, Button, TextInput } from "react-native";
import { styles } from "./ListStyles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";
import AuthService from "../../authentication/Auth.Service";
import { AntDesign } from '@expo/vector-icons';
import Popup from "../Modal/List/Popup";
import { countries } from "../../utils/lists";

// const wait = (timeout) => {
//     return new Promise(resolve => setTimeout(resolve, timeout));
// }

export default function MovieListScreen() {

    const isFocused = useIsFocused();

    useEffect(() => {
        if (isFocused) {
            loadOnlyOnce();
        };
    }, [isFocused]);

    const [refreshing, setRefreshing] = React.useState(false);
    const [isLoggedIn, setIsLoggedIn] = React.useState(false);

    const [movies, setMovies] = React.useState([]);

    const loadOnlyOnce = async () => {
        if (await AuthService.isLoggedIn()) {
            setIsLoggedIn(true);
            const userId = await AsyncStorage.getItem("userId");
            await axios.get(`/movie/get/all/${userId}`).then(response => {
                setMovies(response.data.payload);
            }).catch(err => {
                console.log(err);
            });
        } else {
            setIsLoggedIn(false);
        }
    }

    const refresh = async () => {
        setRefreshing(true);
        await loadOnlyOnce().then(() => {
            setRefreshing(false);
        });
    }

    const [open, setOpen] = React.useState(false);
    const [key, setKey] = React.useState([]);
    const openInfo = (event) => {
        setOpen(!open);
        movies.forEach(item => {
            if (item.Id === event) {
                setKey(item);
            }
        });
    }

    const [isModalVisible, setModalVisible] = React.useState(false);
    const [entry, setEntry] = React.useState([]);
    const toggleModal = async (id) => {
        const movie = movies.find(x => x.Id === id);
        setEntry(movie);
        setModalVisible(true);
    }

    const AdditionalInfo = (props) => {
        return (
            <SafeAreaView style={{ flexDirection: 'row' }}>
                <View style={{ flex: 1 }}>
                    <Text style={styles.text}>Country: {key.country}</Text>
                    <Text style={styles.text}>Episodes: {key.episodes}</Text>
                    <Text style={styles.text}>Duration: {key.duration} min</Text>
                    <Text style={styles.text}>Genre(s): {key.genres}</Text>
                </View>
                <View style={{ flex: 0.5, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <TouchableOpacity style={{ right: 20, flexDirection: 'row' }} onPress={() => toggleModal(props.id)}>
                        <AntDesign name="edit" size={25} color="white" />
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        )
    }

    const time = (min) => {
        var hours = Math.floor(min / 60);
        var minutes = min % 60;
        return (
            `${hours}hr ${minutes}min`
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            {isLoggedIn ? (
                <ScrollView refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={refresh} tintColor='#fff' colors={'#fff'} />}>
                    {countries.map((country) => {
                        return (
                            <View style={styles.scroll} key={country.country}>
                                <Text style={styles.header}>{country.country}</Text>
                                <View style={[styles.row, styles.borderBottom]}>
                                    <Text style={[styles.tableText, styles.title]}>Title</Text>
                                    <Text style={[styles.tableText, styles.rest]}>Run time</Text>
                                    <Text style={[styles.tableText, styles.rest]}>Score</Text>
                                </View>
                                {movies.map((movie) => {
                                    if (country.country === movie.country)
                                        return (
                                            <TouchableOpacity style={styles.scrollview} key={movie.Id} onLongPress={() => openInfo(movie.Id)}>
                                                <View style={[styles.row, styles.rowHeight]}>
                                                    <Text style={[styles.tableText, styles.title]}>{movie.title}</Text>
                                                    <Text style={[styles.tableText, styles.rest]}>{time(movie.duration)}</Text>
                                                    <Text style={[styles.score, styles.rest]}>{
                                                        movie.score !== null ? (
                                                            movie.score
                                                        ) : "N/A"
                                                    }</Text>
                                                </View>
                                                {open ? (
                                                    movie.Id === key.Id ? (
                                                        <AdditionalInfo id={movie.Id} />
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
            { isModalVisible ? (
                <Popup drama={entry} toggle={setModalVisible} isVisible={isModalVisible} onBackdropPress={() => setModalVisible(false)}/>
            ) : null}
        </SafeAreaView>
    )
}