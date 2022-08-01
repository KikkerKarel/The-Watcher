import React, { useEffect, useRef } from "react";
import { Alert, Animated, Easing, SafeAreaView, Text, TextInput, TouchableOpacity, View } from "react-native";
import axios from "axios";
import { Picker } from "@react-native-picker/picker";
import { styles } from "./AddEventStyles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { AntDesign } from '@expo/vector-icons';



const scoreList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const epValue = ['8', '12', '16', '20', '32', 'Other'];

export default function AddEvent({ navigation }) {

    const [spinValue, setSpinValue] = React.useState(new Animated.Value(0));

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
    const [genres, changeGenres] = React.useState([""]);

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
            userId: parseInt(userId),
            title: title,
            country: country,
            episodes: parseInt(episodes),
            duration: parseInt(duration),
            genres: genres,
            score: selectedValue
        });
        await axios.post("/drama/add", json, { headers: { 'Content-Type': 'application/json' } }).then(response => {
            console.log(response.data);
            setLoading(true);
            spin();
            changeTitle('');
            changeCountry('');
            changeEpisodes('');
            changeDuration('');
            changeGenres('');
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

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAwareScrollView contentContainerStyle={{ alignItems: 'center', justifyContent: 'center' }} keyboardDismissMode="on-drag" resetScrollToCoords={{ x: 0, y: 0 }} scrollEnabled={false}>
                <Text style={styles.text}>Title</Text>
                <TextInput
                    style={styles.textInput}
                    onChangeText={changeTitle}
                    value={title}
                    ref={textInput}
                    clearButtonMode='always'
                />
                <Text style={styles.text}>Country</Text>
                <TextInput
                    style={styles.textInput}
                    onChangeText={changeCountry}
                    value={country}
                    clearButtonMode='always'
                    ref={textInput}
                />
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
                <TextInput
                    style={styles.textInput}
                    onChangeText={changeGenres}
                    value={genres.toString()}
                    clearButtonMode='always'
                    ref={textInput}
                />

                <Text style={styles.text}>Score</Text>
                <Picker
                    selectedValue={selectedValue}
                    style={styles.picker}
                    onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
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