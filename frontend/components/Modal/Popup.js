import React from "react";
import Modal from "react-native-modal";
import { View, Text, TextInput, Button, SafeAreaView } from "react-native";
import { styles } from "./ModalStyles";
import { Picker } from "@react-native-picker/picker";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';


const scoreList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const epValue = ['8', '12', '16', '20', '32', 'Other'];

const Popup = (props) => {

    const [userId, setUserId] = React.useState("");
    const [title, changeTitle] = React.useState("");
    const [country, changeCountry] = React.useState("");
    const [episodes, changeEpisodes] = React.useState();
    const [duration, changeDuration] = React.useState();
    const [genres, changeGenres] = React.useState([""]);
    const [selectedValue, setSelectedValue] = React.useState(0);

    const [more, setMore] = React.useState(false);

    const showMore = (value) => {
        setMore(!more);
    }


    return (
        <Modal {...props}>
            <SafeAreaView style={[styles.container]}>
                <KeyboardAwareScrollView style={{ width: '100%' }} keyboardDismissMode='on-drag' resetScrollToCoords={{ x: 0, y: 0}}>
                    <View style={[styles.container, { width: '100%' }]}>
                        <Text style={styles.text}>Title</Text>
                        <TextInput style={[styles.textInput]} onChangeText={changeTitle} value={props.drama.title} clearButtonMode='always' />

                        <Text style={styles.text}>Episodes</Text>
                        <TextInput style={styles.textInput} onChangeText={changeEpisodes} value={props.drama.episodes.toString()} clearButtonMode='always' />

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
                        <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center'}}>
                            <Text style={styles.text}>Country</Text>
                            <TextInput style={styles.textInput} onChangeText={changeDuration} value={props.drama.country} clearButtonMode='always' />

                            <Text style={styles.text}>Duration</Text>
                            <TextInput style={styles.textInput} onChangeText={changeDuration} value={props.drama.duration.toString()} clearButtonMode='always' />

                            <Text style={styles.text}>Genres</Text>
                            <TextInput style={styles.textInput} onChangeText={changeDuration} value={props.drama.genres} clearButtonMode='always' />

                            <Button title="Show less" onPress={showMore} />
                        </View>

                    ) : <Button title="Show more" onPress={showMore} />}
                </KeyboardAwareScrollView>
            </SafeAreaView>
        </Modal>
    )
}

export default Popup;