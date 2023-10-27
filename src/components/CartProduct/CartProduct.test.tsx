import React from 'react';
import { render, userEvent } from '@testing-library/react-native';
import { CartProduct } from './index';

const mockedProduct = {
  id: 1,
  title: 'Product 1',
  image: 'sample-image.jpg',
  price: '19.99',
};

const mockedCartItem = {
  product: mockedProduct,
  quantity: 2,
};

describe('CartProduct', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  it('should render the product information', () => {
    const { getByText } = render(
      <CartProduct
        item={mockedCartItem}
        increaseQuantity={() => {}}
        decreaseQuantity={() => {}}
        removeProduct={() => {}}
      />,
    );

    expect(getByText(mockedProduct.title)).toBeTruthy();
    expect(
      getByText(
        Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
        }).format(Number(mockedProduct.price)),
      ),
    ).toBeTruthy();
    expect(getByText('2')).toBeTruthy();
  });

  it('should call increaseQuantity, decreaseQuantity, and removeProduct when buttons are pressed', async () => {
    const increaseQuantity = jest.fn();
    const decreaseQuantity = jest.fn();
    const removeProduct = jest.fn();

    const { getByTestId } = render(
      <CartProduct
        item={mockedCartItem}
        increaseQuantity={increaseQuantity}
        decreaseQuantity={decreaseQuantity}
        removeProduct={removeProduct}
      />,
    );

    const user = userEvent.setup();

    await user.press(getByTestId('increaseQuantityButton'));
    expect(increaseQuantity).toHaveBeenCalledWith(mockedCartItem);

    await user.press(getByTestId('decreaseQuantityButton'));
    expect(decreaseQuantity).toHaveBeenCalledWith(mockedCartItem);

    await user.press(getByTestId('removeButton'));
    expect(removeProduct).toHaveBeenCalledWith(mockedCartItem);
  });
});
