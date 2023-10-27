import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { CartActionTypes, CartProduct as CartProductType } from '@src/context/CartContext';

type Props = {
  item: CartProductType;
  increaseQuantity: (product: CartProductType) => void;
  decreaseQuantity: (product: CartProductType) => void;
  removeProduct: (product: CartProductType) => void;
};
export function CartProduct({ item, increaseQuantity, decreaseQuantity, removeProduct }: Props) {
  return (
    <View key={item.product.id} style={styles.cartItem}>
      <Image source={{ uri: item.product.image }} style={styles.productImage} />

      <View style={styles.productInfo}>
        <Text style={styles.productName}>{item.product.title}</Text>
        <Text style={styles.productPrice}>
          {Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
          }).format(Number(item.product.price))}
        </Text>

        <View style={styles.quantityControls}>
          <TouchableOpacity
            onPress={() => decreaseQuantity(item)}
            style={styles.controlButton}
            testID="decreaseQuantityButton">
            <Text style={styles.controlButtonText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.quantityText}>{item.quantity}</Text>
          <TouchableOpacity
            onPress={() => increaseQuantity(item)}
            style={styles.controlButton}
            testID="increaseQuantityButton">
            <Text style={styles.controlButtonText}>+</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => removeProduct(item)} testID="removeButton">
          <Text style={styles.removeButtonText}>Remove</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
});
