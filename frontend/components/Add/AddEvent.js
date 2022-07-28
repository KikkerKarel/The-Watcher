import React from "react";
import { SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity } from "react-native";
import axios from "axios";
import { Picker } from "@react-native-picker/picker";


const scoreList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

export default function AddEvent() {

    const [title, changeTitle] = React.useState("");
    const [country, changeCountry] = React.useState("");
    const [episodes, changeEpisodes] = React.useState();
    const [duration, changeDuration] = React.useState();
    const [genres, changeGenres] = React.useState([""]);

    const [selectedValue, setSelectedValue] = React.useState(0);

    const json = JSON.stringify({
        title: title,
        country: country,
        episodes: parseInt(episodes),
        duration: parseInt(duration),
        genres: genres,
        score: selectedValue
    });

    const AddToList = () => {
        axios.post("/add", json, { headers: { 'Content-Type': 'application/json' } }).then(response => {
            console.log(response.data);
        });
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.text}>Title</Text>
            <TextInput
                style={styles.textInput}
                onChangeText={changeTitle}
                value={title}
            />
            <Text style={styles.text}>Country</Text>
            <TextInput
                style={styles.textInput}
                onChangeText={changeCountry}
                value={country}
            />
            <Text style={styles.text}>Episodes</Text>
            <TextInput
                style={styles.textInput}
                onChangeText={changeEpisodes}
                value={episodes}
            />
            <Text style={styles.text}>Duration</Text>
            <TextInput
                style={styles.textInput}
                onChangeText={changeDuration}
                value={duration}
            />
            <Text style={styles.text}>Genres</Text>
            <TextInput
                style={styles.textInput}
                onChangeText={changeGenres}
                value={genres}
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    textInput: {
        backgroundColor: 'white',
        borderRadius: 15,
        height: 30,
        width: '60%',
        justifyContent: 'center',
    },
    text: {
        color: 'white',
        fontSize: 25,
        fontWeight: 'bold',
        marginTop: '5%'
    },
    picker: {
        color: 'white',
        backgroundColor: '#fff',
        height: 100,
        overflow: 'hidden',
        width: '60%',
        borderRadius: 15,
        justifyContent: 'center'
    },
    button: {
        color: 'white',
        backgroundColor: 'white',
        marginTop: '10%',
        width: '30%',
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15
    },
    buttonText: {
        fontSize: '25px',
        fontWeight: 'bold',
    }
})