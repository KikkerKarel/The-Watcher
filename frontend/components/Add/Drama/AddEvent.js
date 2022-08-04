import React, { useEffect, useRef, useState } from "react";
import { Alert, Animated, Easing, FlatList, SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import axios from "axios";
import { Picker } from "@react-native-picker/picker";
import { styles } from "../AddEventStyles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { AntDesign, Octicons, FontAwesome5 } from '@expo/vector-icons';
import { countries, scoreList, epValue, allGenres } from "../../../utils/lists";
import Modal from "react-native-modal";

export default function AddEvent({ navigation }) {

    const [spinValue, setSpinValue] = React.useState(new Animated.Value(0));
    const [open, setOpen] = React.useState(false);

    useEffect(() => {
        loadOnlyOnce();
    }, []);

    const spin = () => {
        spinValue.setValue(0);
        Animated.timing(
            spinValue,
            {
                toValue: 1,
                duration: 4000,
                easing: Easing.linear,
                useNativeDriver: true
            }
        ).start(() => spin());
    }

    const [userId, setUserId] = React.useState("");
    const [title, changeTitle] = React.useState("");
    const [country, changeCountry] = React.useState("");
    const [episodes, changeEpisodes] = React.useState();
    const [duration, changeDuration] = React.useState();
    const [genres, changeGenres] = React.useState([]);

    const [selectedValue, setSelectedValue] = React.useState(0);

    const [other, setOther] = React.useState(false);

    const loadOnlyOnce = async () => {
        setUserId(await AsyncStorage.getItem("userId"));
    }

    const onPress = (ep) => {
        if (ep !== 'Other') {
            changeEpisodes(ep);
            setOther(false);
        } else {
            changeEpisodes('');
            setOther(true);
        }
    }

    const [loading, setLoading] = React.useState(false);
    const textInput = useRef('');
    const AddToList = async () => {
        const json = JSON.stringify({
            title: title,
            country: country,
            episodes: parseInt(episodes),
            duration: parseInt(duration),
            genres: genres,
            score: selectedValue
        });
        await axios.post(`/drama/add/${userId}`, json, { headers: { 'Content-Type': 'application/json' } }).then(response => {
            console.log(response.data);
            setLoading(true);
            spin();
            changeTitle('');
            changeCountry('');
            changeEpisodes('');
            changeDuration('');
            changeGenres([]);
            setSelectedValue(0);
        }).catch(err => {
            console.log(err);
        }).finally(() => {
            setLoading(false);
        });
    }

    const spinning = spinValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg']
    });

    const [selectedItems, setSelectedItems] = useState(allGenres);
    const handleGenres = (id) => {
        let temp = selectedItems.map((item) => {
            if (id === item.id) {
                return { ...item, isChecked: !item.isChecked };
            }
            return item;
        });
        setSelectedItems(temp);
    };

    const handleConfirmGenres = () => {
        var list = genres;
        selectedItems.map((item) => {
            if (item.isChecked) {
                const check = !!list.find(x => x === item.genre);
                if (!check) {
                    list.push(item.genre);
                }
            } else {
                var index = genres.indexOf(item.genre);
                if (index !== -1) {
                    genres.splice(index, 1);
                }
            }
        });
        changeGenres(list);
        setOpen(false);
    }

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAwareScrollView contentContainerStyle={{ alignItems: 'center', justifyContent: 'center' }} keyboardDismissMode="on-drag" resetScrollToCoords={{ x: 0, y: 0 }}>
                <Text style={styles.text}>Title</Text>
                <TextInput
                    style={styles.textInput}
                    onChangeText={changeTitle}
                    value={title}
                    ref={textInput}
                    clearButtonMode='always'
                />
                <Text style={styles.text}>Country</Text>
                <Picker
                    selectedValue={country}
                    style={styles.picker}
                    onValueChange={(itemValue) => changeCountry(itemValue)}
                >
                    {countries.map((item) => {
                        return (
                            <Picker.Item color="#fff" label={item.country} value={item.country} key={item.country} />
                        )
                    })}
                </Picker>
                <Text style={styles.text}>Episodes</Text>

                <View style={[styles.episodes, other ? { flex: 1 } : { flex: 0.5 }]}>
                    {epValue.map((ep) => {
                        return (
                            <TouchableOpacity style={{ top: 10 }} key={ep} onPress={() => onPress(ep)}>
                                {ep === episodes ? (
                                    <Text style={[styles.episodesOption, { fontWeight: 'bold', fontSize: 25 }]}>{ep}</Text>
                                ) : <Text style={styles.episodesOption}>{ep}</Text>}
                            </TouchableOpacity>
                        )
                    })}
                </View>
                {other ? (
                    <TextInput
                        style={[styles.textInput, { top: 10 }]}
                        onChangeText={changeEpisodes}
                        value={episodes}
                        clearButtonMode='always'
                        ref={textInput}
                    />
                ) : null}
                <Text style={styles.text}>Duration</Text>
                <TextInput
                    style={styles.textInput}
                    onChangeText={changeDuration}
                    value={duration}
                    clearButtonMode='always'
                    ref={textInput}
                />
                <Text style={styles.text}>Genres</Text>
                <TouchableOpacity onPress={() => setOpen(!open)}>
                    <Octicons name="multi-select" size={25} color="white" />
                </TouchableOpacity>
                <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', width: '75%', flexWrap: 'wrap' }}>
                    {genres.map((genre) => {
                        return (
                            <View style={{ flexDirection: 'row', marginTop: '5%', alignItems: 'center' }}>
                                <Octicons name="dot-fill" size={15} style={{ marginRight: 2}} color="white" />
                                <Text key={genre} style={styles.selectedGenres}>{genre}</Text>
                            </View>
                        )
                    })}
                </View>

                {open ? (
                    <Modal isVisible={open} onBackdropPress={() => setOpen(false)}>
                        <SafeAreaView style={{ backgroundColor: '#121212', borderRadius: 5, justifyContent: 'center', alignItems: 'center' }}>
                            <ScrollView style={{ width: '100%', height: 300 }}>
                                <View style={{ width: '100%', alignItems: 'center', justifyContent: 'center' }}>
                                    {selectedItems.map((item) => {
                                        return (
                                            <TouchableOpacity key={item.id}
                                                style={[{ width: '75%', borderRadius: 10, justifyContent: 'center', alignItems: 'center', flexDirection: 'row', marginTop: '2%' }]}
                                                onPress={() => handleGenres(item.id)}
                                            >
                                                {item.isChecked ? (
                                                    <FontAwesome5 name="check" size={20} color="white" style={{ right: 10 }} />
                                                ) : null}
                                                <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 25 }}>{item.genre}</Text>
                                            </TouchableOpacity>
                                        )
                                    })}
                                    <TouchableOpacity onPress={handleConfirmGenres}>
                                        <Text style={styles.text}>Confirm</Text>
                                    </TouchableOpacity>
                                </View>
                            </ScrollView>
                        </SafeAreaView>
                    </Modal>
                ) : null}

                <Text style={styles.text}>Score</Text>
                <Picker
                    selectedValue={selectedValue}
                    style={styles.picker}
                    onValueChange={(itemValue) => setSelectedValue(itemValue)}
                >
                    {scoreList.map((score) => {
                        return (
                            <Picker.Item color="#fff" label={score.toString()} value={score} key={score} />
                        )
                    })}
                </Picker>


                <TouchableOpacity style={[styles.button, { flexDirection: "row" }]} onPress={AddToList}>
                    {loading ? (
                        <Animated.Text style={{ transform: [{ rotate: spinning }], right: 10 }}>
                            <AntDesign name="loading1" size={20} color="black" />
                        </Animated.Text>
                    ) : null}
                    <Text style={styles.buttonText}>Add</Text>
                </TouchableOpacity>
            </KeyboardAwareScrollView>
        </SafeAreaView>
    )
}