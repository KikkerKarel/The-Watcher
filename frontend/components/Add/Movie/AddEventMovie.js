import React, { useEffect, useRef } from "react";
import { Animated, Easing, SafeAreaView, Text, TextInput, TouchableOpacity, View } from "react-native";
import axios from "axios";
import { Picker } from "@react-native-picker/picker";
import { styles } from "../AddEventStyles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { AntDesign } from '@expo/vector-icons';

const scoreList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

export default function AddEventMovie({ navigation }) {

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
    const [duration, changeDuration] = React.useState();
    const [genres, changeGenres] = React.useState([""]);

    const [selectedValue, setSelectedValue] = React.useState(0);

    const loadOnlyOnce = async () => {
        setUserId(await AsyncStorage.getItem("userId"));
    }

    const [loading, setLoading] = React.useState(false);
    const textInput = useRef('');
    const AddToList = async () => {
        const json = JSON.stringify({
            userId: parseInt(userId),
            title: title,
            country: country,
            duration: parseInt(duration),
            genres: genres,
            score: selectedValue
        });
        // await axios.post("/drama/add", json, { headers: { 'Content-Type': 'application/json' } }).then(response => {
        //     console.log(response.data);
        //     setLoading(true);
        //     spin();
        //     changeTitle('');
        //     changeCountry('');
        //     changeDuration('');
        //     changeGenres('');
        //     setSelectedValue(0);
        // }).catch(err => {
        //     console.log(err);
        // }).finally(() => {
        //     setLoading(false);
        // });
    }

    const spinning = spinValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg']
    });

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAwareScrollView contentContainerStyle={{ alignItems: 'center', flex: 1 }} keyboardDismissMode="on-drag" resetScrollToCoords={{ x: 0, y: 0 }}>
                <Text style={[styles.text]}>Title</Text>
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