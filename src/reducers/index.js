import { combineReducers } from 'redux';
import tokenReducer from './tokenReducer';
import gameReducer from './gameReducer';
import userReducer from './userReducer';
import settingReducer from './settingReducer';

const rootReducer = combineReducers({ tokenReducer, gameReducer, userReducer, settingReducer });

export default rootReducer;
