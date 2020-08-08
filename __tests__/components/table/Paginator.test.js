import React from 'react';
import { shallow, render } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import Paginator from '../../../src/client/components/table/Paginator';
import { initialState } from '../../../src/client/redux/initialState';

const mockStore = configureMockStore();

describe('<Paginator />', () => {
    test('should render correctly at the start of paginating', () => {
        const store = mockStore({
            ...initialState,
            filter: { ...initialState.filter, currentPage: 1 },
            data: { ...initialState.data, pageCount: 10 },
        });
        const wrapper = shallow(<Paginator store={store} />);
        const component = wrapper.dive().dive();
        expect(component).toMatchSnapshot();
    });
    test('should render correctly at the end of paginating', () => {
        const store = mockStore({
            ...initialState,
            filter: { ...initialState.filter, currentPage: 10 },
            data: { ...initialState.data, pageCount: 10 },
        });
        const wrapper = shallow(<Paginator store={store} />);
        const component = wrapper.dive().dive();
        expect(component).toMatchSnapshot();
    });
    test('should render correctly in the middle of paginating', () => {
        const store = mockStore({
            ...initialState,
            filter: { ...initialState.filter, currentPage: 5 },
            data: { ...initialState.data, pageCount: 10 },
        });
        const wrapper = shallow(<Paginator store={store} />);
        const component = wrapper.dive().dive();
        expect(component).toMatchSnapshot();
    });
    test('should render correctly in the middle of paginating but with pageCount = 5', () => {
        const store = mockStore({
            ...initialState,
            filter: { ...initialState.filter, currentPage: 3 },
            data: { ...initialState.data, pageCount: 5 },
        });
        const wrapper = shallow(<Paginator store={store} />);
        const component = wrapper.dive().dive();
        expect(component).toMatchSnapshot();
    });
});
