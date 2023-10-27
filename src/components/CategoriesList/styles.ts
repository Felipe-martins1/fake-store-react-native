import { StyleSheet } from 'react-native';
import { COLORS } from '@src/theme/colors';

export const styles = StyleSheet.create({
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
    backgroundColor: COLORS.primary,
  },

  itemText: {
    color: 'black',
  },
  selectedItemText: {
    color: COLORS.primaryForeground,
  },
});
