import { StyleSheet } from 'react-native';
import { COLORS } from '@src/theme/colors';

export const styles = StyleSheet.create({
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
    color: COLORS.primaryForeground,
    fontWeight: '600',
    marginTop: 4,
    backgroundColor: COLORS.primary,
    padding: 4,
    borderRadius: 4,
    alignSelf: 'flex-start',
  },
  addToCartButton: {
    backgroundColor: COLORS.secondary,
    padding: 8,
    borderRadius: 8,
    marginTop: 10,
  },
  addToCartButtonText: {
    color: COLORS.secondaryForeground,
    alignSelf: 'center',
    fontWeight: 'bold',
  },
});
