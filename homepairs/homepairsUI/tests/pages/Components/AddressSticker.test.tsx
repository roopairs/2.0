import React from 'react';
import { AddressSticker } from 'homepairs-components';
import { render } from 'react-native-testing-library';
import { Text } from 'react-native';

describe('Address Sticker Test', () => {
    it('Only one test to conduct. Check if values all render property', () => {
        const rendered = render(<AddressSticker city='Test City' address='Test Street' state='Test State'/>);
        const {getByText, getAllByType} = rendered;
        const expectedText1 = '/ Test Street';
        const expectedText2= 'Test City, Test State';

        const wrapperInfo = getAllByType(Text)[0].props.children;
        let receivedText = '';
        
        wrapperInfo.forEach((child:any) => {
            if(typeof child === 'string')
                receivedText +=  child;
        });
        

        expect(getByText(expectedText1)).toBeDefined();
        expect(receivedText).toBe(expectedText2);


    });
});