import { combineReducers } from 'redux';
import tokenReducer from './tokenReducer';
import gameReducer from './gameReducer';

const rootReducer = combineReducers({ tokenReducer, gameReducer });

export default rootReducer;
