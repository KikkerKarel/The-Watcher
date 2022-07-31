import 'react-native-gesture-handler';
import { DarkTheme, NavigationContainer } from "@react-navigation/native"
import ListScreen from './components/List/List';
import AddEvent from './components/Add/AddEvent';
import axios from 'axios';
import LoginScreen from './components/Auth/Login/Login';
import React, { useEffect } from 'react';
import AuthService from './authentication/Auth.Service';
import { createDrawerNavigator } from '@react-navigation/drawer';
import LogoutScreen from './components/Auth/Logout/Logout';
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons';

const Drawer = createDrawerNavigator();

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
  }
  axios.defaults.baseURL = "http://192.168.178.227:5000";

  return (
    <NavigationContainer theme={DarkTheme} onStateChange={loadOnlyOnce}>
      <Drawer.Navigator initialRouteName='Login' screenOptions={{ headerTintColor: '#fff'}}>
        <Drawer.Screen name='List' component={ListScreen}
          options={{
            title: 'MyList',
            drawerIcon: (() => (
              // <FontAwesome5 name="list" color="white" />
              <MaterialIcons name="format-list-bulleted" size={20} color="white" />
            )),
            drawerActiveTintColor: '#EF0107',
            drawerLabelStyle: { color: '#fff' },
          }}
        />
        <Drawer.Screen name='Entry' component={AddEvent}
          options={{
            drawerIcon: (() => (
              <MaterialIcons name="playlist-add" size={20} color="white" />
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
        ) : null}
      </Drawer.Navigator>
    </NavigationContainer>
  )
}

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: '#121212',
//     flex: 1,
//     alignItems: 'center',
//   },
//   button: {
//     color: 'white',
//     marginTop: '15%',

//   },
//   text: {
//     color: 'white',
//     fontSize: 30
//   }
// });

export default App;

