import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { HomeScreen } from '@src/screens/HomeScreen';
import { HomeHeaderTitle } from '@src/navigation/components/HomeHeaderTitle';

const Tab = createBottomTabNavigator();

export function Routes() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerTitle: HomeHeaderTitle,
        }}
      />
    </Tab.Navigator>
  );
}
