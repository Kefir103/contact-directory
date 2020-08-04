import { dataReducer } from '../../../src/client/redux/reducers/dataReducer';
import {
    setData,
    setSelectedElement,
    filterElements,
} from '../../../src/client/redux/actions/dataActions';
import { initialState } from '../../../src/client/redux/initialState';
import { data } from '../../../__mocks__/data';
import configureMockStore from 'redux-mock-store';

const mockStore = configureMockStore();

describe('dataReducer', () => {
    let store;
    beforeEach(() => {
        store = mockStore({ ...initialState });
    });
    test('setData should return correct state without sorting', () => {
        const expectedState = { ...store.getState().data, elements: data };
        expect(dataReducer(store.getState().data, setData(data))).toEqual(expectedState);
    });
    test('setData should return correct state with sorting', () => {
        const sortingMap = new Map([
            ['firstName', 'asc'],
            ['id', 'desc'],
        ]);
        const expectedArray = [
            {
                id: 683,
                firstName: 'Chad',
                lastName: 'Robichaud',
                email: 'SDupuy@lacus.ly',
                phone: '(253)555-8927',
            },
            {
                id: 546,
                firstName: 'Puranjay',
                lastName: 'Briley',
                email: 'SCulin@pulvinar.gov',
                phone: '(176)281-2019',
            },
            {
                id: 115,
                firstName: 'Racquel',
                lastName: 'Herbert',
                email: 'EMarton@placerat.com',
                phone: '(884)101-9065',
            },
        ];
        const expectedState = { ...store.getState().data, elements: expectedArray };
        expect(dataReducer(store.getState().data, setData(data, sortingMap))).toEqual(
            expectedState
        );
    });
    test('setSelectedElement should return correct state', () => {
        const selectedElement = {
            id: 115,
            firstName: 'Racquel',
            lastName: 'Herbert',
            email: 'EMarton@placerat.com',
            phone: '(884)101-9065',
        };
        const expectedState = { ...store.getState().data, currentElement: selectedElement };
        expect(dataReducer(store.getState().data, setSelectedElement(selectedElement))).toEqual(
            expectedState
        );
    });
    test('filterElements should return correct state without filters', () => {
        const expectedState = { ...store.getState().data, filteredElements: undefined };
        expect(dataReducer(store.getState().data, filterElements(data))).toEqual(expectedState);
    });
    test('filterElements should return correct state with filters', () => {
        const expectedArray = [
            {
                id: 115,
                firstName: 'Racquel',
                lastName: 'Herbert',
                email: 'EMarton@placerat.com',
                phone: '(884)101-9065',
            },
            {
                id: 546,
                firstName: 'Puranjay',
                lastName: 'Briley',
                email: 'SCulin@pulvinar.gov',
                phone: '(176)281-2019',
            },
        ];
        const expectedState = { ...store.getState().data, filteredElements: expectedArray };
        expect(
            dataReducer(store.getState().data, filterElements(data, '1', ['id', 'phone']))
        ).toEqual(expectedState);
    });
    test('should return state without changes with undefined action', () => {
        const expectedState = { ...store.getState().data };
        expect(dataReducer(store.getState().data, { type: undefined })).toEqual(expectedState);
    });
});
