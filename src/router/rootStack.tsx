import React from 'react';
import screens from '../utils/screens';
import {SplashScreen} from '../screens/splash';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { LoginScreen } from '../screens/login';

const RootStack = createNativeStackNavigator();

const RootNavigator = () => {
  return (
    <RootStack.Navigator
      initialRouteName={screens.SPLASH}
      screenOptions={{
        headerShown: false,
        gestureEnabled: false,
      }}>
      <RootStack.Screen
        name={screens.SPLASH}
        component={SplashScreen}
        options={{navigationBarHidden: true}}
      />
      <RootStack.Screen
        name={screens.LOGIN}
        component={LoginScreen}
        options={{navigationBarHidden: true}}
      />
    </RootStack.Navigator>
  );
};

export default RootNavigator;
