import screens from '../utils/screens';
import {Image} from 'react-native';
import {HomeScreen} from '../screens/home';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import CaptureEvidenceScreen from '../screens/capture';
import {NewCaseScreen} from '../screens/newCase';
import { images } from '../asset';

const Tab = createBottomTabNavigator();

export default function BottomStack() {
  return (
    <Tab.Navigator screenOptions={{headerShown: false, tabBarShowLabel: false}}>
      <Tab.Screen
        name={screens.HOME}
        component={HomeScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <Image source={focused ? images.HOME_ACTIVE: images.HOME} />
          ),
        }}
      />
      <Tab.Screen
        name={screens.CAPTUREEVIDENCE}
        component={CaptureEvidenceScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <Image source={focused ? images.SEARCH_ACTIVE: images.SEARCH_ICON} />
          ),
        }}
      />
      <Tab.Screen
        name={screens.NEWCASE}
        component={NewCaseScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <Image source={focused ? images.SETTING: images.SETTING} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
