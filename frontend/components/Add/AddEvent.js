import React, { useEffect, useRef } from "react";
import { Alert, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity } from "react-native";
import axios from "axios";
import { Picker } from "@react-native-picker/picker";
import { styles } from "./AddEventStyles";
import AsyncStorage from "@react-native-async-storage/async-storage";


const scoreList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

export default function AddEvent({ navigation }) {

    const [userId, setUserId] = React.useState("");
    const [title, changeTitle] = React.useState("");
    const [country, changeCountry] = React.useState("");
    const [episodes, changeEpisodes] = React.useState();
    const [duration, changeDuration] = React.useState();
    const [genres, changeGenres] = React.useState([""]);

    const [selectedValue, setSelectedValue] = React.useState(0);

    useEffect(() => {
        loadOnlyOnce();
    }, []);

    const loadOnlyOnce = async () => {
        setUserId(await AsyncStorage.getItem("userId"));
    }

    const textInput = useRef('');
    const AddToList = () => {
        const json = JSON.stringify({
            userId: parseInt(userId),
            title: title,
            country: country,
            episodes: parseInt(episodes),
            duration: parseInt(duration),
            genres: genres,
            score: selectedValue
        });
        axios.post("/drama/add", json, { headers: { 'Content-Type': 'application/json' } }).then(response => {
            console.log(response.data);
            changeTitle('');
            changeCountry('');
            changeEpisodes('');
            changeDuration('');
            changeGenres('');
            setSelectedValue(0);
        });
      
    }


    return (
        <SafeAreaView style={styles.container}>
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
            <TextInput
                style={styles.textInput}
                onChangeText={changeEpisodes}
                value={episodes}
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
                        <Picker.Item label={score.toString()} value={score} key={score} />
                    )
                })}
            </Picker>


            <TouchableOpacity style={styles.button} onPress={AddToList}>
                <Text style={styles.buttonText}>Add</Text>
            </TouchableOpacity>

        </SafeAreaView>
    )
}