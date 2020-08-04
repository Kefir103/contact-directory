import * as Types from './actionTypes';
import { catchError, changeLoadingStatus } from './appStatusActions';

export function setData(data, sortingFields, sortingDirections) {
    return {
        type: Types.DATA.SET_DATA,
        payload: {
            sort: {
                sortingFields,
                sortingDirections,
            },
            data: data,
        },
    };
}

export function filterElements(data, filterText, filterFields) {
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

export function loadData(url) {
    return (dispatch) => {
        dispatch(changeLoadingStatus(true));
        return fetch(url, {
            method: 'GET',
        })
            .then((response) => (response.ok ? response.json() : Promise.reject(response)))
            .then((result) => {
                dispatch(setData(result));
                dispatch(changeLoadingStatus(false));
                dispatch(catchError(undefined));
            })
            .catch((error) => {
                dispatch(changeLoadingStatus(false));
                dispatch(catchError(error));
            });
    };
}
