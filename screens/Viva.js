import React, { useState } from 'react';
import { View, Text, Button, Image, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { useSelector } from 'react-redux';

const Viva = ({navigation}) => {
    const user = useSelector(state => state.userState.currentUser);
    
    return(
        <View style={{ flex:1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Settings Screen</Text>
        </View>
    )
}

export default Viva