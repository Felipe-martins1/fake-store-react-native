import React from 'react';
import { render } from '@testing-library/react-native';
import { CartScreen } from './index';
import { CartProvider } from '@src/context/CartContext';
describe('CartScreen', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  it('should render an empty cart', () => {
    const { getByText } = render(
      <CartProvider>
        <CartScreen />
      </CartProvider>,
    );

    expect(getByText('Your cart is empty')).toBeTruthy();
  });
});
