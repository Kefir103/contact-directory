import React from 'react';
import configureMockStore from 'redux-mock-store';
import { shallow } from 'enzyme';
import { initialState } from '../src/client/redux/initialState';
import App from '../src/client/App';

const mockStore = configureMockStore();

describe('<App />', () => {
    test('should render correctly with error', () => {
        const store = mockStore({
            ...initialState,
            appStatus: {
                ...initialState.appStatus,
                error: true,
            },
        });
        const wrapper = shallow(<App store={store} />);
        const component = wrapper.dive().dive();
        expect(component).toMatchSnapshot();
    });
    test('should render correctly with isLoading', () => {
        const store = mockStore({
            ...initialState,
            appStatus: {
                ...initialState.appStatus,
                isLoading: true,
            },
        });
        const wrapper = shallow(<App store={store} />);
        const component = wrapper.dive().dive();
        expect(component).toMatchSnapshot();
    });
    test('should render correctly without isLoading and elementInfo', () => {
        const store = mockStore({ ...initialState });
        const wrapper = shallow(<App store={store} />);
        const component = wrapper.dive().dive();
        expect(component).toMatchSnapshot();
    });
    test('should render correctly without isLoading and with elementInfo', () => {
        const store = mockStore({
            ...initialState,
            data: {
                ...initialState.data,
                currentElement: {
                    elementInfo: 'elementInfo',
                    elementIndex: 1,
                },
            },
        });
        const wrapper = shallow(<App store={store} />);
        const component = wrapper.dive().dive();
        expect(component).toMatchSnapshot();
    });
});
