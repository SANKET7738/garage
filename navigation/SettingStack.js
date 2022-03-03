import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SettingsScreen from '../screens/SettingsScreen';
import ProfileScreen from '../screens/UserProfileScreen';
import ParkingSpacesStack from './ParkingSpacesStack';
import VehicleDetailsScreen from '../screens/VehicleDetailsScreen';
import AddVehicleScreen from '../screens/AddVehicleScreen';

const Stack = createNativeStackNavigator();

const SettingStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Settings" component={SettingsScreen} />
            <Stack.Screen name="Profile" component={ProfileScreen} />
            <Stack.Screen name="Vehicle Details" component={VehicleDetailsScreen} />
            <Stack.Screen name="Parking Spaces" component={ParkingSpacesStack} />
            <Stack.Screen name="Add Vehicle" component={AddVehicleScreen} />
        </Stack.Navigator>
    )
}

export default SettingStack;