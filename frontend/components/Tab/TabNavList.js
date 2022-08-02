import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ListScreen from '../List/DramaList';
import MovieListScreen from '../List/MovieList';

const Tab = createMaterialTopTabNavigator();

const TabNavList = () => {
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
                component={ListScreen}
                options={{ tabBarLabel: 'Dramas' }}
            />
            <Tab.Screen
                name='Movie'
                component={MovieListScreen}
                options={{ tabBarLabel: 'Movies' }}
            />
        </Tab.Navigator>
    );
}

export default TabNavList;