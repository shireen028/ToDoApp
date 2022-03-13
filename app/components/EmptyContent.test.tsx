import 'react-native';
import React from 'react';
import {EmptyContent} from './EmptyContent';

import renderer from 'react-test-renderer';

it('renders correctly', () => {
    renderer.create(<EmptyContent />);
});
