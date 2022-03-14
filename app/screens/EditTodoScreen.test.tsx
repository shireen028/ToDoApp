import 'react-native';
import React from 'react';
import {Provider} from 'react-redux';
import {EditTodoScreen} from './EditTodoScreen';
import {store} from '../store';
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const todo = {
    id: 1,
    title: 'awesome',
    userId: 2,
    completed: true,
  };
  const tree = renderer.create(
    <Provider store={store}>
      <EditTodoScreen todo={todo} componentId="compo23" updateTodo={() => {}} />
    </Provider>,
  );
  //expect(tree).toMatchSnapshot();
});
