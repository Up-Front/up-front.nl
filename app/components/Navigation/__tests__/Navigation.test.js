import React from 'react'

const ReactShallowRenderer = require('react-test-renderer/shallow');
const renderer = new ReactShallowRenderer();

import { Navigation } from '../index';

it('renders correctly', () => {
  renderer.render(<Navigation />);

  const result = renderer.getRenderOutput();

  expect(result).toMatchSnapshot();
});
