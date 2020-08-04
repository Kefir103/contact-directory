import * as Types from '../../../src/client/redux/actions/actionTypes';
import {
    setFilterText,
    setCurrentPage,
    addSortingField,
    setSortingDirections,
    setSortingFields,
} from '../../../src/client/redux/actions/filterActions';
import configureMockStore from 'redux-mock-store';
import { initialState } from '../../../src/client/redux/initialState';

const mockStore = configureMockStore();

describe('filterActions', () => {
    let store;
    beforeEach(() => {
        store = mockStore({ ...initialState });
    });
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
    test('addSortingField should works correctly', () => {
        const sortingField = 'firstName';
        const expectedAction = {
            type: Types.FILTER.ADD_SORTING_FIELD,
            payload: {
                field: sortingField,
                direction: 'asc',
            },
        };
        store.dispatch(addSortingField(sortingField));
        expect(store.getActions()[0]).toEqual(expectedAction);
    });
    test('setSortingDirections should works correctly', () => {
        const directions = ['asc', 'asc', 'asc'];
        const expectedAction = {
            type: Types.FILTER.SET_SORTING_DIRECTIONS,
            payload: directions,
        };
        store.dispatch(setSortingDirections(directions));
        expect(store.getActions()[0]).toEqual(expectedAction);
    });
    test('setSortingFields should works correctly', () => {
        const sortingFields = ['id', 'firstName'];
        const expectedAction = {
            type: Types.FILTER.SET_SORTING_FIELDS,
            payload: sortingFields,
        };
        store.dispatch(setSortingFields(sortingFields));
        expect(store.getActions()[0]).toEqual(expectedAction);
    });
});
