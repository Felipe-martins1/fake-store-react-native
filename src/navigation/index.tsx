import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { HomeScreen } from '@src/screens/HomeScreen';

const Tab = createBottomTabNavigator();

export function Routes() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
    </Tab.Navigator>
  );
}
