import React, { useEffect } from "react";
import Modal from "react-native-modal";
import { View, Text, TextInput, Button, SafeAreaView, TouchableOpacity, Alert } from "react-native";
import { styles } from "./ModalStyles";
import { Picker } from "@react-native-picker/picker";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { MaterialIcons } from '@expo/vector-icons';
import axios from 'axios';


const scoreList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// const epValue = ['8', '12', '16', '20', '32', 'Other'];

const Popup = (props) => {

    const [id, setId] = React.useState(0);
    const [title, changeTitle] = React.useState("");
    const [country, changeCountry] = React.useState("");
    const [episodes, changeEpisodes] = React.useState();
    const [duration, changeDuration] = React.useState();
    const [genres, changeGenres] = React.useState([""]);
    const [selectedValue, setSelectedValue] = React.useState(0);

    useEffect(() => {
        loadOnlyOnce();
    }, [props]);

    const loadOnlyOnce = () => {
        setId(props.drama.Id);
        changeTitle(props.drama.title);
        changeCountry(props.drama.country);
        changeEpisodes(props.drama.episodes.toString());
        changeDuration(props.drama.duration);
        changeGenres(props.drama.genres);
        setSelectedValue(props.drama.score);
    }

    const [more, setMore] = React.useState(false);

    const showMore = () => {
        setMore(!more);
    }

    const updateEntry = async() => {
        const json = JSON.stringify({
            title: title,
            country: country,
            episodes: parseInt(episodes),
            duration: parseInt(duration),
            genres: genres,
            score: selectedValue
        })
        await axios.put(`/drama/update/${id}`, json, { headers: { 'Content-Type': 'application/json' } }).then(() => {
            Alert.alert("Entry has been updated", "Please refresh the page");
            props.toggle(false);
        });
    }

    return (
        <Modal {...props}>
            <SafeAreaView style={[styles.container]}>
                <KeyboardAwareScrollView style={{ width: '100%' }} keyboardDismissMode='on-drag' resetScrollToCoords={{ x: 0, y: 0 }}>
                    <View style={[styles.container, { width: '100%' }]}>
                        <Text style={styles.text}>Title</Text>
                        <TextInput style={[styles.textInput]} onChangeText={changeTitle} value={title} clearButtonMode='always' />

                        <Text style={styles.text}>Episodes</Text>
                        <TextInput style={styles.textInput} onChangeText={changeEpisodes} value={episodes} clearButtonMode='always' />

                        <Text style={styles.text}>Score</Text>
                        <Picker selectedValue={selectedValue} style={styles.picker} onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)} >
                            {scoreList.map((score) => {
                                return (
                                    <Picker.Item color="#fff" label={score.toString()} value={score} key={score} />
                                )
                            })}
                        </Picker>
                    </View>

                    {more ? (
                        <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={styles.text}>Country</Text>
                            <TextInput style={styles.textInput} onChangeText={changeDuration} value={country} clearButtonMode='always' />

                            <Text style={styles.text}>Duration (min)</Text>
                            <TextInput style={styles.textInput} onChangeText={changeDuration} value={duration.toString()} clearButtonMode='always' />

                            <Text style={styles.text}>Genres</Text>
                            <TextInput style={styles.textInput} onChangeText={changeDuration} value={genres} clearButtonMode='always' />

                            <TouchableOpacity style={{ alignItems: 'center', flexDirection: 'row', justifyContent: 'center', marginTop: '5%' }} onPress={showMore}>
                                <MaterialIcons name="publish" size={24} color="white" />
                                <Text style={[styles.text, { marginTop: 0 }]}>Update</Text>
                            </TouchableOpacity>


                            <TouchableOpacity style={{ alignItems: 'center', flexDirection: 'row', justifyContent: 'center', marginTop: '5%' }} onPress={showMore}>
                                <MaterialIcons name="expand-less" size={30} color="white" />
                                <Text style={[styles.text, { marginTop: 0 }]}>Show less</Text>
                            </TouchableOpacity>
                        </View>

                    ) : <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                        <TouchableOpacity style={{ alignItems: 'center', flexDirection: 'row', justifyContent: 'center', marginTop: '5%' }} onPress={updateEntry}>
                                <MaterialIcons name="publish" size={24} color="white" />
                                <Text style={[styles.text, { marginTop: 0 }]}>Update</Text>
                            </TouchableOpacity>

                        <TouchableOpacity style={{ alignItems: 'center', flexDirection: 'row', justifyContent: 'center', marginTop: '5%' }} onPress={showMore}>
                            <MaterialIcons name="expand-more" size={30} color="white" />
                            <Text style={[styles.text, { marginTop: 0 }]}>Show more</Text>
                        </TouchableOpacity>
                    </View>}
                </KeyboardAwareScrollView>
            </SafeAreaView>
        </Modal>
    )
}

export default Popup;