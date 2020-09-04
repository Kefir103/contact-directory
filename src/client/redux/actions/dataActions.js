import * as Types from './actionTypes';
import { catchError, changeLoadingStatus } from './appStatusActions';
import {getAppElements, getPagesCount} from '../../functions/dataFunctions';

export function setFullData(data) {
    return {
        type: Types.DATA.SET_FULL_DATA,
        payload: data,
    };
}

export function setAppElements(data) {
    return {
        type: Types.DATA.SET_APP_ELEMENTS,
        payload: data,
    };
}

export function setSelectedElement(elementInfo, elementIndex) {
    return {
        type: Types.DATA.SET_SELECTED_ELEMENT,
        payload: {
            elementInfo,
            elementIndex,
        },
    };
}

export function setPageElements(elements) {
    return {
        type: Types.DATA.SET_PAGE_ELEMENTS,
        payload: elements,
    };
}

export function setPageCount(pageCount) {
    return {
        type: Types.DATA.SET_PAGE_COUNT,
        payload: pageCount,
    };
}

export function changeElementDescription(description, elementIndex, elementId) {
    return {
        type: Types.DATA.CHANGE_ELEMENT_DESCRIPTION,
        payload: {
            description,
            elementIndex,
            elementId,
        },
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
                const pageCount = getPagesCount(result);
                const newAppElements = getAppElements(result, sortingMap);
                dispatch(setFullData(result));
                dispatch(setPageCount(pageCount));
                dispatch(setAppElements(newAppElements));
                dispatch(changeLoadingStatus(false));
            })
            .catch((error) => {
                dispatch(catchError(error));
            });
    };
}
