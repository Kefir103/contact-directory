import React from 'react';
import { shallow, render } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import TablePanel from '../../../src/client/components/table/TablePanel';
import { initialState } from '../../../src/client/redux/initialState';

const mockStore = configureMockStore();

describe('<TablePanel />', () => {
    test('should render correctly without selected sortingMap', () => {
        const store = mockStore({ ...initialState });
        const wrapper = shallow(<TablePanel store={store} />);
        const component = render(wrapper);
        expect(component).toMatchSnapshot();
    });
    test('should render correctly with selected sortingMap with asc and desc values', () => {
        const store = mockStore({
            ...initialState,
            filter: {
                ...initialState.filter,
                sortingMap: new Map([
                    ['id', 'asc'],
                    ['firstName', 'asc'],
                    ['lastName', 'asc'],
                    ['email', 'desc'],
                    ['phone', 'desc'],
                ]),
            },
        });
        const wrapper = shallow(<TablePanel store={store} />);
        const component = render(wrapper);
        expect(component).toMatchSnapshot();
    });
});
