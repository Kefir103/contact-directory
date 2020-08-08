import React from 'react';
import { shallow, render } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import SideMenu from '../../../src/client/components/sidemenu/SideMenu';
import { initialState } from '../../../src/client/redux/initialState';

const mockStore = configureMockStore();

describe('<SideMenu />', () => {
    test('should render correctly with empty fullData', () => {
        const store = mockStore({ ...initialState });
        const wrapper = shallow(<SideMenu store={store} />);
        const component = wrapper.dive().dive();
        expect(component).toMatchSnapshot();
    });
    test('should render correctly with filled fullData', () => {
        const store = mockStore({
            ...initialState,
            data: {
                ...initialState.data,
                fullData: [1, 2, 3],
            },
        });
        const wrapper = shallow(<SideMenu store={store} />);
        const component = wrapper.dive().dive();
        expect(component).toMatchSnapshot();
    });
});
