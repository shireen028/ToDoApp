import React from 'react';
import 'react-native';
import {Input} from './Input';
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const tree = renderer.create(<Input placeholder="Message" />).toJSON();
  expect(tree).toMatchSnapshot();
});
