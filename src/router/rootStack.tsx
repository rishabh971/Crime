import React from 'react';
import screens from '../utils/screens';
import {SplashScreen} from '../screens/splash';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {LandingScreen} from '../screens/landing';
import {LoginScreen} from '../screens/login';
import {RegistrationScreen} from '../screens/registration';
import BottomStack from './bottomStack';
import CaptureEvidenceScreen from '../screens/capture';
import { NewCaseScreen } from '../screens/newCase';
import { RecentCase } from '../screens/recentCase';

const RootStack = createNativeStackNavigator();

const RootNavigator = () => {
  return (
    <RootStack.Navigator
      initialRouteName={screens.BOTTOMSTACK}
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
      <RootStack.Screen
        name={screens.BOTTOMSTACK}
        component={BottomStack}
        options={{navigationBarHidden: true}}
      />
      <RootStack.Screen
        name={screens.CAPTUREEVIDENCE}
        component={CaptureEvidenceScreen}
        options={{navigationBarHidden: true}}
      />
      <RootStack.Screen
        name={screens.NEWCASE}
        component={NewCaseScreen}
        options={{navigationBarHidden: true}}
      />
       <RootStack.Screen
        name={screens.RECENTCASE}
        component={RecentCase}
        options={{navigationBarHidden: true}}
      />
    </RootStack.Navigator>
  );
};

export default RootNavigator;
