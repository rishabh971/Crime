import React from 'react';
import RootNavigator from './rootStack';
import {navigationRef} from '../utils/navigationService';
import {NavigationContainer} from '@react-navigation/native';

const MainNavigationContainer = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <RootNavigator />
    </NavigationContainer>
  );
};

export default MainNavigationContainer;
