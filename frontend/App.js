import 'react-native-gesture-handler';
import { StyleSheet } from 'react-native';
import { DarkTheme, NavigationContainer } from "@react-navigation/native"
import ListScreen from './components/List/List';
import AddEvent from './components/Add/AddEvent';
import axios from 'axios';
import LoginScreen from './components/Auth/Login/Login';
import React, { useEffect } from 'react';
import AuthService from './authentication/Auth.Service';
import { createDrawerNavigator } from '@react-navigation/drawer';
import LogoutScreen from './components/Auth/Logout/Logout';

const Drawer = createDrawerNavigator();

const App = () => {

  const [loggedIn, setIsLoggedIn] = React.useState(false);

  useEffect(() => {
    loadOnlyOnce();
  }, []);

  const loadOnlyOnce = async () => {
    if (await AuthService.isLoggedIn()) {
      setIsLoggedIn(true);
    }
  }
  axios.defaults.baseURL = "http://192.168.178.227:5000";

  return (
    <NavigationContainer theme={DarkTheme}>
      <Drawer.Navigator initialRouteName='List'>
        <Drawer.Screen name='List' component={ListScreen} />
        <Drawer.Screen name='+ Entry' component={AddEvent} />
        <Drawer.Screen name='Login' component={LoginScreen} />
        <Drawer.Screen name='Logout' component={LogoutScreen} />
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

