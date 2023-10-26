import { View, StyleSheet, FlatList, Image, Text } from 'react-native';
import { CategoriesList } from '@src/components/CategoriesList';
import { ProductCard } from '@src/components/ProductCard';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import { productsService } from '@src/services/products.service';
import { categoriesService } from '@src/services/categories.service';

const MAIN_HERO_IMAGE_URI =
  'https://images.unsplash.com/photo-1605171399454-f2a0e51b811b?auto=format&fit=crop&q=80&w=1931&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';

export function HomeScreen() {
  const [category, setCategory] = useState<string | undefined>(undefined);

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

  function renderItem({ item }: any) {
    return (
      <ProductCard
        product={item}
        onPressAddToCart={() => {}}
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

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flexDirection: 'column',
    gap: 20,
  },
  listHeaderContainer: {
    flexDirection: 'column',
    gap: 20,
  },
});
