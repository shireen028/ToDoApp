import React from 'react';
import 'react-native';
import {ListTodoScreen} from './ListScreen';
import renderer from 'react-test-renderer';
import {Provider} from 'react-redux';
import {store} from '../store';

it('renders correctly', () => {
  const tree = renderer.create(
    <Provider store={store}>
      <ListTodoScreen componentId="comp2" />
    </Provider>,
  );
  expect(tree).toMatchSnapshot();
});