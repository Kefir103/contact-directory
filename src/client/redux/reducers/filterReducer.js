import * as Types from '../actions/actionTypes';
import { initialState } from '../initialState';

export function filterReducer(state = initialState, action) {
    switch (action.type) {
        case Types.FILTER.SET_SORTING_MAP: {
            const newMap = new Map(action.payload);
            return {
                ...state,
                sortingMap: newMap,
            };
        }
        case Types.FILTER.SET_CURRENT_PAGE: {
            const page = action.payload;
            sessionStorage.setItem('page', page);
            return {
                ...state,
                currentPage: page,
            };
        }
        case Types.FILTER.SET_FILTER_TEXT: {
            const filterText = action.payload;
            sessionStorage.setItem('filterText', filterText);
            return {
                ...state,
                filterText: filterText,
            };
        }
        default:
            return state;
    }
}
