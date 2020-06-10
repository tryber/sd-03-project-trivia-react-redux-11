import { combineReducers } from 'redux';
import tokenReducer from './tokenReducer';
import gameReducer from './gameReducer';
import userReducer from './userReducer';

const rootReducer = combineReducers({ tokenReducer, gameReducer, userReducer });

export default rootReducer;
