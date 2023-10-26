import { TouchableOpacity, View, Image, Text, StyleSheet } from 'react-native';
import React from 'react';
import { mergeStyles } from '@src/utils/styles';

type Props = {
  product: {
    id: number;
    title: string;
    price: string;
    image: string;
  };

  onPressAddToCart: (product: Props['product']) => void;
  style?: React.ComponentPropsWithoutRef<typeof TouchableOpacity>['style'];
};
export function ProductCard({ product, onPressAddToCart, style = {} }: Props) {
  return (
    <View style={mergeStyles(styles.container, style)}>
      <View testID="productCard">
        <Image source={{ uri: product.image }} style={styles.image} />
        <Text testID="productName" style={styles.title}>
          {product.title}
        </Text>
      </View>
      <View>
        <Text testID="productPrice" style={styles.price}>
          {Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
          }).format(Number(product.price))}
        </Text>
        <TouchableOpacity
          onPress={() => onPressAddToCart(product)}
          style={styles.addToCartButton}
          testID="addToCartButton">
          <Text style={styles.addToCartButtonText}>+ Add to cart</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 140,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
    borderRadius: 8,
    padding: 6,
    backgroundColor: 'white',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  image: {
    height: 100,
    objectFit: 'contain',
    backgroundColor: 'white',
    borderRadius: 8,
    marginBottom: 10,
  },
  title: {
    fontSize: 13,
  },
  price: {
    color: 'white',
    fontWeight: '600',
    marginTop: 4,
    backgroundColor: 'green',
    padding: 4,
    borderRadius: 4,
    alignSelf: 'flex-start',
  },
  addToCartButton: {
    backgroundColor: 'black',
    padding: 8,
    borderRadius: 8,
    marginTop: 10,
  },
  addToCartButtonText: {
    color: 'white',
    alignSelf: 'center',
    fontWeight: 'bold',
  },
});
