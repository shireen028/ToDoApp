import * as actions from './actiontypes';
import {Todo, Action} from '../types';

export function setTodoList(todo: Todo[]): Action {
  return {
    type: actions.SET_TODO_LIST,
    payload: todo,
  };
}

export function addTodo(todo: Todo): Action {
  return {
    type: actions.ADD_TODO,
    payload: todo,
  };
}

export function removeTodo(id: number): Action {
  return {
    type: actions.REMOVE_TODO,
    payload: id,
  };
}

export function updateTodo(todo: Todo): Action {
  return {
    type: actions.UPDATE_TODO,
    payload: todo,
  };
}

export function changeFilter(filter: string): Action {
  return {
    type: actions.CHANGE_FILTER,
    payload: filter,
  };
}
