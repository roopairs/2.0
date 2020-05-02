import React from 'react';
import { ActivityIndicator, StatusBar, Text } from 'react-native';
import { render } from 'react-native-testing-library';
import { Card } from 'homepairs-elements';
import {LoadingModal} from './LoadingModal';
import { LoggingInModal, CreatingAccountModal } from './AuthenticationModals';


describe('Loading Modal Test', () => {
    it('Loading Modal Component', () => {
        const rendered = render(<LoadingModal><Text>Test</Text></LoadingModal>);
        const {queryByType, queryByText} = rendered;

        expect(queryByType(Card)).toBeDefined();
        expect(queryByType(ActivityIndicator)).toBeDefined();
        expect(queryByType(StatusBar)).toBeDefined();

        // Test to see if child was properly inputted
        expect(queryByText('Test')).toBeDefined();
    });
});

describe('LogginInModal Test', () => {
    it('LogginInModal Component', () => {
        const rendered = render(<LoggingInModal/>);
        const {queryByType, queryByText} = rendered;

        expect(queryByType(Card)).toBeDefined();
        expect(queryByType(ActivityIndicator)).toBeDefined();
        expect(queryByType(StatusBar)).toBeDefined();

        // Test to see if child was properly inputted
        expect(queryByText('Logging In...')).toBeDefined();
    });
});

describe('CreatingAccountModal Test', () => {
    it('CreatingAccountModal Component', () => {
        const rendered = render(<CreatingAccountModal/>);
        const {queryByType, queryByText} = rendered;

        expect(queryByType(Card)).toBeDefined();
        expect(queryByType(ActivityIndicator)).toBeDefined();
        expect(queryByType(StatusBar)).toBeDefined();

        // Test to see if child was properly inputted
        expect(queryByText('Logging In...')).toBeDefined();
    });
});