import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { CartProduct as CartProductType } from '@src/context/CartContext';
import { styles } from './styles';

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

        <View style={styles.actionsContainer}>
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
    </View>
  );
}
