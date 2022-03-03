import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '../screens/HomeScreen';
import BookingScreen from '../screens/BookingScreen';

const Stack = createNativeStackNavigator();

const HomeScreenStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Home" component={HomeScreen} options={{headerShown:false,}} />
            <Stack.Screen name="View Details" component={BookingScreen} />
        </Stack.Navigator>
    )
}

export default HomeScreenStack