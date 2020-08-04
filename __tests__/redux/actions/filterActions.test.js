import * as Types from '../../../src/client/redux/actions/actionTypes';
import {
    setFilterText,
    setCurrentPage, setSortingMap,
} from '../../../src/client/redux/actions/filterActions';
import configureMockStore from 'redux-mock-store';
import { initialState } from '../../../src/client/redux/initialState';

const mockStore = configureMockStore();

describe('filterActions', () => {
    let store;
    beforeEach(() => {
        store = mockStore({ ...initialState });
    });
    test('setSortingMap should works correctly', () => {
        const entries = [['firstName', 'asc'], ['id', 'desc']];
        const expectedAction = {
            type: Types.FILTER.SET_SORTING_MAP,
            payload: entries
        }
        store.dispatch(setSortingMap(entries));
        expect(store.getActions()[0]).toEqual(expectedAction);
    })
    test('setFilterText should works correctly', () => {
        const filterText = 'filterText';
        const expectedAction = {
            type: Types.FILTER.SET_FILTER_TEXT,
            payload: filterText,
        };
        store.dispatch(setFilterText(filterText));
        expect(store.getActions()[0]).toEqual(expectedAction);
    });
    test('setCurrentPage should works correctly', () => {
        const page = 5;
        const expectedAction = {
            type: Types.FILTER.SET_CURRENT_PAGE,
            payload: page,
        };
        store.dispatch(setCurrentPage(page));
        expect(store.getActions()[0]).toEqual(expectedAction);
    });
});
