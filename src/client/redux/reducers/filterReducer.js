import * as Types from '../actions/actionTypes';
import { initialState } from '../initialState';

export function filterReducer(state = initialState, action) {
    switch (action.type) {
        case Types.FILTER.SET_SORTING_DIRECTIONS: {
            const sort = { ...state.sort };
            sort.directions = action.payload;
            return {
                ...state,
                sort: sort,
            };
        }
        case Types.FILTER.SET_SORTING_FIELDS: {
            const sort = { ...state.sort };
            sort.fields = action.payload;
            return {
                ...state,
                sort: sort,
            };
        }
        case Types.FILTER.ADD_SORTING_FIELD: {
            const sort = { ...state.sort };
            if (!sort.fields.find((field) => action.payload.field === field)) {
                sort.fields.push(action.payload.field);
                sort.directions.push(action.payload.direction);
            }
            return {
                ...state,
                sort: sort,
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
