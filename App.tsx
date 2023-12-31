import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { Routes } from '@src/navigation';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { CartProvider } from '@src/context/CartContext';

const queryClient = new QueryClient();

export default function App() {
  return (
    <NavigationContainer>
      <QueryClientProvider client={queryClient}>
        <StatusBar />
        <CartProvider>
          <Routes />
        </CartProvider>
      </QueryClientProvider>
    </NavigationContainer>
  );
}
