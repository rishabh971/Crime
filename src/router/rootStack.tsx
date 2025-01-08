import React from 'react';
import screens from '../utils/screens';
import {SplashScreen} from '../screens/splash';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {LandingScreen} from '../screens/landing';
import {LoginScreen} from '../screens/login';
import {RegistrationScreen} from '../screens/registration';

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
        name={screens.LANDING}
        component={LandingScreen}
        options={{navigationBarHidden: true}}
      />
      <RootStack.Screen
        name={screens.LOGIN}
        component={LoginScreen}
        options={{navigationBarHidden: true}}
      />
      <RootStack.Screen
        name={screens.REGISTRATION}
        component={RegistrationScreen}
        options={{navigationBarHidden: true}}
      />
    </RootStack.Navigator>
  );
};

export default RootNavigator;
