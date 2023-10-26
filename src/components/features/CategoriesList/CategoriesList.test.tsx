import React from 'react';
import { render, userEvent } from '@testing-library/react-native';

import { CategoriesList } from './index';

describe('<CategoriesList />', () => {
  const mockedCategories = ['mockedCategory1', 'mockedCategory2'];
  const mockedOnSelect = jest.fn();

  describe('Rendering', () => {
    it('should render the component correctly', () => {
      const { getByTestId } = render(
        <CategoriesList categories={mockedCategories} onSelect={mockedOnSelect} />,
      );
      expect(getByTestId('CategoriesListContainer')).toBeTruthy();
    });

    it('should render the "all" category correctly as the first of the list', () => {
      const { getByText, getByTestId } = render(
        <CategoriesList categories={mockedCategories} onSelect={mockedOnSelect} />,
      );

      expect(getByTestId('CategoriesListFlatList').props?.data[0]).toEqual('All');
    });

    it('should render the provided categories correctly', () => {
      const { getByText } = render(
        <CategoriesList categories={mockedCategories} onSelect={mockedOnSelect} />,
      );

      expect(getByText('mockedCategory1')).toBeTruthy();
      expect(getByText('mockedCategory2')).toBeTruthy();
    });
  });

  describe('Category Selection', () => {
    it('should call the onSelect function when a category is selected', async () => {
      const { getByTestId } = render(
        <CategoriesList categories={mockedCategories} onSelect={mockedOnSelect} />,
      );
      jest.useFakeTimers();
      const user = userEvent.setup();
      await user.press(getByTestId('mockedCategory1'));
      expect(mockedOnSelect).toHaveBeenCalledWith('mockedCategory1');
    });

    it('should call the onSelect with undefined when the "All" category is selected', async () => {
      const { getByTestId } = render(
        <CategoriesList categories={mockedCategories} onSelect={mockedOnSelect} />,
      );
      jest.useFakeTimers();
      const user = userEvent.setup();
      await user.press(getByTestId('All'));
      expect(mockedOnSelect).toHaveBeenCalledWith(undefined);
    });

    it('should render the selected category with a different style', () => {
      const { getByTestId } = render(
        <CategoriesList
          categories={mockedCategories}
          selected="mockedCategory1"
          onSelect={mockedOnSelect}
        />,
      );

      const otherCategory = getByTestId('mockedCategory2');
      const selectedCategory = getByTestId('mockedCategory1');

      expect(otherCategory.props?.style).toHaveProperty('backgroundColor', 'white');
      expect(selectedCategory.props?.style).toHaveProperty('backgroundColor', 'green');
    });

    it('if no category is selected, should render the "All" category with a different style', () => {
      const { getByTestId, root } = render(
        <CategoriesList categories={mockedCategories} onSelect={mockedOnSelect} />,
      );

      const otherCategory = getByTestId('mockedCategory1');
      const selectedCategory = getByTestId('All');

      expect(otherCategory.props?.style).toHaveProperty('backgroundColor', 'white');
      expect(selectedCategory.props?.style).toHaveProperty('backgroundColor', 'green');
    });
  });
});
