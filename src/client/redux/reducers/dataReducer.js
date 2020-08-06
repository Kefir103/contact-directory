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
            if (!action.payload) {
                return {
                    ...state,
                    filteredElements: undefined,
                };
            }
            let filteredElements = [...action.payload.data];
            action.payload.filterFields.forEach(
                (field) =>
                    (filteredElements = filteredElements.filter((element) =>
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
        case Types.DATA.CHANGE_INPUT_ELEMENT_FIELD: {
            const changedInputElement = { ...state.inputContainer.inputElement };
            changedInputElement[action.payload.field] = action.payload.value;
            return {
                ...state,
                inputContainer: {
                    ...state.inputContainer,
                    inputElement: changedInputElement,
                },
            };
        }
        case Types.DATA.CHANGE_VALIDATE_INPUTS: {
            const changedValidInputs = { ...state.inputContainer.validInputs };
            changedValidInputs[action.payload.field] = action.payload.isValid;
            return {
                ...state,
                inputContainer: {
                    ...state.inputContainer,
                    validInputs: changedValidInputs,
                },
            };
        }
        case Types.DATA.CHANGE_IS_INPUT_FORM_OPEN: {
            return {
                ...state,
                inputContainer: {
                    ...state.inputContainer,
                    isFormOpen: action.payload,
                },
            };
        }
        case Types.DATA.CHANGE_IS_ADD_BUTTON_DISABLED: {
            return {
                ...state,
                inputContainer: {
                    ...state.inputContainer,
                    isAddButtonDisabled: action.payload,
                },
            };
        }
        case Types.DATA.REMOVE_INPUT_DATA: {
            const initialInputElement = {
                id: 0,
                firstName: '',
                lastName: '',
                email: '',
                phone: '',
            };
            return {
                ...state,
                inputContainer: {
                    ...state.inputContainer,
                    inputElement: initialInputElement,
                },
            };
        }
        case Types.DATA.CHANGE_INPUT_ADDING_STATUS: {
            const addingStatus = {
                addingStatusText: action.payload.statusText,
                isError: action.payload.isError,
            };
            return {
                ...state,
                inputContainer: {
                    ...state.inputContainer,
                    addingStatus,
                },
            };
        }
        default:
            return state;
    }
}
