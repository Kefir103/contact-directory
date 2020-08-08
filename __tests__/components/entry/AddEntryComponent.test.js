import React from 'react';
import configureMockStore from 'redux-mock-store';
import AddEntryComponent from '../../../src/client/components/entry/AddEntryComponent';
import { initialState } from '../../../src/client/redux/initialState';
import { shallow, render } from 'enzyme';

const mockStore = configureMockStore();
describe('<AddEntryComponent />', () => {
    let store;
    beforeEach(() => {
        store = mockStore({ ...initialState });
    });
    test('should render correctly with initialState', () => {
        const wrapper = shallow(<AddEntryComponent store={store} />);
        const component = render(wrapper);
        expect(component).toMatchSnapshot();
    });
    test('should render correctly with isFormOpen', () => {
        const changedStore = mockStore({
            ...initialState,
            data: {
                ...initialState.data,
                inputContainer: {
                    ...initialState.data.inputContainer,
                    isFormOpen: true,
                },
            },
        });
        const wrapper = shallow(<AddEntryComponent store={changedStore} />);
        const component = render(wrapper);
        expect(component).toMatchSnapshot();
    });
    test('should render correctly with isAddButtonDisabled and isFormOpen', () => {
        const changedStore = mockStore({
            ...initialState,
            data: {
                ...initialState.data,
                inputContainer: {
                    ...initialState.data.inputContainer,
                    isAddButtonDisabled: true,
                    isFormOpen: true,
                },
            },
        });
        const wrapper = shallow(<AddEntryComponent store={changedStore} />);
        const component = render(wrapper);
        expect(component).toMatchSnapshot();
    });
    test('should render correctly with filled but not validated inputs', () => {
        const changedStore = mockStore({
            ...initialState,
            data: {
                ...initialState.data,
                inputContainer: {
                    ...initialState.data.inputContainer,
                    isAddButtonDisabled: true,
                    isFormOpen: true,
                    inputElement: {
                        id: 1,
                        firstName: 'firstName',
                        lastName: 'lastName',
                        email: 'email',
                        phone: 'phone',
                    },
                },
            },
        });
        const wrapper = shallow(<AddEntryComponent store={changedStore} />);
        const component = render(wrapper);
        expect(component).toMatchSnapshot();
    });
    test('should render correctly with good addingStatus', () => {
        const changedStore = mockStore({
            ...initialState,
            data: {
                ...initialState.data,
                inputContainer: {
                    ...initialState.data.inputContainer,
                    addingStatus: {
                        addingStatusText: 'addingStatusText',
                        isError: false,
                    },
                },
            },
        });
        const wrapper = shallow(<AddEntryComponent store={changedStore} />);
        const component = render(wrapper);
        expect(component).toMatchSnapshot();
    });
    test('should render correctly with error addingStatus', () => {
        const changedStore = mockStore({
            ...initialState,
            data: {
                ...initialState.data,
                inputContainer: {
                    ...initialState.data.inputContainer,
                    addingStatus: {
                        addingStatusText: 'addingStatusText',
                        isError: true,
                    },
                },
            },
        });
        const wrapper = shallow(<AddEntryComponent store={changedStore} />);
        const component = render(wrapper);
        expect(component).toMatchSnapshot();
    });
});
