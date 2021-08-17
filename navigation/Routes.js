import React, { useState }from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AuthStack from './AuthStack';
import AppStack from './AppStack';
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
        <NavigationContainer>
            <AppStack/>
        </NavigationContainer>
    )
}


export default Routes;