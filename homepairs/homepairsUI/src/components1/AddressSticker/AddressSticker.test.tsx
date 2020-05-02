import React from 'react';
import { render } from 'react-native-testing-library';
import { Text } from 'react-native';
import AddressSticker from './AddressSticker';

describe('Address Sticker Test', () => {
    it('Only one test to conduct. Check if values all render property', () => {
        const rendered = render(<AddressSticker address='Test Street'/>);
        const {getByType} = rendered;
        const expectedText1 = 'Test Street';
        
        expect(getByType(Text).props.children).toBe(expectedText1);
    });
});