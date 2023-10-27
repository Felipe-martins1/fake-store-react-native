import React from 'react';
import { renderHook, act } from '@testing-library/react-native';
import { CartProvider, useCart, CartActionTypes } from './index';

const mockedProduct = {
  id: 1,
  title: 'Product 1',
  image: 'sample-image.jpg',
  price: '19.99',
};

describe('CartContext', () => {
  it('should add an item to the cart', () => {
    const { result } = renderHook(() => useCart(), {
      wrapper: CartProvider,
    });

    const { dispatch } = result.current;

    act(() => {
      dispatch({
        type: CartActionTypes.ADD_TO_CART,
        payload: mockedProduct,
      });
    });

    expect(result.current.cartState.items).toHaveLength(1);
  });

  it('should remove an item from the cart', () => {
    const { result } = renderHook(() => useCart(), {
      wrapper: CartProvider,
    });

    const { dispatch } = result.current;

    act(() => {
      dispatch({
        type: CartActionTypes.ADD_TO_CART,
        payload: mockedProduct,
      });
    });

    act(() => {
      dispatch({
        type: CartActionTypes.REMOVE_FROM_CART,
        payload: mockedProduct,
      });
    });

    expect(result.current.cartState.items).toHaveLength(0);
  });

  it('should increase the quantity of an item in the cart', () => {
    const { result } = renderHook(() => useCart(), {
      wrapper: CartProvider,
    });

    const { dispatch } = result.current;

    act(() => {
      dispatch({
        type: CartActionTypes.ADD_TO_CART,
        payload: mockedProduct,
      });
    });

    act(() => {
      dispatch({
        type: CartActionTypes.ADD_TO_CART,
        payload: mockedProduct,
      });
    });

    expect(result.current.cartState.items[0].quantity).toBe(2);
  });

  it('should decrease the quantity of an item in the cart', () => {
    const { result } = renderHook(() => useCart(), {
      wrapper: CartProvider,
    });

    const { dispatch } = result.current;

    act(() => {
      dispatch({
        type: CartActionTypes.ADD_TO_CART,
        payload: mockedProduct,
      });
    });

    act(() => {
      dispatch({
        type: CartActionTypes.ADD_TO_CART,
        payload: mockedProduct,
      });
    });

    act(() => {
      dispatch({
        type: CartActionTypes.REMOVE_FROM_CART,
        payload: mockedProduct,
      });
    });

    expect(result.current.cartState.items[0].quantity).toBe(1);
  });
});
