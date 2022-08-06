import axios from "axios";
import React, { useEffect } from "react";
import { View, Text, ScrollView, SafeAreaView, TouchableOpacity, RefreshControl } from "react-native";
import { styles } from "./ListStyles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";
import AuthService from "../../authentication/Auth.Service";
import { AntDesign, Ionicons } from '@expo/vector-icons';
import Popup from "../Modal/List/Popup";
import { countries } from "../../utils/lists";
import { ProgressBar } from 'react-native-paper';

export default function ListScreen() {

    const isFocused = useIsFocused();
    const [progress, changeProgress] = React.useState(0);

    useEffect(() => {
        if (isFocused) {
            loadOnlyOnce();
        };
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
        dramas.forEach(item => {
            if (item.Id === event) {
                setKey(item);
            }
        });
    }

    const [isModalVisible, setModalVisible] = React.useState(false);
    const [dramaEntry, setDramaEntry] = React.useState([]);
    const toggleModal = (id) => {
        const drama = dramas.find(x => x.Id === id);
        setDramaEntry(drama);
        setModalVisible(true);
    }

    const handleProgressChange = async (id) => {
        const active = dramas.find(x => x.Id === id);
        const updatedProgress = active.progress + 1;
        const json = JSON.stringify({
            progress: updatedProgress
        });
        await axios.put(`/drama/update/progress/${active.Id}`, json, { headers: { 'Content-Type': 'application/json' } })
            .then(() => {
                loadOnlyOnce();
            }).catch(err => {
                console.log(err);
            });
    }

    const CustomProgressBar = (event) => {
        const active = dramas.find(x => x.Id === event.id);
        let barStatus;
        if (event.progress !== 0) {
            barStatus = (active.progress / event.totalEps);
        } else {
            barStatus = 0;
        }
        return (
            <ProgressBar progress={barStatus} color="#E5E4E2" style={styles.progressBar} />
        )
    }

    const AdditionalInfo = (props) => {
        return (
            <SafeAreaView style={{ flexDirection: 'row' }}>
                <View style={{ flex: 1 }}>
                    <Text style={styles.text}>Country: {key.country}</Text>
                    <Text style={styles.text}>Episodes: {key.episodes}</Text>
                    <Text style={styles.text}>Duration: {key.duration} min</Text>
                    <Text style={styles.text}>Genre(s): {key.genres.split(',').join(', ')}</Text>
                </View>
                <View style={{ flex: 0.5, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    {props.progress < props.totalEps ? (
                        <TouchableOpacity style={{ right: 41, bottom: 30 }} onPress={() => handleProgressChange(props.id)}>
                            <Ionicons name="md-add-circle-sharp" size={20} color="white" />
                        </TouchableOpacity>
                    ) : null}
                    <TouchableOpacity style={{ right: 20 }} onPress={() => toggleModal(props.id)}>
                        <AntDesign name="edit" size={25} color="#E5E4E2" />
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
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
                                <View style={[styles.row, { marginTop: '1%' }]}>
                                    <Text style={[styles.tableText, styles.title]}>Title</Text>
                                    <Text style={[styles.tableText, styles.rest]}>Episodes</Text>
                                    <Text style={[styles.tableText, styles.rest]}>Score</Text>
                                </View>
                                {dramas.map((drama) => {
                                    if (country.country === drama.country)
                                        return (
                                            <TouchableOpacity style={styles.scrollview} key={drama.Id} onLongPress={() => openInfo(drama.Id)}>
                                                <View style={[styles.row, styles.rowHeight]}>
                                                    <View style={{ width: '60%' }}>
                                                        <View style={{ height: '10%', width: '100%' }}></View>
                                                        <View style={{ width: '100%' }}>
                                                            <Text style={[styles.tableText, { left: 10, width: '100%' }]}>{drama.title}</Text>
                                                        </View>
                                                        <View style={{ height: '10%', width: '100%' }}>
                                                            <CustomProgressBar id={drama.Id} totalEps={drama.episodes} progress={drama.progress} />
                                                        </View>
                                                    </View>
                                                    <Text style={[styles.tableText, styles.rest]}>
                                                        {drama.progress !== null ? (
                                                            `${drama.progress}/${drama.episodes}`
                                                        ) : `0/${drama.episodes}`}
                                                    </Text>
                                                    <Text style={[styles.score, styles.rest]}>{
                                                        drama.score !== null ? (
                                                            drama.score
                                                        ) : "N/A"
                                                    }</Text>
                                                </View>
                                                {open ? (
                                                    drama.Id === key.Id ? (
                                                        <AdditionalInfo id={drama.Id} totalEps={drama.episodes} progress={drama.progress} />
                                                    ) : null
                                                ) : null}
                                            </TouchableOpacity>
                                        );
                                })}
                            </View>
                        );
                    })}
                </ScrollView>
            ) : <Text style={styles.text}>Please log in to view your list !</Text>}
            {isModalVisible ? (
                <Popup entry={dramaEntry} listType="drama" toggle={setModalVisible} isVisible={isModalVisible} onBackdropPress={() => setModalVisible(false)} />
            ) : null}
        </SafeAreaView>
    )
}