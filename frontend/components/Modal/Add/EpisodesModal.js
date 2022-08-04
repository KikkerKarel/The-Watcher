import { SafeAreaView, ScrollView, Text,TouchableOpacity, View } from "react-native";
import Modal from "react-native-modal";
import { FontAwesome5 } from '@expo/vector-icons';
import React from "react";
import { styles } from "../ModalStyles";

const EpModal = (props) => {

    const [genres, changeGenres] = React.useState([]);

    const handleGenres = (id) => {
        let temp = props.selectedItems.map((item) => {
            if (id === item.id) {
                return { ...item, isChecked: !item.isChecked };
            }
            return item;
        });
        props.setSelectedItems(temp);
    };

    const handleConfirmGenres = () => {
        var list = genres;
        props.selectedItems.map((item) => {
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
        props.genreList(list);
        changeGenres(list);
        props.toggle(false);
    }

    return (
        <Modal {...props}>
            <SafeAreaView style={styles.container}>
                <ScrollView style={{ width: '100%', height: 350 }}>
                    <View style={{ width: '100%', alignItems: 'center', justifyContent: 'center' }}>
                        {props.selectedItems.map((item) => {
                            return (
                                <TouchableOpacity  key={item.id}
                                    style={[styles.genreItem, item.isChecked ? ({ backgroundColor: '#4A0000' }) : null]}
                                    onPress={() => handleGenres(item.id)}
                                >
                                    {item.isChecked ? (
                                        <FontAwesome5 name="check" size={10} color="white" style={{ right: 10 }} />
                                    ) : null}
                                    <Text style={[styles.text, { marginTop: 0 }]}>{item.genre}</Text>
                                </TouchableOpacity>
                            )
                        })}
                        <TouchableOpacity onPress={handleConfirmGenres}>
                            <Text style={{ color: 'white', fontSize: 25, fontWeight: 'bold', marginTop: '15%', bottom: 25}}>Confirm</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </Modal>
    )
}

export default EpModal;