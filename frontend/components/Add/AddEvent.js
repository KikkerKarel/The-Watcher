import React from "react";
import { Button, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import axios from "axios";

export default function AddEvent() {

    const list = ['Title', 'Country', 'Episodes', 'Duration', 'Genres'];
    const [title, changeTitle] = React.useState("");
    const [country, changeCountry] = React.useState("");
    const [episodes, changeEpisodes] = React.useState(6);
    const [duration, changeDuration] = React.useState(0);
    const [genres, changeGenres] = React.useState([""]);

    const json = JSON.stringify({
        title: title,
        country: country,
        episodes: episodes,
        duration: duration,
        genres: genres
    });

    const AddToList = () => {
        axios.post("/add", json, {headers: { 'Content-Type': 'application/json'}}).then(response => {
            console.log(response);
        });
    }

    // const onChange = (e) => {
    //     console.log(e.target.getAttribute("data-key"));
    // }

    return (
        <SafeAreaView style={styles.container}>
            {/* {list.map((item) => {
                return (
                    <View style={styles.view}>
                        <Text style={styles.text}>{item}</Text>
                        <TextInput
                            key={item}
                            style={styles.textInput}
                            onChangeText={onChangeText}
                            onSubmitEditing={onChange}
                            value={text}
                        />
                    </View>
                )
            })} */}
            <Text style={styles.text}>Title</Text>
            <TextInput
                style={styles.textInput}
                onChange={changeTitle}
                value={title}
            />
            <Text style={styles.text}>Country</Text>
            <TextInput
                style={styles.textInput}
                onChange={changeCountry}
                value={country}
            />
            <Text style={styles.text}>Episodes</Text>
            <TextInput
                style={styles.textInput}
                onChange={changeEpisodes}
                value={episodes.toString()}
            />
            <Text style={styles.text}>Duration</Text>
            <TextInput
                style={styles.textInput}
                onChange={changeDuration}
                value={duration.toString()}
            />
            <Text style={styles.text}>Genres</Text>
            <TextInput
                style={styles.textInput}
                onChange={changeGenres}
                value={genres}
            />
            <TouchableOpacity style={styles.button} onPress={AddToList}>

            </TouchableOpacity>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        // justifyContent: 'center'
    },
    view: {
        width: '75%',
        marginTop: '10%'
    },
    textInput: {
        backgroundColor: 'white',
        borderRadius: 15,
        height: 30,
        width: '75%',
        justifyContent: 'center',
    },
    text: {
        color: 'white',
        fontSize: 25,
        fontWeight: 'bold',
        // left: 10
    }
})