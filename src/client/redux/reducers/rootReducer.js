import { combineReducers } from 'redux';
import { appStatusReducer } from './appStatusReducer';
import { dataReducer } from './dataReducer';
import { filterReducer } from './filterReducer';

export const rootReducer = combineReducers({
    appStatus: appStatusReducer,
    data: dataReducer,
    filter: filterReducer,
});
