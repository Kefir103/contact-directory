import * as Types from '../actions/actionTypes';
import { initialState } from '../initialState';
import { orderBy } from 'lodash';

export function dataReducer(state = initialState, action) {
    switch (action.type) {
        case Types.DATA.SET_DATA: {
            if (!action.payload.sort) {
                return {
                    ...state,
                    elements: action.payload.data,
                };
            }
            return {
                ...state,
                elements: orderBy(
                    action.payload.data,
                    Array.from(action.payload.sort.keys()),
                    Array.from(action.payload.sort.values())
                ),
            };
        }
        case Types.DATA.SET_SELECTED_ELEMENT: {
            return {
                ...state,
                currentElement: action.payload,
            };
        }
        case Types.DATA.FILTER_ELEMENTS: {
            if (!action.payload.filterText || !action.payload.filterFields) {
                return {
                    ...state,
                    filteredElements: undefined,
                };
            }
            let filteredElements;
            action.payload.filterFields.forEach(
                (field) =>
                    (filteredElements = action.payload.data.filter((element) =>
                        element[field]
                            .toString()
                            .toLowerCase()
                            .includes(action.payload.filterText.toLowerCase())
                    ))
            );
            return {
                ...state,
                filteredElements: filteredElements,
            };
        }
        default:
            return state;
    }
}
