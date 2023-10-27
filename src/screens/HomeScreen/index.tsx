import { Alert, FlatList, Image, Text, View } from 'react-native';
import { CategoriesList } from '@src/components/CategoriesList';
import { ProductCard } from '@src/components/ProductCard';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import { Product, productsService } from '@src/services/products.service';
import { categoriesService } from '@src/services/categories.service';
import { CartActionTypes, useCart } from '@src/context/CartContext';
import { MAIN_HERO_IMAGE_URI } from '@src/constants';

import { styles } from './styles';

export function HomeScreen() {
  const [category, setCategory] = useState<string | undefined>(undefined);
  const { dispatch } = useCart();

  const { data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: () => categoriesService.findAll(),
    initialData: [],
  });

  const { data, isFetching, isError } = useQuery({
    queryKey: ['products', { category }],
    queryFn: () => productsService.findAll({ category }),
    initialData: [],
  });

  function handleAddToCart(product: Product) {
    dispatch({ type: CartActionTypes.ADD_TO_CART, payload: product });
    Alert.alert('Success', 'Product added to cart');
  }

  function renderItem({ item }: any) {
    return (
      <ProductCard
        product={item}
        onPressAddToCart={handleAddToCart}
        style={{
          width: '48%',
        }}
      />
    );
  }

  function renderListHeaderComponent() {
    return (
      <View style={styles.listHeaderContainer}>
        <Image
          style={{ height: 130, borderRadius: 8 }}
          source={{
            uri: MAIN_HERO_IMAGE_URI,
          }}
        />
        <CategoriesList categories={categories} selected={category} onSelect={setCategory} />
      </View>
    );
  }

  function renderListEmptyComponent() {
    if (isFetching) return <Text testID="loadingText">Loading...</Text>;

    if (isError) return <Text testID="errorText">Oops...An unexpected error occurred</Text>;

    return <Text testID="notFoundText">No products found</Text>;
  }

  return (
    <FlatList
      numColumns={2}
      columnWrapperStyle={{ justifyContent: 'space-between' }}
      contentContainerStyle={styles.container}
      ListHeaderComponent={renderListHeaderComponent}
      ListEmptyComponent={renderListEmptyComponent}
      data={!isError ? data : []}
      renderItem={renderItem}
    />
  );
}
