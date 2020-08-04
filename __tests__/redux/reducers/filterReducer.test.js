import { filterReducer } from '../../../src/client/redux/reducers/filterReducer';
import {setCurrentPage, setFilterText, setSortingMap} from '../../../src/client/redux/actions/filterActions';
import { initialState } from '../../../src/client/redux/initialState';
import configureMockStore from 'redux-mock-store';

const mockStore = configureMockStore();

describe('filterReducer', () => {
    let store;
    beforeEach(() => {
        store = mockStore({ ...initialState });
    });
    test('setSortingMap should return correct state', () => {
        const entries = [['firstName', 'asc'], ['id', 'desc']];
        const sortingMap = new Map(entries);
        const expectedState = {
            ...store.getState().filter,
            mapSort: sortingMap
        };
        expect(filterReducer(store.getState().filter, setSortingMap(entries))).toEqual(expectedState);
    })
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
