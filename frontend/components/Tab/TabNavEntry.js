import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import AddEvent from '../Add/Drama/AddEvent';
import AddEventMovie from '../Add/Movie/AddEventMovie';

const Tab = createMaterialTopTabNavigator();

const TabNavEntry = () => {
    return (
        <Tab.Navigator
            initialRouteName='Drama'
            screenOptions={{
                tabBarActiveTintColor: '#fff',
                tabBarLabelStyle: { fontSize: 12 },
                tabBarStyle: { backgroundColor: '#121212' },
                tabBarIndicatorStyle: { backgroundColor: '#4A0000'}
            }}
        >
            <Tab.Screen
                name='Drama'
                component={AddEvent}
                options={{ tabBarLabel: 'Dramas' }}
            />
            <Tab.Screen
                name='Movie'
                component={AddEventMovie}
                options={{ tabBarLabel: 'Movies' }}
            />
        </Tab.Navigator>
    );
}

export default TabNavEntry;