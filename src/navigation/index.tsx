import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { HomeScreen } from '@src/screens/HomeScreen';
import { Text } from 'react-native';

const Tab = createBottomTabNavigator();

export function Routes() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerTitle: 'Nossos Produtos',
        }}
      />
    </Tab.Navigator>
  );
}
