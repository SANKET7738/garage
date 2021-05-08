import React, { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';


import OnboardingScreen from '../screens/OnboardingScreen';
import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';

const Stack = createStackNavigator();

const AuthStack = () => {
  const [ isFirstLaunch, setIsFirstLaunch ] = useState(null);

  useEffect(() => {
    AsyncStorage.getItem('alreadyLaunched').then(value => {
      if(value == null) {
        AsyncStorage.setItem('alreadyLaunched', 'true');
        setIsFirstLaunch(true);
      } else {
        setIsFirstLaunch(false);
      }
    });
  }, []);

  if( isFirstLaunch == null){
    return null;
  } else if( isFirstLaunch == true) {
    routeName = 'Onboarding';
  } else {
    routeName = 'Login';
  }

  return (
      <Stack.Navigator initialRouteName={routeName}>
          <Stack.Screen 
            name="Onboarding"
            component={OnboardingScreen}
            options={{ header: () => null}}
          />
          <Stack.Screen 
            name="Login"
            component={LoginScreen}
            options={{ header: () => null}}
          />
          <Stack.Screen 
            name="SignUp"
            component={SignUpScreen}
            options={{ header: () => null}}
            // options={({navigation}) => ({
            //   title: '',
            //   headerStyle: {
            //     backgroundColor: '#f9fafd',
            //     shadowColor: '#f9fafd',
            //     elevation: 0,
            //   },
            // })}
          />
      </Stack.Navigator>
  )

}

export default AuthStack;