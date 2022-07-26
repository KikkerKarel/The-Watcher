import { View, Text, StyleSheet, Button } from 'react-native';
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import ListScreen from './components/List/List';


const MenuScreen = ({ navigation }) => {
  return (
    <Button
      title='Go to Menu'
      onPress={() => {
        navigation.navigate('Test', { text: 'Test screen'})
      }}
    />
  )
}

const TestScreen = ({ navigation, route }) => {
  return <Text>This is {route.params.text}</Text>
}

const App = () => {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Menu" component={MenuScreen} />
        <Stack.Screen name="Test" component={TestScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#121212',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'white',

  }
});

export default App;