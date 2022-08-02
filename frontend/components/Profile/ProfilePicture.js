import React, { useEffect } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { Alert, Image, Pressable, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfilePicture = ({ navigation }) => {

    const [profilePicture, setProfilePicture] = React.useState(null);

    useEffect(() => {
        loadOnlyOnce();
    }, []);

    const loadOnlyOnce = async () => {
        const userId = await AsyncStorage.getItem('userId');
        await axios.get(`/user/image/get/${userId}`).then(response => {
            setProfilePicture(response.data.payload.profilePicture);
        }).catch(err => {
            console.log(err);
        })
    }

    const selectImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.cancelled) {
            const newUri = result.uri.replace('file://', '');
            const userId = await AsyncStorage.getItem('userId');
            const json = JSON.stringify({
                imageUri: newUri
            });
            await axios.post(`/user/image/upload/${userId}`, json, { headers: { 'Content-Type': 'application/json' } }).then(response => {
                setProfilePicture(newUri);
            }).catch(err => {
                console.log(err);
                Alert.alert("Upload has failed!");
            });
        }
    }

    return (
        profilePicture !== null ? (
            <TouchableOpacity onLongPress={selectImage} onPress={() => console.log('pressed')}>
                <Image source={{ uri: profilePicture }} style={{ width: 75, height: 75, borderRadius: 50 }} />
            </TouchableOpacity>
        ) : <Ionicons name="person-circle-outline" size={50} color="white" onLongPress={selectImage} />
    )
}

export default ProfilePicture;