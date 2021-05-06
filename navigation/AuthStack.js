import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import OnboardingScreen from '../screens/OnboardingScreen';
import LoginScreen from '../screens/LoginScreen';

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
      </Stack.Navigator>
  )

}

export default AuthStack;