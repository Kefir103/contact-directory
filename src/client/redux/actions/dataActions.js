import * as Types from './actionTypes';
import { catchError, changeLoadingStatus } from './appStatusActions';

export function setData(data, sortingMap) {
    return {
        type: Types.DATA.SET_DATA,
        payload: {
            sort: sortingMap,
            data: data,
        },
    };
}

export function filterElements(data, filterText, filterFields) {
    if (!data || !filterText || !filterFields) {
        return {
            type: Types.DATA.FILTER_ELEMENTS,
        };
    }
    return {
        type: Types.DATA.FILTER_ELEMENTS,
        payload: {
            data,
            filterText,
            filterFields,
        },
    };
}

export function setSelectedElement(element) {
    return {
        type: Types.DATA.SET_SELECTED_ELEMENT,
        payload: element,
    };
}

export function changeInputElementField(field, value) {
    return {
        type: Types.DATA.CHANGE_INPUT_ELEMENT_FIELD,
        payload: {
            field,
            value,
        },
    };
}

export function changeValidateInputs(field, isValid) {
    return {
        type: Types.DATA.CHANGE_VALIDATE_INPUTS,
        payload: {
            field,
            isValid,
        },
    };
}

export function changeIsInputFormOpen(isOpen) {
    return {
        type: Types.DATA.CHANGE_IS_INPUT_FORM_OPEN,
        payload: isOpen,
    };
}

export function changeIsAddButtonDisabled(isDisabled) {
    return {
        type: Types.DATA.CHANGE_IS_ADD_BUTTON_DISABLED,
        payload: isDisabled,
    };
}

export function removeInputData() {
    return {
        type: Types.DATA.REMOVE_INPUT_DATA,
    };
}

export function resetValidInputs() {
    return {
        type: Types.DATA.RESET_VALID_INPUTS,
    };
}

export function changeInputAddingStatus(statusText, isError) {
    return {
        type: Types.DATA.CHANGE_INPUT_ADDING_STATUS,
        payload: {
            statusText,
            isError,
        },
    };
}

export function loadData(url, sortingMap) {
    return (dispatch) => {
        dispatch(changeLoadingStatus(true));
        return fetch(url, {
            method: 'GET',
        })
            .then((response) => (response.ok ? response.json() : Promise.reject(response)))
            .then((result) => {
                dispatch(setData(result, sortingMap));
                dispatch(changeLoadingStatus(false));
                dispatch(catchError(undefined));
            })
            .catch((error) => {
                dispatch(changeLoadingStatus(false));
                dispatch(catchError(error));
            });
    };
}
