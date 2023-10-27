import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { useCart, CartActionTypes, CartProduct as CartProductType } from '@src/context/CartContext';
import { CartProduct } from '@src/components/CartProduct';

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'space-between',
  },
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    paddingBottom: 10,
  },
  productImage: {
    width: 80,
    height: 80,
    marginRight: 10,
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  productPrice: {
    fontSize: 14,
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  controlButton: {
    backgroundColor: 'black',
    padding: 8,
    borderRadius: 8,
  },
  controlButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  quantityText: {
    marginHorizontal: 10,
    fontSize: 16,
  },
  removeButton: {
    backgroundColor: 'red',
    padding: 8,
    borderRadius: 8,
  },
  removeButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  buyButton: {
    backgroundColor: 'green',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buyButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
  totalText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  emptyCartText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
