import React from 'react';
import { shallow, render } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import TableElement from '../../../src/client/components/table/TableElement';
import { initialState } from '../../../src/client/redux/initialState';

const mockStore = configureMockStore();

describe('<TableElement />', () => {
    test('should render correctly without currentElement', () => {
        const element = {
            id: 1,
            firstName: 'firstName',
            lastName: 'lastName',
            email: 'email',
            phone: 'phone',
        };
        const elementIndex = 1;
        const store = mockStore({ ...initialState });
        const wrapper = shallow(
            <TableElement store={store} element={element} elementIndex={elementIndex} />
        );
        const component = wrapper.dive().dive();
        expect(component).toMatchSnapshot();
    });
    test('should render correctly with selected element', () => {
        const element = {
            id: 1,
            firstName: 'firstName',
            lastName: 'lastName',
            email: 'email',
            phone: 'phone',
        };
        const elementIndex = 0;
        const store = mockStore({
            ...initialState,
            data: {
                ...initialState.data,
                pageElements: [{ id: 1 }],
                currentElement: {
                    elementIndex: 0,
                    elementInfo: { id: 1 },
                },
            },
        });
        const wrapper = shallow(
            <TableElement store={store} element={element} elementIndex={elementIndex} />
        );
        const component = wrapper.dive().dive();
        expect(component).toMatchSnapshot();
    });
});
