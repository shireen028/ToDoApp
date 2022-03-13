import {createStore} from 'redux';
import reducers from './reducers';

const initialState = {};
export const store = createStore(reducers, initialState);
