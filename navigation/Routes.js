import React, { useState }from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AuthStack from './AuthStack';
import { useSelector } from 'react-redux';

const Routes = () => {
    const user = useSelector(state => state.userState.currentUser);
   
    if(!user){
        return (
            <NavigationContainer>
                <AuthStack/>
            </NavigationContainer>
        )
    }

    return (
        <View style={{ flex:1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>{user}</Text>
        </View>
    )
}


export default Routes;