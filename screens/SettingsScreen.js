import React, { useState } from 'react';
import { View, Text, Button, Image, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { useSelector } from 'react-redux';

const SettingsScreen = ({navigation}) => {
    const user = useSelector(state => state.userState.currentUser);
    
    return(
        <View style={{ flex:1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Settings</Text>
            <Text>{user}</Text>
        </View>
    )
}

export default SettingsScreen