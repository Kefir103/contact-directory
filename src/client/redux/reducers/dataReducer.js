import * as Types from '../actions/actionTypes';
import { initialState } from '../initialState';

export function dataReducer(state = initialState, action) {
    switch (action.type) {
        case Types.DATA.SET_FULL_DATA: {
            return {
                ...state,
                fullData: action.payload,
            };
        }
        case Types.DATA.SET_APP_ELEMENTS: {
            return {
                ...state,
                appElements: action.payload,
            };
        }
        case Types.DATA.SET_SELECTED_ELEMENT: {
            return {
                ...state,
                currentElement: {
                    elementInfo: action.payload.elementInfo,
                    elementIndex: action.payload.elementIndex,
                },
            };
        }
        case Types.DATA.SET_PAGE_ELEMENTS: {
            return {
                ...state,
                pageElements: action.payload,
            };
        }
        case Types.DATA.SET_PAGE_COUNT: {
            return {
                ...state,
                pageCount: action.payload,
            };
        }
        case Types.DATA.CHANGE_ELEMENT_DESCRIPTION: {
            const fullDataElementIndex = state.fullData.findIndex(
                (element) => action.payload.elementId === element.id
            );
            const appDataElementsIndex = state.appElements.findIndex(
                (element) => action.payload.elementId === element.id
            );

            const changedElement = { ...state.currentElement.elementInfo };
            changedElement.description = action.payload.description;
            state.pageElements[action.payload.elementIndex].description =
                action.payload.description;
            state.fullData[fullDataElementIndex].description = action.payload.description;
            state.appElements[appDataElementsIndex].description = action.payload.description;
            return {
                ...state,
                currentElement: {
                    ...state.currentElement,
                    elementInfo: changedElement,
                },
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
        case Types.DATA.RESET_VALID_INPUTS: {
            return {
                ...state,
                inputContainer: {
                    ...state.inputContainer,
                    validInputs: {
                        id: false,
                        firstName: false,
                        lastName: false,
                        email: false,
                        phone: false,
                    },
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
