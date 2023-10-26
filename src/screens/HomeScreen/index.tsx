import { TextInput, View, StyleSheet, FlatList, Image } from 'react-native';
import { CategoriesList } from '@src/components/CategoriesList';
import { ProductCard } from '@src/components/ProductCard';
import { useState } from 'react';

const MAIN_HERO_IMAGE_URI =
  'https://images.unsplash.com/photo-1605171399454-f2a0e51b811b?auto=format&fit=crop&q=80&w=1931&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';

export function HomeScreen() {
  const [category, setCategory] = useState<string | undefined>(undefined);

  return (
    <FlatList
      numColumns={2}
      columnWrapperStyle={{ justifyContent: 'space-between' }}
      contentContainerStyle={styles.container}
      ListHeaderComponent={() => (
        <View style={styles.listHeaderContainer}>
          <TextInput placeholder="Search" style={styles.input} cursorColor="gray" />
          <Image
            style={{ height: 130, borderRadius: 8 }}
            source={{
              uri: MAIN_HERO_IMAGE_URI,
            }}
          />
          <CategoriesList
            categories={['Celulares', 'Fones de Ouvido', 'Carregadores', 'Cabos', 'Capinhas']}
            selected={category}
            onSelect={setCategory}
          />
        </View>
      )}
      data={[
        {
          id: 1,
          title: 'Sample Product',
          image: 'sample-image.jpg',
          price: '19.99',
        },
        {
          id: 2,
          title: 'Sample Product',
          image: 'sample-image.jpg',
          price: '19.99',
        },
        {
          id: 3,
          title: 'Sample Product',
          image: 'sample-image.jpg',
          price: '19.99',
        },
        {
          id: 4,
          title: 'Sample Product',
          image: 'sample-image.jpg',
          price: '19.99',
        },
        {
          id: 5,
          title: 'Sample Product',
          image: 'sample-image.jpg',
          price: '19.99',
        },
      ]}
      renderItem={({ item }) => <ProductCard product={item} onPress={() => {}} />}
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
  input: {
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.05)',
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 10,
  },
});
