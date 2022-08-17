import React, { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-navigation";
import { styles } from "./ProfileStyles";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from "@react-navigation/native";
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import AuthService from '../../authentication/Auth.Service';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import ProfilePicture from "./ProfilePicture";

export default function ProfileScreen({ navigation }) {

    const isFocused = useIsFocused();

    const [username, setUsername] = React.useState('');
    const [profilePicture, setProfilePicture] = React.useState(null);
    const [dramas, setDramas] = React.useState([]);

    useEffect(() => {
        if (isFocused) {
            loadOnlyOnce();
        }
    }, [navigation]);

    const loadOnlyOnce = async () => {
        if (await AuthService.isLoggedIn()) {
            await AsyncStorage.getItem("username").then(response => {
                setUsername(response);
            });
            const userId = await AsyncStorage.getItem("userId");
            // axios.get(`/user/image/get/${userId}`).then(response => {
            //     setProfilePicture(response.data.payload.profilePicture);
            // }).catch(err => {
            //     console.log(err);
            // });

            await axios.get(`/drama/get/${userId}`).then(response => {
                setDramas(response.data.payload);
            }).catch(err => {
                console.log(err);
            });
        } else {
            Alert.alert("Please log in to view your profile!")
        }
    }

    const Total = () => {
        let sum = 0;
        var eps = [];
        dramas.forEach(item => {
            eps.push(item.episodes);
        });
        for (var i = 0; i < eps.length; i++) {
            sum += eps[i];
        }

        return (
            <Text style={[styles.statsText, { left: 20 }]}>{sum}</Text>
        )
    }

    const WatchedEps = () => {
        let sum = 0;
        var watched = [];
        dramas.forEach(item => {
            watched.push(item.progress);
        });
        for (var i = 0; i < watched.length; i++) {
            sum += watched[i];
        }

        return (
            <Text style={[styles.statsText, { left: 20 }]}>{sum}</Text>
        )
    }

    const MeanScore = () => {
        let sum = 0;
        var score = [];
        dramas.forEach(item => {
            score.push(item.score);;
        });
        for (var i = 0; i < score.length; i++) {
            sum += score[i];
        };

        let mean = (sum / score.length).toFixed(2);
        return (
            <Text style={[styles.statsText, { left: 20 }]}>{mean}</Text>
        )
    }

    const [changeUsername, setChangeUsername] = React.useState(false);
    const [changePassword, setChangePassword] = React.useState(false);

    const [newUsername, setNewUsername] = React.useState('');
    const [newPassword, setNewPassword] = React.useState('');
    const [confirmPassword, setConfirmPassword] = React.useState('');

    const updateUsername = async () => {
        const userId = await AsyncStorage.getItem("userId");
        const json = JSON.stringify({
            username: changeUsername
        });
        await axios.post(`/user/update/username/${userId}`, json, { headers: { 'Content-Type': 'application/json' }}).then(async() => {
            await AsyncStorage.removeItem("username");
            await AsyncStorage.setItem("username", changeUsername);
            Alert.alert("Updated!");
        }).catch(err => {
            Alert.alert("Action failed");
        });
    }

    const updatePassword = async () => {
        const userId = await AsyncStorage.getItem("userId");
        if (newPassword === confirmPassword) {
            const json = JSON.stringify({
                password: confirmPassword
            });
            await axios.post(`/user/update/username/${userId}`, json, { headers: { 'Content-Type': 'application/json' }}).then(async() => {
                await AsyncStorage.removeItem("username");
                await AsyncStorage.setItem("username", changeUsername);
                Alert.alert("Updated!");
            }).catch(err => {
                Alert.alert("Action failed");
            });
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAwareScrollView style={{ width: '100%' }} keyboardDismissMode="on-drag" resetScrollToCoords={{ x: 0, y: 0 }}>
                <View style={styles.header}>
                    <ProfilePicture customStyle={{ width: 150, height: 150, borderRadius: 150 }} />
                    <Text style={[styles.headerText, { color: '#fff'}]}>{username}</Text>
                </View>
                <View style={styles.statsContainer}>
                    <View style={styles.statsHeader}>
                        <Ionicons name="ios-stats-chart-sharp" size={20} color="#E5E4E2" style={{ right: 5 }} />
                        <Text style={[styles.headerText, { fontSize: 25, }]}>Stats</Text>
                    </View>
                    <View style={styles.statsBody}>
                        <View style={styles.statsTextBody}>
                            <View style={{ flexDirection: 'row', flex: 0.2, alignItems: 'center' }}>
                                <Text style={styles.statsText}>Total dramas:</Text>
                                <Text style={[styles.statsText, { left: 20 }]}>{dramas.length}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', flex: 0.2 }}>
                                <Text style={[styles.statsText,]}>Total episodes:</Text>
                                <Total />
                            </View>
                            <View style={{ flexDirection: 'row', flex: 0.2 }}>
                                <Text style={[styles.statsText,]}>Total episodes watched:</Text>
                                <WatchedEps />
                            </View>
                        </View>

                        <View style={[styles.statsTextBody, { flexDirection: 'row', alignItems: 'center' }]}>
                            <Text style={styles.statsText}>Mean score:</Text>
                            <MeanScore />
                        </View>
                    </View>
                </View>
                <View style={styles.settingsContainer}>
                    <View style={{ marginTop: '5%', flex: 1, alignItems: 'center' }}>
                        <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }} onPress={() => setChangeUsername(!changeUsername)}>
                            <FontAwesome5 name="exchange-alt" size={15} style={{ right: 5 }} color="white" />
                            <Text style={styles.text}>Change username</Text>
                        </TouchableOpacity>
                        {changeUsername ? (
                            <View style={{ width: '90%', alignItems: 'center' }}>
                                <TextInput
                                    style={styles.textInput}
                                    onChangeText={setNewUsername}
                                    value={newUsername}
                                    clearButtonMode='always'
                                    textAlign="center"
                                />
                                <TouchableOpacity style={styles.confirmButton} onPress={updateUsername}>
                                    <Text style={{ fontWeight: 'bold' }}>Confirm</Text>
                                </TouchableOpacity>
                            </View>

                        ) : null}
                    </View>
                    <View style={{ marginTop: '5%', flex: 1, alignItems: 'center' }}>
                        <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }} onPress={() => setChangePassword(!changePassword)}>
                            <FontAwesome5 name="exchange-alt" size={15} style={{ right: 5 }} color="white" />
                            <Text style={styles.text}>Change password</Text>
                        </TouchableOpacity>
                        {changePassword ? (
                            <View style={{ width: '90%', alignItems: 'center' }}>
                                <TextInput
                                    style={styles.textInput}
                                    onChangeText={setNewPassword}
                                    value={newPassword}
                                    clearButtonMode='always'
                                    secureTextEntry={true}
                                    textAlign="center"
                                />
                                <TextInput
                                    style={styles.textInput}
                                    onChangeText={setConfirmPassword}
                                    value={confirmPassword}
                                    clearButtonMode='always'
                                    secureTextEntry={true}
                                    textAlign="center"
                                />
                                <TouchableOpacity style={styles.confirmButton} onPress={updatePassword}>
                                    <Text style={{ fontWeight: 'bold' }}>Confirm</Text>
                                </TouchableOpacity>
                            </View>
                        ) : null}
                    </View>
                </View>
            </KeyboardAwareScrollView>
        </SafeAreaView>
    )
}