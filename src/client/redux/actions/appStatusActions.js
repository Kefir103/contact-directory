import * as Types from './actionTypes';

export function changeLoadingStatus(isLoading) {
    return {
        type: Types.APP_STATUS.CHANGE_LOADING_STATUS,
        payload: isLoading,
    };
}

export function catchError(error) {
    return {
        type: Types.APP_STATUS.CATCH_ERROR,
        payload: error,
    };
}
