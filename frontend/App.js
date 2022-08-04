import 'react-native-gesture-handler';
import { DarkTheme, NavigationContainer } from "@react-navigation/native"
import axios from 'axios';
import LoginScreen from './components/Auth/Login/Login';
import React, { useEffect } from 'react';
import AuthService from './authentication/Auth.Service';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import LogoutScreen from './components/Auth/Logout/Logout';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ProfilePicture from './components/Profile/ProfilePicture';
import ProfileScreen from './components/Profile/Profile';
import TabNavList from './components/Tab/TabNavList';
import TabNavEntry from './components/Tab/TabNavEntry';
import RegisterScreen from './components/Auth/Register/Register';


const Drawer = createDrawerNavigator();

const CustomDrawer = (props) => {

  const [username, setUsername] = React.useState('');

  useEffect(() => {
    loadOnlyOnce();
  }, [props])

  const loadOnlyOnce = async () => {
    setUsername(await AsyncStorage.getItem("username"));
  }

  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.container}>
        <ProfilePicture customStyle={{ width: 100, height: 100, borderRadius: 50 }} />
        <Text style={styles.text}>{username}</Text>
      </View>
      <DrawerItemList {...props} />

      <Drawer.Screen name='Logout' component={LogoutScreen}
        options={{
          drawerIcon: (() => (
            <MaterialIcons name="logout" size={20} color="white" />
          )),
          drawerActiveTintColor: '#EF0107',
          drawerLabelStyle: { color: '#fff' }
        }}
      />
    </DrawerContentScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#4A0000',
    borderRadius: 5,
    height: '40%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    color: '#fff',
    fontSize: 25,
    fontWeight: 'bold'
  }
});


const App = () => {

  const [loggedIn, setIsLoggedIn] = React.useState(false);

  useEffect(() => {
    loadOnlyOnce();
  }, []);

  const loadOnlyOnce = async () => {
    if (await AuthService.isLoggedIn()) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  };


  axios.defaults.baseURL = "http://192.168.178.227:5000";

  return (
    <NavigationContainer theme={DarkTheme} onStateChange={loadOnlyOnce}>
      <Drawer.Navigator initialRouteName='Login' screenOptions={{ headerTintColor: '#fff' }} drawerContent={props => <CustomDrawer {...props} />}>
        {loggedIn ? (
          <Drawer.Screen name='Profile' component={ProfileScreen}
            options={{
              drawerIcon: (() => (
                <Ionicons name="person-circle-outline" size={20} color="white" />
              )),
              drawerActiveTintColor: '#EF0107',
              drawerLabelStyle: { color: '#fff' },
            }}
          />
        ) : null}
        <Drawer.Screen name='List' component={TabNavList}
          options={{
            title: 'MyList',
            drawerIcon: (() => (
              <MaterialIcons name="format-list-bulleted" size={20} color="white" />
            )),
            drawerActiveTintColor: '#EF0107',
            drawerLabelStyle: { color: '#fff' },
          }}
        />
        <Drawer.Screen name='Entry' component={TabNavEntry}
          options={{
            drawerIcon: (() => (
              <MaterialIcons name="playlist-add" size={20} color="white" />
            )),
            drawerActiveTintColor: '#EF0107',
            drawerLabelStyle: { color: '#fff' }
          }}
        />
        {loggedIn ? (
          <Drawer.Screen name='Logout' component={LogoutScreen}
            options={{
              drawerIcon: (() => (
                <MaterialIcons name="logout" size={20} color="white" />
              )),
              drawerActiveTintColor: '#EF0107',
              drawerLabelStyle: { color: '#fff' }
            }}
          />
        ) :
          <>
            <Drawer.Screen name='Register' component={RegisterScreen}
              options={{
                drawerIcon: (() => (
                  <MaterialIcons name="person-add-alt-1" size={20} color="white" />
                )),
                drawerActiveTintColor: '#EF0107',
                drawerLabelStyle: { color: '#fff' }
              }}
            />
            <Drawer.Screen name='Login' component={LoginScreen}
              options={{
                drawerIcon: (() => (
                  <MaterialIcons name="login" size={20} color="white" />
                )),
                drawerActiveTintColor: '#EF0107',
                drawerLabelStyle: { color: '#fff' },
              }}
            />
          </>
        }
      </Drawer.Navigator>
    </NavigationContainer>
  )
}

export default App;

