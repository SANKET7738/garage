import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ParkingSpacesScreen from '../screens/ParkingSpacesScreen';
import AddAddressScreen from '../screens/AddAddressScreen';
import ParkingSpaceDetailsScreen from '../screens/ParkingSpaceDetailsScreen';
import ParkingSpaceAddPhotos from '../screens/ParkingSpaceAddPhotos';

const Stack = createNativeStackNavigator();

const ParkingSpacesStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name = "Parking Spaces" component={ParkingSpacesScreen} options={{headerShown: false,}} />
            <Stack.Screen name = "AddAddress" component={AddAddressScreen} options={{headerShown:false}}/>
            <Stack.Screen name="Parking Space Details" component={ParkingSpaceDetailsScreen} options={{headerShown:false}}/>
            <Stack.Screen name="Parking Space Photos" component={ParkingSpaceAddPhotos} options={{headerShown:false}}/>
        </Stack.Navigator>
    )
}

export default ParkingSpacesStack
