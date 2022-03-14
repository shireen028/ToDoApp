import 'react-native';
import React from 'react';
import {AddTodoScreen} from './AddTodoScreen';

import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const tree = renderer.create(<AddTodoScreen componentId="sdfs" addTodo={() => {}} />);
  expect(tree).toMatchSnapshot();
});
