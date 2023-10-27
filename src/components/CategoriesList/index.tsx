import { FlatList, Text, View, TouchableOpacity } from 'react-native';
import { mergeStyles } from '@src/utils/styles';
import { styles } from './styles';

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
