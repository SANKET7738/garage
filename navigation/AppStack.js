import React, { useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons'; 

import ParkingScreen from '../screens/HomeScreen';
import SettingsScreen from '../screens/SettingsScreen';
import BookedScreen from '../screens/BookedScreen';
import UserProfileScreen from '../screens/UserProfileScreen';

const Tab = createBottomTabNavigator();

const Appstack = () => {
    return (
        <Tab.Navigator initialRouteName="Home"  screenOptions={{headerShown: false}}>
            <Tab.Screen 
                name="Parking" 
                component={ParkingScreen}
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
            <Tab.Screen 
                name="Profile" 
                component={UserProfileScreen}
                options={{
                    tabBarShowLabel: false,
                    tabBarVisible: false,
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome name="user-circle" size={28} color="#F50057" />
                    )
                }} 
            />
            <Tab.Screen 
                name="Settings" 
                component={SettingsScreen}
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