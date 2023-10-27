import { TouchableOpacity, View, Image, Text } from 'react-native';
import React from 'react';
import { mergeStyles } from '@src/utils/styles';
import { styles } from './styles';

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
