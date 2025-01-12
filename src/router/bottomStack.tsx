import screens from '../utils/screens';
import {HomeScreen} from '../screens/home';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import CaptureEvidenceScreen from '../screens/capture';
import {NewCaseScreen} from '../screens/newCase';

const Tab = createBottomTabNavigator();

export default function BottomStack() {
  return (
    <Tab.Navigator screenOptions={{headerShown: false}}>
      <Tab.Screen
        name={screens.HOME}
        component={HomeScreen}
        options={{tabBarLabel: ''}}
      />
      <Tab.Screen
        name={screens.CAPTUREEVIDENCE}
        component={CaptureEvidenceScreen}
        options={{tabBarLabel: ''}}
      />
      <Tab.Screen
        name={screens.NEWCASE}
        component={NewCaseScreen}
        options={{tabBarLabel: ''}}
      />
    </Tab.Navigator>
  );
}
