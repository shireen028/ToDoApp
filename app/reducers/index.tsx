import {combineReducers} from 'redux';
import todo from './todo';

const rootReducer = combineReducers({todo: todo});

export default rootReducer;
