import { createStackNavigator } from '@react-navigation/stack';

import { HomeScreen } from '@src/screens/HomeScreen';
import { HomeHeaderTitle } from '@src/navigation/components/HomeHeaderTitle';
import { CartScreen } from '@src/screens/CartScreen';

export type RootStackParamList = {
  Home: undefined;
  Cart: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();
export function Routes() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerTitle: HomeHeaderTitle,
        }}
      />
      <Stack.Screen
        name="Cart"
        component={CartScreen}
        options={{
          presentation: 'modal',
        }}
      />
    </Stack.Navigator>
  );
}
