import React from 'react';
import { render } from '@testing-library/react-native';

import App from './App';

jest.useFakeTimers();
describe('<App />', () => {
  it('has 1 children', () => {
    const tree = render(<App />);

    expect(tree.root.children.length).toBe(1);
  });
});
