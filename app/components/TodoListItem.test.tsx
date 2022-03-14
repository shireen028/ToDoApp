import React from 'react';
import 'react-native';
import {TodoListItem} from './TodoListItem';
import renderer from 'react-test-renderer';
import {Provider} from 'react-redux';
import {store} from '../store';

it('renders correctly', () => {
  const todo = {
    id: 1,
    title: 'awesome',
    userId: 2,
    completed: true,
  };
  renderer.create(
    <Provider store={store}>
      <TodoListItem
        todo={todo}
        componentId="component2"
        openDeleteTodo={() => {}}
        openEditTodo={() => {}}
      />
    </Provider>,
  );
});
