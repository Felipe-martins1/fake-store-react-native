import React from 'react';
import { renderHook, act } from '@testing-library/react-native';
import { CartProvider, useCart, CartActionTypes } from './index';

describe('CartContext', () => {
  it('should add an item to the cart', () => {
    const { result } = renderHook(() => useCart(), {
      wrapper: CartProvider,
    });

    const { dispatch } = result.current;

    act(() => {
      dispatch({ type: CartActionTypes.ADD_TO_CART, payload: { id: 1, name: 'Product 1' } });
    });

    expect(result.current.cartState.items).toHaveLength(1);
  });

  it('should remove an item from the cart', () => {
    const { result } = renderHook(() => useCart(), {
      wrapper: CartProvider,
    });

    const { dispatch } = result.current;

    act(() => {
      dispatch({ type: CartActionTypes.ADD_TO_CART, payload: { id: 1, name: 'Product 1' } });
    });

    act(() => {
      dispatch({ type: CartActionTypes.REMOVE_FROM_CART, payload: { id: 1 } });
    });

    expect(result.current.cartState.items).toHaveLength(0);
  });
});
