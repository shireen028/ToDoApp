import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import {DeleteTodoScreen} from './DeleteTodoScreen';

it('render correctly', () => {
  const todo = {
    id: 1,
    title: 'Awesome todo',
    completed: false,
    userId: 5,
  };
  renderer.create(
    <DeleteTodoScreen todo={todo} removeTodo={() => {}} componentId="compe" />,
  );
});
