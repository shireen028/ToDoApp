import 'react-native';
import React from 'react';
import {DeleteTodoScreen} from './DeleteTodoScreen';

import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const todo = {
    id: 1,
    title: 'awesome',
    userId: 2,
    completed: true,
  };
  const tree = renderer.create(
    <DeleteTodoScreen componentId="sdfs" todo={todo} removeTodo={() => {}} />,
  );
  expect(tree).toMatchSnapshot();
});
