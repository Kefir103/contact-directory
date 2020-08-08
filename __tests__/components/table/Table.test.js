import React from 'react';
import { shallow, render } from 'enzyme';
import { initialState } from '../../../src/client/redux/initialState';
import configureMockStore from 'redux-mock-store';
import Table from '../../../src/client/components/table/Table';
import { getElementsByPage } from '../../../src/client/functions/dataFunctions';

const mockStore = configureMockStore();

describe('<Table />', () => {
    test('should render correctly with loaded fullData and pageCount = 2', () => {
        const element = {
            id: 1,
            firstName: 'firstName',
            lastName: 'lastName',
            email: 'email',
            phone: 'phone',
        };
        const pageCount = 2;
        const fullData = [];
        for (let i = 0; i < 100; i++) {
            fullData.push(element);
        }
        const currentElements = getElementsByPage(fullData, 1);
        const store = mockStore({
            ...initialState,
            data: {
                ...initialState.data,
                fullData,
                pageCount,
                currentElements,
            },
        });
        const wrapper = shallow(<Table store={store} />);
        const component = wrapper.dive().dive();
        expect(component).toMatchSnapshot();
    });
    test('should render correctly with loaded fullData and pageCount = 2', () => {
        const element = {
            id: 1,
            firstName: 'firstName',
            lastName: 'lastName',
            email: 'email',
            phone: 'phone',
        };
        const pageCount = 1;
        const fullData = [];
        for (let i = 0; i < 100; i++) {
            fullData.push(element);
        }
        const currentElements = getElementsByPage(fullData, 1);
        const store = mockStore({
            ...initialState,
            data: {
                ...initialState.data,
                fullData,
                pageCount,
                currentElements,
            },
        });
        const wrapper = shallow(<Table store={store} />);
        const component = wrapper.dive().dive();
        expect(component).toMatchSnapshot();
    });
    test('should render correctly without loaded fullData', () => {
        const fullData = [];
        const store = mockStore({
            ...initialState,
            data: {
                ...initialState.data,
                fullData,
            },
        });
        const wrapper = shallow(<Table store={store} />);
        const component = render(wrapper);
        expect(component).toMatchSnapshot();
    });
    test('should render correctly with filterText and empty appElements', () => {
        const element = {
            id: 1,
            firstName: 'firstName',
            lastName: 'lastName',
            email: 'email',
            phone: 'phone',
        };
        const fullData = [];
        for (let i = 0; i < 100; i++) {
            fullData.push(element);
        }
        const store = mockStore({
            ...initialState,
            filter: {
                ...initialState.filter,
                filterText: 'filterText',
            },
            data: {
                ...initialState.data,
                fullData,
            },
        });
        const wrapper = shallow(<Table store={store} />);
        const component = render(wrapper);
        expect(component).toMatchSnapshot();
    });
});
