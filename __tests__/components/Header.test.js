import React from 'react';
import Header from '../../src/client/components/Header';
import { render } from 'enzyme';

describe('<Header />', () => {
    test('should render correctly', () => {
        const component = render(<Header />);
        expect(component).toMatchSnapshot();
    });
});
