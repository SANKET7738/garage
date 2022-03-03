import React, { useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons'; 
import { MaterialIcons } from '@expo/vector-icons';

import HomeScreen from '../screens/HomeScreen';
import SettingsScreen from '../screens/SettingsScreen';
import BookedScreen from '../screens/BookedScreen';
import UserProfileScreen from '../screens/UserProfileScreen';
import Viva from '../screens/Viva';
import ParkingListings from '../screens/ParkingListings';

import SettingStack from './SettingStack';
import ListingStack from './ListingStack';
import HomeStack from './HomeStack';

const Tab = createBottomTabNavigator();

const Appstack = () => {
    return (
        <Tab.Navigator initialRouteName="Home"  screenOptions={{headerShown: false}}>
            <Tab.Screen 
                name="Home" 
                component={HomeStack}
                options={{
                    tabBarShowLabel: false,
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="compass-sharp" size={28} color="#F50057" />
                    )
                }} 
            />
            <Tab.Screen 
                name="Booked" 
                component={BookedScreen}
                options={{
                    tabBarShowLabel: false,
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="bookmark" size={28} color="#F50057" />
                    )
                }} 
            />
            {/* <Tab.Screen 
                name="Profile" 
                component={UserProfileScreen}
                options={{
                    tabBarShowLabel: false,
                    tabBarVisible: false,
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome name="user-circle" size={28} color="#F50057" />
                    )
                }} 
            /> */}
            <Tab.Screen
                name="ParkingListings"
                component={ListingStack}
                options={{
                    tabBarShowLabel: false,
                    tabBarIcon: (() => (
                        <MaterialIcons name="local-parking" size={28} color="#F50057" />
                    ))
                }}

            />
            <Tab.Screen 
                name="Settings" 
                component={SettingStack}
                options={{
                    tabBarShowLabel: false,
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="md-settings-sharp" size={28} color="#F50057" />
                    )
                }} 
            />
            
         </Tab.Navigator>
    );
}

export default Appstack