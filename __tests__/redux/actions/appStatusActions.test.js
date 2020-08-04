import * as Types from '../../../src/client/redux/actions/actionTypes';
import {
    changeLoadingStatus,
    catchError,
} from '../../../src/client/redux/actions/appStatusActions';
import { initialState } from '../../../src/client/redux/initialState';
import configureMockStore from 'redux-mock-store';

const mockStore = configureMockStore();

describe('appStatusActions', () => {
    let store;
    beforeEach(() => {
        store = mockStore({ ...initialState });
    });
    test('isLoading should change correctly', () => {
        const isLoading = false;
        const expectedAction = {
            type: Types.APP_STATUS.CHANGE_LOADING_STATUS,
            payload: false,
        };
        store.dispatch(changeLoadingStatus(isLoading));
        expect(store.getActions()[0]).toEqual(expectedAction);
    });
    test('catchError should catch error correctly', () => {
        const catchedError = 'error';
        const expectedAction = {
            type: Types.APP_STATUS.CATCH_ERROR,
            payload: catchedError,
        };
        store.dispatch(catchError(catchedError));
        expect(store.getActions()[0]).toEqual(expectedAction);
    });
});
