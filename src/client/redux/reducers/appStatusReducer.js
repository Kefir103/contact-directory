import * as Types from '../actions/actionTypes';
import { initialState } from '../initialState';

export function appStatusReducer(state = initialState, action) {
    switch (action.type) {
        case Types.APP_STATUS.CHANGE_LOADING_STATUS: {
            return {
                ...state,
                isLoading: action.payload,
            };
        }
        case Types.APP_STATUS.CATCH_ERROR: {
            console.error(action.payload);
            return {
                ...state,
                error: action.payload,
            };
        }
        default:
            return state;
    }
}
