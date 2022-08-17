import React, { useEffect } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { Alert, Image, Platform, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfilePicture = (props) => {

    const [profilePicture, setProfilePicture] = React.useState(null);

    useEffect(() => {
        loadOnlyOnce();
    }, [props]);

    const loadOnlyOnce = async () => {
        const userId = await AsyncStorage.getItem('userId');
        await axios.get(`/user/image/get/${userId}`).then(response => {
            setProfilePicture(response.data.payload.profilePicture);
        }).catch(err => {
            // console.log(err);
            setProfilePicture(null);
        });
    }

    const selectImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        // console.log(result);

        // const data = new FormData();
        // data.append('profile picture', {
        //     type: result.type,
        //     uri: Platform.OS === 'ios' ? result.uri.replace('file://', '') : result.uri,
        // });

        // console.log(data);

        if (!result.cancelled) {
            const newUri = Platform.OS === 'ios' ? result.uri.replace('file://', '') : result.uri;
            const userId = await AsyncStorage.getItem('userId');
            const json = JSON.stringify({
                imageUri: newUri
            });
            await axios.post(`/user/image/upload/${userId}`, json, { headers: { 'Content-Type': 'application/json' } }).then(response => {
                loadOnlyOnce();
            }).catch(err => {
                console.log(err);
                Alert.alert("Upload has failed!");
            });
        }
    }

    return (
        profilePicture !== null ? (
            <TouchableOpacity onLongPress={selectImage} {...props} >
                <Image source={{ uri: profilePicture }} style={props.customStyle} />
            </TouchableOpacity>
        ) : <Ionicons name="person-circle-outline" size={50} color="white" onLongPress={selectImage} {...props} />
    )
}

export default ProfilePicture;