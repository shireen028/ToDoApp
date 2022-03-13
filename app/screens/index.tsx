import React from 'react';
import {AddTodoScreen} from './AddTodoScreen';
import {DeleteTodoScreen} from './DeleteTodoScreen';
import {EditTodoScreen} from './EditTodoScreen';
import {ListTodoScreen} from './ListScreen';
import {Navigation} from 'react-native-navigation';
import {gestureHandlerRootHOC} from 'react-native-gesture-handler';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider} from 'react-redux';
import {store} from '../store';

function registerScreen({name, Comp}: {name: string; Comp: any}): void {
  const Component = gestureHandlerRootHOC(Comp);
  Navigation.registerComponent(
    name,
    () => props =>
      (
        <Provider store={store}>
          <SafeAreaProvider>
            <Component {...props} />
          </SafeAreaProvider>
        </Provider>
      ),
    () => Component,
  );
}
export function registerScreens() {
  registerScreen({name: 'ListTodo', Comp: ListTodoScreen});
  Navigation.registerComponent(
    'AddTodo',
    () => gestureHandlerRootHOC(AddTodoScreen),
    () => AddTodoScreen,
  );
  Navigation.registerComponent(
    'DeleteTodo',
    () => gestureHandlerRootHOC(DeleteTodoScreen),
    () => DeleteTodoScreen,
  );
  Navigation.registerComponent(
    'EditTodo',
    () => gestureHandlerRootHOC(EditTodoScreen),
    () => EditTodoScreen,
  );
}
