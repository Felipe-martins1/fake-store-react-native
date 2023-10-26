import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { ProductCard } from './index';

describe('<ProductList />', () => {
  const product = {
    id: 1,
    title: 'Sample Product',
    image: 'sample-image.jpg',
    price: '19.99',
  };

  it('should render the product name and price', () => {
    const { getByTestId, getByText } = render(
      <ProductCard product={product} onPressAddToCart={() => {}} />,
    );

    expect(getByTestId('productCard')).toBeTruthy();
    expect(getByText(product.title)).toBeTruthy();
    expect(getByText(`$${product.price}`)).toBeTruthy();
  });

  it('should invoke the onPress function when "add to cart" button is pressed', () => {
    const onPressMock = jest.fn();
    const { getByTestId } = render(
      <ProductCard product={product} onPressAddToCart={onPressMock} />,
    );

    const productCard = getByTestId('addToCartButton');
    fireEvent.press(productCard);

    expect(onPressMock).toHaveBeenCalledWith(product);
  });
});
