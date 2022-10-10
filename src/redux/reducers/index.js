import { combineReducers } from 'redux';
import user from './user';
import perguntasReducer from './perguntasReducer';

const rootReducer = combineReducers({ user, perguntasReducer });

export default rootReducer;
