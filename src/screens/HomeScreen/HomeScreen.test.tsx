import React from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { categoriesService } from '@src/services/categories.service';
import { productsService } from '@src/services/products.service';

import { HomeScreen } from './index';

import { render, userEvent } from '@testing-library/react-native';

const mockCategories = ['Category 1', 'Category 2', 'Category 3', 'Error Category'];

const mockProducts = [
  { id: 1, title: 'Product 1', category: 'Category 1', image: 'sample-image.jpg', price: '19.99' },
  { id: 2, title: 'Product 2', category: 'Category 2', image: 'sample-image.jpg', price: '19.99' },
];

const wrapper = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};

jest.mock(
  '@src/services/categories.service',
  (): {
    categoriesService: typeof categoriesService;
  } => ({
    categoriesService: {
      findAll: jest.fn(() => Promise.resolve(mockCategories)),
    },
  }),
);

jest.mock(
  '@src/services/products.service',
  (): {
    productsService: typeof productsService;
  } => ({
    productsService: {
      findAll: jest.fn(({ category }) => {
        if (category === 'Error Category') return Promise.reject(new Error('Error'));

        if (category) {
          const filteredProducts = mockProducts.filter((product) => product.category === category);
          return Promise.resolve(filteredProducts);
        }
        return Promise.resolve(mockProducts);
      }),
    },
  }),
);

describe('<HomeScreen/>', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  it('renders loading state', async () => {
    const { getByTestId } = render(<HomeScreen />, {
      wrapper,
    });

    expect(getByTestId('loadingText')).toBeTruthy();
  });

  it('renders products when data is available', async () => {
    const { findByText } = render(<HomeScreen />, {
      wrapper,
    });

    const product1 = await findByText('Product 1');

    const product2 = await findByText('Product 2');

    expect(product1).toBeTruthy();
    expect(product2).toBeTruthy();
  });

  it('handles category selection', async () => {
    const { queryByText, findByText, findByTestId } = render(<HomeScreen />, {
      wrapper,
    });

    const user = userEvent.setup();

    const categoryElement = await findByTestId('Category 1');

    await user.press(categoryElement);

    const product1 = await findByText('Product 1');

    expect(product1).toBeTruthy();
    expect(queryByText('Product 2')).not.toBeTruthy();
  });

  it('renders error state', async () => {
    const { findByText, findByTestId } = render(<HomeScreen />, {
      wrapper,
    });

    const user = userEvent.setup();

    const categoryElement = await findByTestId('Error Category');

    expect(categoryElement).toBeTruthy();

    await user.press(categoryElement);

    const errorElement = await findByTestId('errorText');

    expect(errorElement).toBeTruthy();
  });

  it('renders not found text', async () => {
    const { findByText, findByTestId } = render(<HomeScreen />, {
      wrapper,
    });

    const user = userEvent.setup();

    const categoryElement = await findByTestId('Category 3');

    expect(categoryElement).toBeTruthy();

    await user.press(categoryElement);

    const errorElement = await findByTestId('notFoundText');

    expect(errorElement).toBeTruthy();
  });
});
