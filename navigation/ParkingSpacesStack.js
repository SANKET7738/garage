import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ParkingSpacesScreen from '../screens/ParkingSpacesScreen';
import AddAddressScreen from '../screens/AddAddressScreen';

const Stack = createNativeStackNavigator();

const ParkingSpacesStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name = "Parking Spaces" component={ParkingSpacesScreen} options={{headerShown: false,}} />
            <Stack.Screen name = "AddAddress" component={AddAddressScreen} options={{headerShown:false}}/>
        </Stack.Navigator>
    )
}

export default ParkingSpacesStack
