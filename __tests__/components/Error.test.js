import React from 'react';
import { Error } from '../../src/client/components/Error';
import { render } from 'enzyme';

describe('<Error />', () => {
    test('should render correctly', () => {
        const component = render(<Error />);
        expect(component).toMatchSnapshot();
    });
});
