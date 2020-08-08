import React from 'react';
import Loader from '../../src/client/components/Loader';
import { render } from 'enzyme';

describe('<Loader />', () => {
    test('should render correctly', () => {
        const component = render(<Loader />);
        expect(component).toMatchSnapshot();
    });
});
