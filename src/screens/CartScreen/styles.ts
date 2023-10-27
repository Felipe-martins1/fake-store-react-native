import { StyleSheet } from 'react-native';
import { COLORS } from '@src/theme/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'space-between',
  },
  buyButton: {
    backgroundColor: COLORS.primary,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buyButtonText: {
    color: COLORS.primaryForeground,
    fontWeight: 'bold',
    fontSize: 18,
  },
  totalText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  emptyCartText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
