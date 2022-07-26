import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import ListScreen from "../List/List";
import HomeScreen from "../../App";

const Stack = createNativeStackNavigator();

const Menu = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="home"
                    component={HomeScreen}
                    options={{ title: 'Welcome'}}
                />
                <Stack.Screen name="List" component={ListScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Menu;