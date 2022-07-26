import React from "react";
import { SafeAreaView, StyleSheet, Text, TextInput, View } from "react-native";

export default function AddEvent() {

    const list = ['Title', 'Country', 'Episodes', 'Duration', 'Genres']

    const [text, onChangeText] = React.useState("Test text");
    return (
        <SafeAreaView style={styles.container}>
            {list.map((item) => {
                return (
                    <View style={styles.view}>
                        <Text style={styles.text}>{item}</Text>
                        <TextInput
                            style={styles.textInput}
                            onChangeText={onChangeText}
                            value={text}
                        />
                    </View>
                )
            })}

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
        justifyContent: 'center',
    },
    text: {
        color: 'white',
        fontSize: 25,
        fontWeight: 'bold',
        left: 10
    }
})