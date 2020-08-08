import React from 'react';
import { shallow, render } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import LoadBtnContainer from '../../../src/client/components/sidemenu/LoadBtnContainer';
import { initialState } from '../../../src/client/redux/initialState';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock-jest';

const mockStore = configureMockStore([thunk]);

describe('<LoadBtnContainer />', () => {
    let store;
    beforeEach(() => {
        store = mockStore({ ...initialState });
    });
    afterEach(() => {
        fetchMock.restore();
    });
    test('should render correctly', () => {
        const wrapper = shallow(<LoadBtnContainer store={store} />);
        expect(wrapper.dive().dive()).toMatchSnapshot();
    });
});
