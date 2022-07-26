import { Text, StyleSheet, Button, Image, View, Pressable, TouchableOpacity } from 'react-native';
import { DarkTheme, NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import ListScreen from './components/List/List';
import AddEvent from './components/Add/AddEvent';
import axios from 'axios';


const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('List')}>
        <Text style={styles.text}>List</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Add')}>
        <Text style={styles.text}>Add</Text>
      </TouchableOpacity>
    </View>
  )
}

const TestScreen = ({ navigation, route }) => {
  return <Text>This is {route.params.text}</Text>
}

const App = () => {
  axios.defaults.baseURL = "http://192.168.178.227:5000";
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer theme={DarkTheme}>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="List" component={ListScreen} />
        <Stack.Screen name="Add" component={AddEvent} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#121212',
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    color: 'white',
    marginTop: '15%',

  },
  text: {
    color: 'white',
    fontSize: 30
  }
});

export default App;

