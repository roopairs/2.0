import React from 'react';
import { render } from 'react-native-testing-library';
import { LightColorTheme } from 'homepairs-base-styles';
import {HomePairsHeaderTitle} from '../HomePairsHeaderTitle';

const HOMEPAIRS= 'HomePairs';
const STYLE_TEST_ID = 'homepairs-header-title-style';
const colorScheme = LightColorTheme;

describe('HomePairs Header Title Test', () => {
    it('The header is a dropdown Menu', () => {
        const expectedStyle = {
            padding: 15,
            paddingRight: 0,
            height: 80,
            width: '100%',
            backgroundColor: colorScheme.secondary,
        };
        const rendered = render(<HomePairsHeaderTitle isDropDown={true}/>);
        const {getByText, getByTestId} = rendered;
        
        expect(getByText(HOMEPAIRS)).toBeDefined();
        expect(getByTestId(STYLE_TEST_ID).props.style).toStrictEqual(expectedStyle);
    });

    it('The header is a navBar Menu', () => {
        const expectedStyle = {
            flexDirection: 'row',
            padding: 15,
            paddingRight: 0,
            height: 80,
            minWidth: 175,
            maxWidth: 185,
            backgroundColor: colorScheme.secondary,
        };
        const rendered = render(<HomePairsHeaderTitle isDropDown={false}/>);
        const {getByText, getByTestId} = rendered;
        
        expect(getByText(HOMEPAIRS)).toBeDefined();
        expect(getByTestId(STYLE_TEST_ID).props.style).toStrictEqual(expectedStyle);
    });
});