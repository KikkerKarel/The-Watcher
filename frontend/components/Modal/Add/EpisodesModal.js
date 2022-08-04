import { SafeAreaView, ScrollView, Text,TouchableOpacity, View } from "react-native";
import Modal from "react-native-modal";
import { FontAwesome5 } from '@expo/vector-icons';
import { allGenres } from "../../../utils/lists";
import React, { useEffect } from "react";

const EpModal = (props) => {

    const [genres, changeGenres] = React.useState([]);

    // useEffect(() => {
    //     loadOnlyOnce();
    // }, [props]);

    // const loadOnlyOnce = async () => {
    //     changeGenres(props.genres);
    // }


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
            <SafeAreaView style={{ backgroundColor: '#121212', borderRadius: 5, justifyContent: 'center', alignItems: 'center' }}>
                <ScrollView style={{ width: '100%', height: 300 }}>
                    <View style={{ width: '100%', alignItems: 'center', justifyContent: 'center' }}>
                        {props.selectedItems.map((item) => {
                            return (
                                <TouchableOpacity key={item.id}
                                    style={[{ width: '75%', borderRadius: 10, justifyContent: 'center', alignItems: 'center', flexDirection: 'row', marginTop: '2%' }]}
                                    onPress={() => handleGenres(item.id)}
                                >
                                    {item.isChecked ? (
                                        <FontAwesome5 name="check" size={20} color="white" style={{ right: 10 }} />
                                    ) : null}
                                    <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 25 }}>{item.genre}</Text>
                                </TouchableOpacity>
                            )
                        })}
                        <TouchableOpacity onPress={handleConfirmGenres}>
                            <Text style={{ color: 'white', fontSize: 25, fontWeight: 'bold', marginTop: '5%'}}>Confirm</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </Modal>
    )
}

export default EpModal;