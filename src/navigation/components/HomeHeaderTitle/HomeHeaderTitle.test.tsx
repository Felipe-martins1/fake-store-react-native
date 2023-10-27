import React from 'react';
import { render } from '@testing-library/react-native';
import { HomeHeaderTitle } from './index';
import * as cartContextModule from '@src/context/CartContext';
import { NavigationContainer } from '@react-navigation/native';
jest.mock('@src/context/CartContext', () => ({
  useCart: jest.fn(() => ({
    cartState: {
      items: Array(10).fill({}),
    },
    dispatch: jest.fn(),
  })),
}));

const wrapper = ({ children }: any) => <NavigationContainer>{children}</NavigationContainer>;

describe('HomeHeaderTitle', () => {
  test('Should display the cart icon', () => {
    const { getByTestId } = render(<HomeHeaderTitle />, {
      wrapper,
    });
    const cartIcon = getByTestId('cartIcon');
    expect(cartIcon).toBeTruthy();
  });

  test('Should display the item count in the cart when there are items', () => {
    const { getByTestId } = render(<HomeHeaderTitle />, {
      wrapper,
    });

    const cartItemCount = getByTestId('cartItemCount');
    expect(cartItemCount.children[0]).toBe('10');
  });

  test('Should not display the item count in the cart when there are no items', () => {
    jest.mocked(cartContextModule).useCart.mockImplementation(
      jest.fn(() => ({
        cartState: {
          items: [],
        },
        dispatch: jest.fn(),
      })),
    );

    const { queryByTestId } = render(<HomeHeaderTitle />, {
      wrapper,
    });

    const cartItemCount = queryByTestId('cartItemCount');
    expect(cartItemCount).toBeNull();
  });
});
