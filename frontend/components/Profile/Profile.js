import React from "react";
import axios from "axios";
import { useEffect } from "react";
import { Image, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-navigation";
import { styles } from "./ProfileStyles";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from "@react-navigation/native";
import { Ionicons } from '@expo/vector-icons';

export default function ProfileScreen({ navigation }) {

    const isFocused = useIsFocused();

    const [profilePicture, setProfilePicture] = React.useState(null);

    useEffect(() => {
        if (isFocused) {
            loadOnlyOnce();
        }
    }, [navigation]);

    const loadOnlyOnce = async () => {
        const userId = await AsyncStorage.getItem("userId");
        axios.get(`/user/image/get/${userId}`).then(response => {
            setProfilePicture(response.data.payload.profilePicture);
        }).catch(err => {
            console.log(err);
        });
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={{ width: '100%' }}>
                <View style={styles.header}>
                    <Image source={{ uri: profilePicture }} style={{ width: 150, height: 150, borderRadius: 150 }} />
                    <Text style={styles.headerText}>test</Text>
                </View>
                <View style={styles.statsContainer}>
                    <View style={styles.statsHeader}>
                        <Ionicons name="ios-stats-chart-sharp" size={20} color="white" style={{ right: 5 }} />
                        <Text style={[styles.headerText, { fontSize: 25, }]}>Stats</Text>
                    </View>
                    <View style={styles.statsBody}>
                        <View style={styles.statsTextBody}>
                            <Text style={styles.text}>Total dramas watched:</Text>
                            <Text style={styles.text}></Text>

                            <Text style={styles.text}>Total episodes watched:</Text>
                            <Text style={styles.text}></Text>
                        </View>

                        <View style={styles.statsTextBody}>
                            <Text style={styles.text}>Mean score:</Text>
                            <Text style={styles.text}></Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}