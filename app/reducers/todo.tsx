import {fromJS} from 'immutable';
import * as actionType from 'actions/actiontypes';
import {Todo, FILTERS} from '../types';

const INIT_STATE = {
  id: 1,
  list: [],
  filter: FILTERS.ALL,
};

export default function (state = fromJS(INIT_STATE), action: any) {
  switch (action.type) {
    case actionType.SET_TODO_LIST:
      return state.merge({list: action.payload});
    case actionType.REMOVE_TODO:
      return state.updateIn(['list'], (list: Todo[]) =>
        list.filter(item => item.id !== action.payload),
      );
    case actionType.ADD_TODO:
      return state.updateIn(['list'], (list: Todo[]) =>
        list.concat(action.payload),
      );
    case actionType.UPDATE_TODO:

      
       return state.updateIn(['list'], (list: Todo[]) =>
        list.map(item => {
          if (item.id == action.payload.id) {
            return action.payload;
          }
          return item;
        }),
      ); 
    case actionType.CHANGE_FILTER:
      return state.merge({filter: action.payload});
    default:
      return state;
  }
}
