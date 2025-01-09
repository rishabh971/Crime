import screens from '../utils/screens';
import {HomeScreen} from '../screens/home';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

export default function BottomStack() {
  return (
    <Tab.Navigator screenOptions={{headerShown: false}}>
      <Tab.Screen name={screens.HOME} component={HomeScreen} />
    </Tab.Navigator>
  );
}
