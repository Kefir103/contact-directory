import * as Types from '../../../src/client/redux/actions/actionTypes';
import {
    setData,
    filterElements,
    loadData,
    setSelectedElement,
} from '../../../src/client/redux/actions/dataActions';
import { data } from '../../../__mocks__/data';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { initialState } from '../../../src/client/redux/initialState';
import fetchMock from 'fetch-mock-jest';

const mockStore = configureMockStore([thunk]);

describe('dataActions', () => {
    let store;
    beforeEach(() => {
        store = mockStore({ ...initialState });
    });
    afterEach(() => {
        fetchMock.restore();
    });
    test('setData should set data correctly without sorting', () => {
        const expectedAction = {
            type: Types.DATA.SET_DATA,
            payload: {
                sort: {
                    sortingFields: undefined,
                    sortingDirections: undefined,
                },
                data: data,
            },
        };
        store.dispatch(setData(data));
        expect(store.getActions()[0]).toEqual(expectedAction);
    });
    test('setData should set data correctly with sorting', () => {
        const expectedAction = {
            type: Types.DATA.SET_DATA,
            payload: {
                sort: {
                    sortingFields: ['firstName', 'id'],
                    sortingDirections: ['asc', 'desc'],
                },
                data: data,
            },
        };
        store.dispatch(setData(data, ['firstName', 'id'], ['asc', 'desc']));
        expect(store.getActions()[0]).toEqual(expectedAction);
    });
    test('filterElements should filter elements correctly', () => {
        const expectedAction = {
            type: Types.DATA.FILTER_ELEMENTS,
            payload: {
                data: data,
                filterFields: ['firstName'],
                filterText: 'Jane',
            },
        };
        store.dispatch(filterElements(data, 'Jane', ['firstName']));
        expect(store.getActions()[0]).toEqual(expectedAction);
    });
    test('filterElements should filter elements correctly without fields', () => {
        const expectedAction = {
            type: Types.DATA.FILTER_ELEMENTS,
            payload: {
                data: data,
                filterFields: undefined,
                filterText: undefined,
            },
        };
        store.dispatch(filterElements(data));
        expect(store.getActions()[0]).toEqual(expectedAction);
    });
    test('setSelectedElement should return selected element', () => {
        const element = {
            id: 115,
            firstName: 'Racquel',
            lastName: 'Herbert',
            email: 'EMarton@placerat.com',
            phone: '(884)101-9065',
        };
        const expectedAction = {
            type: Types.DATA.SET_SELECTED_ELEMENT,
            payload: element,
        };
        store.dispatch(setSelectedElement(element));
        expect(store.getActions()[0]).toEqual(expectedAction);
    });
    test('loadData should load data correctly without error', () => {
        const url =
            'http://www.filltext.com/?rows=32&id=%7Bnumber%7C1000%7D&firstName=%7BfirstName%7D&lastName=%7BlastName%7D&email=%7Bemail%7D&phone=%7Bphone%7C(xxx)xxx-xx-xx%7D&address=%7BaddressObject%7D&description=%7Blorem%7C32%7D';
        fetchMock.get(url, {
            body: data,
        });
        const expectedActions = [
            { type: Types.APP_STATUS.CHANGE_LOADING_STATUS, payload: true },
            {
                type: Types.DATA.SET_DATA,
                payload: {
                    sort: {
                        sortingFields: undefined,
                        sortingDirections: undefined,
                    },
                    data: data,
                },
            },
            { type: Types.APP_STATUS.CHANGE_LOADING_STATUS, payload: false },
            { type: Types.APP_STATUS.CATCH_ERROR, payload: undefined },
        ];
        return store.dispatch(loadData(url)).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        });
    });
    test('loadData should throw error correctly', () => {
        const url =
            'http://www.filltext.com/?rows=32&id=%7Bnumber%7C1000%7D&firstName=%7BfirstName%7D&lastName=%7BlastName%7D&email=%7Bemail%7D&phone=%7Bphone%7C(xxx)xxx-xx-xx%7D&address=%7BaddressObject%7D&description=%7Blorem%7C32%7D';
        fetchMock.get(url, {
            throws: 'error',
        });
        const expectedActions = [
            { type: Types.APP_STATUS.CHANGE_LOADING_STATUS, payload: true },
            { type: Types.APP_STATUS.CHANGE_LOADING_STATUS, payload: false },
            { type: Types.APP_STATUS.CATCH_ERROR, payload: 'error' },
        ];
        return store.dispatch(loadData(url)).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        });
    });
});
