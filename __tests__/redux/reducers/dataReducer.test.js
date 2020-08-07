import { dataReducer } from '../../../src/client/redux/reducers/dataReducer';
import {
    setFullData,
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
import { initialState } from '../../../src/client/redux/initialState';
import { data } from '../../../__mocks__/data';
import configureMockStore from 'redux-mock-store';

const mockStore = configureMockStore();

describe('dataReducer', () => {
    let store;
    beforeEach(() => {
        store = mockStore({ ...initialState });
    });
    test('setFullData should return correct state', () => {
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
            {
                id: 683,
                firstName: 'Chad',
                lastName: 'Robichaud',
                email: 'SDupuy@lacus.ly',
                phone: '(253)555-8927',
            },
        ];
        const expectedState = { ...store.getState().data, fullData: expectedArray };
        expect(dataReducer(store.getState().data, setFullData(data))).toEqual(expectedState);
    });
    test('setAppElements should return correct state', () => {
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
            {
                id: 683,
                firstName: 'Chad',
                lastName: 'Robichaud',
                email: 'SDupuy@lacus.ly',
                phone: '(253)555-8927',
            },
        ];
        const expectedState = { ...store.getState().data, appElements: expectedArray };
        expect(dataReducer(store.getState().data, setAppElements(data))).toEqual(expectedState);
    });
    test('setSelectedElement should return correct state', () => {
        const selectedElement = {
            id: 115,
            firstName: 'Racquel',
            lastName: 'Herbert',
            email: 'EMarton@placerat.com',
            phone: '(884)101-9065',
        };
        const selectedElementIndex = 5;
        const expectedState = {
            ...store.getState().data,
            currentElement: {
                elementInfo: selectedElement,
                elementIndex: selectedElementIndex,
            },
        };
        expect(
            dataReducer(
                store.getState().data,
                setSelectedElement(selectedElement, selectedElementIndex)
            )
        ).toEqual(expectedState);
    });
    test('setCurrentElements should return correct state', () => {
        const currentElements = [{ id: 1 }];
        const expectedState = {
            ...store.getState().data,
            currentElements,
        };
        expect(dataReducer(store.getState().data, setCurrentElements(currentElements))).toEqual(
            expectedState
        );
    });
    test('setPageCount should return correct state', () => {
        const pageCount = 5;
        const expectedState = { ...store.getState().data, pageCount: pageCount };
        expect(dataReducer(store.getState().data, setPageCount(5))).toEqual(expectedState);
    });
    test('changeInputElementField should change inputElement field correctly', () => {
        const changedElement = {
            id: 5,
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
        };
        const expectedState = {
            ...store.getState().data,
            inputContainer: {
                ...store.getState().data.inputContainer,
                inputElement: changedElement,
            },
        };
        expect(dataReducer(store.getState().data, changeInputElementField('id', 5))).toEqual(
            expectedState
        );
    });
    test('changeValidateInputs should change validInputs field correctly', () => {
        const changedValidInputs = {
            id: true,
            firstName: false,
            lastName: false,
            email: false,
            phone: false,
        };
        const expectedState = {
            ...store.getState().data,
            inputContainer: {
                ...store.getState().data.inputContainer,
                validInputs: changedValidInputs,
            },
        };
        expect(dataReducer(store.getState().data, changeValidateInputs('id', true))).toEqual(
            expectedState
        );
    });
    test('changeIsFormOpen should return state with correct isFormOpen', () => {
        const isFormOpen = true;
        const expectedState = {
            ...store.getState().data,
            inputContainer: {
                ...store.getState().data.inputContainer,
                isFormOpen: isFormOpen,
            },
        };
        expect(dataReducer(store.getState().data, changeIsInputFormOpen(isFormOpen))).toEqual(
            expectedState
        );
    });
    test('changeIsAddButtonDisabled should return state with correct isAddButtonDisabled', () => {
        const isAddButtonDisabled = true;
        const expectedState = {
            ...store.getState().data,
            inputContainer: {
                ...store.getState().data.inputContainer,
                isAddButtonDisabled,
            },
        };
        expect(
            dataReducer(store.getState().data, changeIsAddButtonDisabled(isAddButtonDisabled))
        ).toEqual(expectedState);
    });
    test('removeInputData should return initial inputElement correctly', () => {
        const initialInputElement = {
            id: 0,
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
        };
        const expectedState = {
            ...store.getState().data,
            inputContainer: {
                ...store.getState().data.inputContainer,
                inputElement: initialInputElement,
            },
        };
        expect(dataReducer(store.getState().data, removeInputData())).toEqual(expectedState);
    });
    test('resetValidInputs should return initial validInputs correctly', () => {
        const initialValidInputs = {
            id: false,
            firstName: false,
            lastName: false,
            email: false,
            phone: false,
        };
        const expectedState = {
            ...store.getState().data,
            inputContainer: {
                ...store.getState().data.inputContainer,
                validInputs: initialValidInputs,
            },
        };
        expect(dataReducer(store.getState().data, resetValidInputs())).toEqual(expectedState);
    });
    test('changeInputAddingStatus should return correct state with status of adding', () => {
        const addingStatus = {
            addingStatusText: 'addingStatusText',
            isError: false,
        };
        const expectedState = {
            ...store.getState().data,
            inputContainer: {
                ...store.getState().data.inputContainer,
                addingStatus,
            },
        };
        expect(
            dataReducer(store.getState().data, changeInputAddingStatus('addingStatusText', false))
        ).toEqual(expectedState);
    });
    test('changeElementDescription should return correct data array and current element with changed description', () => {
        const elementInfo = {
            description: 'description',
        };
        const expectedState = {
            ...store.getState().data,
            fullData: [elementInfo],
            appElements: [elementInfo],
            currentElements: [elementInfo],
            currentElement: {
                ...store.getState().data.currentElement,
                elementInfo: elementInfo,
            },
        };
        expect(
            dataReducer(
                {
                    ...store.getState().data,
                    fullData: [{ description: '' }],
                    appElements: [{ description: '' }],
                    currentElements: [{ description: '' }],
                },
                changeElementDescription('description', 0)
            )
        ).toEqual(expectedState);
    });
    test('should return state without changes with undefined action', () => {
        const expectedState = { ...store.getState().data };
        expect(dataReducer(store.getState().data, { type: undefined })).toEqual(expectedState);
    });
});
