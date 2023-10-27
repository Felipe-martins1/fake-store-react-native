import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useCart, CartActionTypes, CartProduct as CartProductType } from '@src/context/CartContext';
import { CartProduct } from '@src/components/CartProduct';
import { styles } from './styles';
export function CartScreen() {
  const { cartState, dispatch } = useCart();

  function increaseQuantity(product: CartProductType) {
    dispatch({
      type: CartActionTypes.ADD_TO_CART,
      payload: product.product,
    });
  }

  function decreaseQuantity(product: CartProductType) {
    dispatch({
      type: CartActionTypes.REMOVE_FROM_CART,
      payload: product.product,
    });
  }

  function clearProductFromCart(product: CartProductType) {
    dispatch({
      type: CartActionTypes.CLEAR_PRODUCT_FROM_CART,
      payload: product.product,
    });
  }

  function clearCart() {
    dispatch({
      type: CartActionTypes.CLEAR_CART,
      payload: null,
    });
  }

  function buy() {
    clearCart();
    alert('Thanks for buying!');
  }

  function getTotalPrice() {
    return cartState.items.reduce((total, item) => {
      return total + Number(item.product.price) * item.quantity;
    }, 0);
  }

  return (
    <View style={styles.container}>
      {cartState.items.length > 0 && (
        <ScrollView
          style={{
            flex: 1,
          }}>
          {cartState.items.map((item) => (
            <CartProduct
              key={item.product.id}
              item={item}
              increaseQuantity={increaseQuantity}
              decreaseQuantity={decreaseQuantity}
              removeProduct={clearProductFromCart}
            />
          ))}
        </ScrollView>
      )}

      {cartState.items.length > 0 ? (
        <View>
          <Text style={styles.totalText}>
            Total:{' '}
            {Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD',
            }).format(getTotalPrice())}
          </Text>
          <TouchableOpacity onPress={buy} style={styles.buyButton}>
            <Text style={styles.buyButtonText}>
              Buy {cartState.items.length} item{cartState.items.length > 1 ? 's' : ''}
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <Text style={styles.emptyCartText}>Your cart is empty</Text>
      )}
    </View>
  );
}
