import * as Types from '../../../src/client/redux/actions/actionTypes';
import {
    setFullData,
    loadData,
    setSelectedElement,
    changeInputElementField,
    changeValidateInputs,
    changeIsInputFormOpen,
    changeIsAddButtonDisabled,
    removeInputData,
    changeInputAddingStatus,
    resetValidInputs,
    changeElementDescription,
    setCurrentElements,
    setAppElements,
    setPageCount,
} from '../../../src/client/redux/actions/dataActions';
import { data } from '../../../__mocks__/data';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { initialState } from '../../../src/client/redux/initialState';
import fetchMock from 'fetch-mock-jest';
import { getAppElements } from '../../../src/client/functions/dataFunctions';

const mockStore = configureMockStore([thunk]);

describe('dataActions', () => {
    let store;
    beforeEach(() => {
        store = mockStore({ ...initialState });
    });
    afterEach(() => {
        fetchMock.restore();
    });
    test('setFullData should set loaded data correctly', () => {
        const expectedAction = {
            type: Types.DATA.SET_FULL_DATA,
            payload: data,
        };
        store.dispatch(setFullData(data));
        expect(store.getActions()[0]).toEqual(expectedAction);
    });
    test('setAppElements should set app elements correctly', () => {
        const expectedAction = {
            type: Types.DATA.SET_APP_ELEMENTS,
            payload: data,
        };
        store.dispatch(setAppElements(data));
        expect(store.getActions()[0]).toEqual(expectedAction);
    });
    test('setSelectedElement should return selected element', () => {
        const elementInfo = {
            id: 115,
            firstName: 'Racquel',
            lastName: 'Herbert',
            email: 'EMarton@placerat.com',
            phone: '(884)101-9065',
        };
        const elementIndex = 5;
        const expectedAction = {
            type: Types.DATA.SET_SELECTED_ELEMENT,
            payload: {
                elementInfo,
                elementIndex,
            },
        };
        store.dispatch(setSelectedElement(elementInfo, elementIndex));
        expect(store.getActions()[0]).toEqual(expectedAction);
    });
    test('setCurrentElements should return currentElements to show', () => {
        const expectedAction = {
            type: Types.DATA.SET_CURRENT_ELEMENTS,
            payload: [{ id: 1 }],
        };
        store.dispatch(setCurrentElements([{ id: 1 }]));
        expect(store.getActions()[0]).toEqual(expectedAction);
    });
    test('setPageCount should set pageCount', () => {
        const expectedAction = {
            type: Types.DATA.SET_PAGE_COUNT,
            payload: 5,
        };
        store.dispatch(setPageCount(5));
        expect(store.getActions()[0]).toEqual(expectedAction);
    });
    test('loadData should load data correctly without error', () => {
        const url =
            'http://www.filltext.com/?rows=32&id=%7Bnumber%7C1000%7D&firstName=%7BfirstName%7D&lastName=%7BlastName%7D&email=%7Bemail%7D&phone=%7Bphone%7C(xxx)xxx-xx-xx%7D&address=%7BaddressObject%7D&description=%7Blorem%7C32%7D';
        fetchMock.get(url, {
            body: data,
        });
        const sortingMap = new Map([]);
        const appElements = getAppElements(data, null, sortingMap);
        const expectedActions = [
            { type: Types.APP_STATUS.CHANGE_LOADING_STATUS, payload: true },
            {
                type: Types.DATA.SET_FULL_DATA,
                payload: data,
            },
            {
                type: Types.DATA.SET_PAGE_COUNT,
                payload: 1,
            },
            {
                type: Types.DATA.SET_APP_ELEMENTS,
                payload: appElements,
            },
            { type: Types.APP_STATUS.CHANGE_LOADING_STATUS, payload: false },
            { type: Types.APP_STATUS.CATCH_ERROR, payload: undefined },
        ];
        return store.dispatch(loadData(url, sortingMap)).then(() => {
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
    test('changeInputElementField should set correct field in element', () => {
        const expectedAction = {
            type: Types.DATA.CHANGE_INPUT_ELEMENT_FIELD,
            payload: {
                field: 'field',
                value: 'value',
            },
        };
        store.dispatch(changeInputElementField('field', 'value'));
        expect(store.getActions()[0]).toEqual(expectedAction);
    });
    test('changeValidateInputs should change validation', () => {
        const expectedAction = {
            type: Types.DATA.CHANGE_VALIDATE_INPUTS,
            payload: {
                field: 'field',
                isValid: true,
            },
        };
        store.dispatch(changeValidateInputs('field', true));
        expect(store.getActions()[0]).toEqual(expectedAction);
    });
    test('changeIsInputFormOpen should change open status of input form', () => {
        const expectedAction = {
            type: Types.DATA.CHANGE_IS_INPUT_FORM_OPEN,
            payload: true,
        };
        store.dispatch(changeIsInputFormOpen(true));
        expect(store.getActions()[0]).toEqual(expectedAction);
    });
    test('changeIsAddButtonDisabled should change add button disabled status', () => {
        const expectedAction = {
            type: Types.DATA.CHANGE_IS_ADD_BUTTON_DISABLED,
            payload: true,
        };
        store.dispatch(changeIsAddButtonDisabled(true));
        expect(store.getActions()[0]).toEqual(expectedAction);
    });
    test('removeInputData should be called', () => {
        const expectedAction = {
            type: Types.DATA.REMOVE_INPUT_DATA,
        };
        store.dispatch(removeInputData());
        expect(store.getActions()[0]).toEqual(expectedAction);
    });
    test('resetValidInputs should be called', () => {
        const expectedAction = {
            type: Types.DATA.RESET_VALID_INPUTS,
        };
        store.dispatch(resetValidInputs());
        expect(store.getActions()[0]).toEqual(expectedAction);
    });
    test('changeInputAddingStatus should change addingStatus', () => {
        const expectedAction = {
            type: Types.DATA.CHANGE_INPUT_ADDING_STATUS,
            payload: {
                statusText: 'statusText',
                isError: false,
            },
        };
        store.dispatch(changeInputAddingStatus('statusText', false));
        expect(store.getActions()[0]).toEqual(expectedAction);
    });
    test('changeElementDescription should change description of element and in array', () => {
        const expectedAction = {
            type: Types.DATA.CHANGE_ELEMENT_DESCRIPTION,
            payload: {
                description: 'description',
                elementIndex: 1,
            },
        };
        store.dispatch(changeElementDescription('description', 1));
        expect(store.getActions()[0]).toEqual(expectedAction);
    });
});
