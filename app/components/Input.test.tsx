import React from 'react';
import 'react-native';
import 'react-native-gesture-handler';
import {Input} from './Input';
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  renderer.create(<Input placeholder="Message" />);
});
