import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import ListScreen from "../List/List";
import HomeScreen from "../../App";
import { View, Text } from "react-native";

const Stack = createNativeStackNavigator();

const MenuScreen = () => {
    return (
        <View>
            <Text>Test</Text>
        </View>
    )
}

export default MenuScreen;