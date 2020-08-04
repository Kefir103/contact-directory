import { filterReducer } from '../../../src/client/redux/reducers/filterReducer';
import {
    setSortingFields,
    setSortingDirections,
    addSortingField,
    setCurrentPage,
    setFilterText,
} from '../../../src/client/redux/actions/filterActions';
import { initialState } from '../../../src/client/redux/initialState';
import configureMockStore from 'redux-mock-store';

const mockStore = configureMockStore();

describe('filterReducer', () => {
    let store;
    beforeEach(() => {
        store = mockStore({ ...initialState });
    });
    test('setSortingDirections should return correct state', () => {
        const directions = ['asc', 'desc'];
        const expectedState = {
            ...store.getState().filter,
            sort: { ...store.getState().filter.sort, directions: directions },
        };
        expect(filterReducer(store.getState().filter, setSortingDirections(directions))).toEqual(
            expectedState
        );
    });
    test('setSortingFields should return correct state', () => {
        const fields = ['id', 'firstName'];
        const expectedState = {
            ...store.getState().filter,
            sort: { ...store.getState().filter.sort, fields: fields },
        };
        expect(filterReducer(store.getState().filter, setSortingFields(fields))).toEqual(
            expectedState
        );
    });
    test('addSortingField should return correct state from adding element which not in array', () => {
        const field = 'firstName';
        const expectedState = {
            ...store.getState().filter,
            sort: {
                ...store.getState().filter.sort,
                fields: [...store.getState().filter.sort.fields, field],
            },
        };
        expect(filterReducer(store.getState().filter, addSortingField(field))).toEqual(
            expectedState
        );
    });
    test('addSortingField should return correct state from adding element which already in array', () => {
        const field = 'firstName';
        const expectedState = {
            ...store.getState().filter,
            sort: {
                ...store.getState().filter.sort,
                fields: ['firstName'],
            },
        };
        expect(filterReducer(expectedState, addSortingField(field))).toEqual(expectedState);
    });
    test('setCurrentPage should return correct state', () => {
        const page = 5;
        const expectedState = {
            ...store.getState().filter,
            currentPage: page,
        };
        expect(filterReducer(store.getState().filter, setCurrentPage(page))).toEqual(expectedState);
        expect(Number(sessionStorage.getItem('page'))).toEqual(page);
    });
    test('setFilterText should return correct state', () => {
        const filterText = 'filterText';
        const expectedState = {
            ...store.getState().filter,
            filterText,
        };
        expect(filterReducer(store.getState().filter, setFilterText(filterText))).toEqual(
            expectedState
        );
        expect(sessionStorage.getItem('filterText')).toEqual(filterText);
    });
    test('should return state without changes with undefined action', () => {
        const expectedState = { ...store.getState().filter };
        expect(filterReducer(store.getState().filter, { type: undefined })).toEqual(expectedState);
    });
});
