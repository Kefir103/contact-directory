import { appStatusReducer } from '../../../src/client/redux/reducers/appStatusReducer';
import {
    changeLoadingStatus,
    catchError,
} from '../../../src/client/redux/actions/appStatusActions';
import { initialState } from '../../../src/client/redux/initialState';
import configureMockStore from 'redux-mock-store';

const mockStore = configureMockStore();

describe('appStatusReducer', () => {
    let store;
    beforeEach(() => {
        store = mockStore({ ...initialState });
    });
    test('should return correct state on changing loading status', () => {
        const isLoading = false;
        const expectedState = { ...store.getState().appStatus, isLoading };
        expect(
            appStatusReducer(store.getState().appStatus, changeLoadingStatus(isLoading))
        ).toEqual(expectedState);
    });
    test('should return correct state on catching error', () => {
        const error = 'error';
        const expectedState = { ...store.getState().appStatus, error };
        expect(appStatusReducer(store.getState().appStatus, catchError(error))).toEqual(
            expectedState
        );
    });
    test('should return state without changes with undefined action', () => {
        const expectedState = { ...store.getState().appStatus };
        expect(appStatusReducer(store.getState().appStatus, { type: undefined })).toEqual(
            expectedState
        );
    });
});
