import { FlatList, Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { mergeStyles } from '@src/utils/styles';

type Props = {
  categories: string[];
  selected?: string;
  onSelect: (category: string | undefined) => void;
};

const ALL_CATEGORY = 'All';
export function CategoriesList({ categories, selected = ALL_CATEGORY, onSelect }: Props) {
  function handleSelect(category: string) {
    onSelect(category === ALL_CATEGORY ? undefined : category);
  }

  return (
    <View testID="CategoriesListContainer">
      <View style={styles.listHeader}>
        <Text style={styles.listHeaderTitle}>Categories</Text>
      </View>
      <FlatList
        testID="CategoriesListFlatList"
        data={['All', ...categories]}
        scrollEnabled={true}
        contentContainerStyle={styles.contentContainer}
        ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
        renderItem={({ item }) => {
          const isSelected = selected === item;
          return (
            <TouchableOpacity
              testID={item}
              onPress={() => handleSelect(item)}
              style={mergeStyles(styles.item, isSelected && styles.selectedItem)}>
              <Text style={mergeStyles(styles.itemText, isSelected && styles.selectedItemText)}>
                {item}
              </Text>
            </TouchableOpacity>
          );
        }}
        horizontal={true}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  listHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  listHeaderTitle: {
    color: 'black',
    fontWeight: '500',
  },
  contentContainer: {
    paddingBottom: 10,
  },
  itemSeparator: {
    width: 10,
  },
  item: {
    padding: 6,
    borderRadius: 8,
    backgroundColor: 'white',
  },
  selectedItem: {
    backgroundColor: 'green',
  },

  itemText: {
    color: 'black',
  },
  selectedItemText: {
    color: 'white',
  },
});
