import React from 'react';
import configureMockStore from 'redux-mock-store';
import EntryInfo from '../../../src/client/components/entry/EntryInfo';
import { shallow, render } from 'enzyme';
import { initialState } from '../../../src/client/redux/initialState';

const mockStore = configureMockStore();

describe('<EntryInfo />', () => {
    test('should render correctly with full ElementInfo', () => {
        const currentElement = {
            elementInfo: {
                id: 1,
                firstName: 'firstName',
                lastName: 'lastName',
                emaiL: 'email',
                phone: 'phone',
                address: {
                    streetAddress: 'streetAddress',
                    city: 'city',
                    state: 'state',
                    zip: 'zip',
                },
                description: 'description',
            },
            elementIndex: 1,
        };
        const store = mockStore({
            ...initialState,
            data: {
                ...initialState.data,
                currentElement,
            },
        });
        const wrapper = shallow(<EntryInfo store={store} />);
        const component = render(wrapper);
        expect(component).toMatchSnapshot();
    });
    test('should render correctly without address in ElementInfo', () => {
        const currentElement = {
            elementInfo: {
                id: 1,
                firstName: 'firstName',
                lastName: 'lastName',
                emaiL: 'email',
                phone: 'phone',
                description: 'description',
            },
            elementIndex: 1,
        };
        const store = mockStore({
            ...initialState,
            data: {
                ...initialState.data,
                currentElement,
            },
        });
        const wrapper = shallow(<EntryInfo store={store} />);
        const component = render(wrapper);
        expect(component).toMatchSnapshot();
    });
});
