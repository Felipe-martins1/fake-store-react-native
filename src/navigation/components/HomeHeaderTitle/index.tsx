import { Text, View, StyleSheet } from 'react-native';
import { ShoppingCart } from 'lucide-react-native';
import { useCart } from '@src/context/CartContext';

export function HomeHeaderTitle() {
  const { cartState } = useCart();

  const totalItems = cartState.items.length;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Our Products</Text>
      <View style={styles.cartIconContainer} testID="cartIcon">
        {totalItems > 0 && (
          <Text style={styles.cartItemCount} testID="cartItemCount">
            {totalItems}
          </Text>
        )}
        <ShoppingCart size={24} color="black" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  cartIconContainer: {
    position: 'relative',
    flex: 1,
    alignItems: 'flex-end',
  },
  cartItemCount: {
    position: 'absolute',
    top: -10,
    right: 20,
    backgroundColor: 'green',
    color: 'white',
    borderRadius: 50,
    padding: 2,
    zIndex: 1,
  },
});
