import { TouchableOpacity, View, Image, Text } from 'react-native';

type Props = {
  product: {
    id: number;
    title: string;
    price: string;
    image: string;
  };

  onPress: (product: Props['product']) => void;
};
export function ProductCard({ product, onPress }: Props) {
  return (
    <TouchableOpacity onPress={() => onPress(product)}>
      <View testID="productCard">
        <Image
          source={{ uri: product.image }}
          style={{
            width: 140,
            height: 140,
            backgroundColor: 'white',
            borderRadius: 8,
            marginBottom: 10,
          }}
        />
        <Text testID="productName">{product.title}</Text>
        <Text testID="productPrice">${product.price}</Text>
      </View>
    </TouchableOpacity>
  );
}
