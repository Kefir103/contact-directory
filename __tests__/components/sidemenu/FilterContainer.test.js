import React from 'react';
import configureMockStore from 'redux-mock-store';
import { shallow, render } from 'enzyme';
import FilterContainer from '../../../src/client/components/sidemenu/FilterContainer';
import { initialState } from '../../../src/client/redux/initialState';

const mockStore = configureMockStore();

describe('<FilterContainer />', () => {
    test('should render correctly without filterText', () => {
        const store = mockStore({ ...initialState });
        const wrapper = shallow(<FilterContainer store={store} />);
        const component = render(wrapper);
        expect(component).toMatchSnapshot();
    });
    test('should render correctly with filterText', () => {
        const store = mockStore({
            ...initialState,
            filter: {
                ...initialState.filter,
                filterText: 'filterText',
            },
        });
        const wrapper = shallow(<FilterContainer store={store} />);
        const component = render(wrapper);
        expect(component).toMatchSnapshot();
    });
    test('should render correctly with filterText and checked filterFields', () => {
        const store = mockStore({
            ...initialState,
            filter: {
                ...initialState.filter,
                filterText: 'filterText',
                filterFields: ['id', 'firstName', 'lastName', 'email', 'phone'],
            },
        });
        const wrapper = shallow(<FilterContainer store={store} />);
        const component = render(wrapper);
        expect(component).toMatchSnapshot();
    });
});
