import { View, StyleSheet, Image } from "react-native";
import { Icon } from "react-native-elements";
import ListPage from "./components/List/List";
import { Svg ,Path, SvgXml } from "react-native-svg";
import { TouchableHighlight } from "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

const MyStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name="home"
          component={App}
          options={{ title: 'Welcome' }}
        />
        <Stack.Screen name="list" component={ListPage} />
      </Stack.Navigator>
    </NavigationContainer>

  )
}

export default function App() {

  return (
      <MyStack />
  )
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: '#121212',
      alignItems: 'center',
      // justifyContent: 'center'
  },
  image: {
    tintColor: 'white',
    top: 50,
  }
});
