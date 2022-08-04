import React, { useEffect } from "react";
import Modal from "react-native-modal";
import { View, Text, TextInput, Button, SafeAreaView, TouchableOpacity, Alert } from "react-native";
import { styles } from "../ModalStyles";
import { Picker } from "@react-native-picker/picker";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { MaterialIcons, Octicons } from '@expo/vector-icons';
import axios from 'axios';
import { scoreList } from "../../../utils/lists";
import GenreModal from "../Add/GenreModal";
import { allGenres } from "../../../utils/lists";

const Popup = (props) => {

    const [selectedItems, setSelectedItems] = React.useState(allGenres);
    const [open, setOpen] = React.useState(false);

    const [title, changeTitle] = React.useState("");
    const [country, changeCountry] = React.useState("");
    const [episodes, changeEpisodes] = React.useState();
    const [duration, changeDuration] = React.useState();
    const [genres, changeGenres] = React.useState([]);
    const [selectedValue, setSelectedValue] = React.useState(0);

    useEffect(() => {
        loadOnlyOnce();
    }, [props]);

    const loadOnlyOnce = () => {
        changeTitle(props.entry.title);
        changeCountry(props.entry.country);
        if (props.listType === "drama") {
            changeEpisodes(props.entry.episodes.toString());
        }
        changeDuration(props.entry.duration);
        const splitGenres = props.entry.genres.split(',');
        changeGenres(splitGenres);
        setSelectedValue(props.entry.score);
    }

    const [more, setMore] = React.useState(false);

    const showMore = () => {
        setMore(!more);
    }

    const updateEntry = async () => {
        if (props.listType === "drama") {
            const json = JSON.stringify({
                title: title,
                country: country,
                episodes: parseInt(episodes),
                duration: parseInt(duration),
                genres: genres,
                score: selectedValue
            });
            await axios.put(`/drama/update/${props.entry.Id}`, json, { headers: { 'Content-Type': 'application/json' } }).then(() => {
                Alert.alert("Entry has been updated", "Please refresh the page");
                props.toggle(false);
            }).catch(err => {
                console.log(err);
            });
        } else if (props.listType === "movie") {
            const json = JSON.stringify({
                title: title,
                country: country,
                duration: parseInt(duration),
                genres: genres,
                score: selectedValue
            });
            await axios.put(`/movie/update/${props.entry.Id}`, json, { headers: { 'Content-Type': 'application/json' } }).then(() => {
                Alert.alert("Entry has been updated", "Please refresh the page");
                props.toggle(false);
            }).catch(err => {
                console.log(err);
            });
        }
        
    }

    return (
        <Modal {...props}>
            <SafeAreaView style={[styles.container]}>
                <KeyboardAwareScrollView style={{ width: '100%' }} keyboardDismissMode='on-drag' resetScrollToCoords={{ x: 0, y: 0 }}>
                    <View style={[styles.container, { width: '100%' }]}>
                        <Text style={styles.text}>Title</Text>
                        <TextInput style={[styles.textInput]} onChangeText={changeTitle} value={title} clearButtonMode='always' />

                        {props.listType === "drama" ? (
                            <View style={{ width: '100%', alignItems: 'center', justifyContent: 'center' }}>
                                <Text style={styles.text}>Episodes</Text>
                                <TextInput style={styles.textInput} onChangeText={changeEpisodes} value={episodes} clearButtonMode='always' />
                            </View>
                        ) : null}

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
                            <TextInput style={styles.textInput} onChangeText={changeCountry} value={country} clearButtonMode='always' />

                            <Text style={styles.text}>Duration (min)</Text>
                            <TextInput style={styles.textInput} onChangeText={changeDuration} value={duration.toString()} clearButtonMode='always' />

                            <Text style={styles.text}>Genre(s)</Text>
                            <TouchableOpacity onPress={() => setOpen(!open)}>
                                <Octicons name="multi-select" size={25} color="white" />
                            </TouchableOpacity>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', width: '75%', flexWrap: 'wrap' }}>
                                {genres.map((genre) => {
                                    return (
                                        <View key={genre} style={{ flexDirection: 'row', marginTop: '5%', alignItems: 'center' }}>
                                            <Octicons name="dot-fill" size={15} style={{ marginRight: 2 }} color="white" />
                                            <Text style={{ fontSize: 15, color: '#fff'}}>{genre}</Text>
                                        </View>
                                    )
                                })}
                            </View>
                            {open ? (
                                <GenreModal
                                    genreList={changeGenres}
                                    selectedItems={selectedItems}
                                    setSelectedItems={setSelectedItems}
                                    toggle={setOpen}
                                    isVisible={open}
                                    onBackdropPress={() => setOpen(false)}
                                />
                            ) : null}

                            <TouchableOpacity style={{ alignItems: 'center', flexDirection: 'row', justifyContent: 'center', marginTop: '5%' }} onPress={updateEntry}>
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