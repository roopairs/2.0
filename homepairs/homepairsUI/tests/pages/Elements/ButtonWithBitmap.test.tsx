import React from 'react';
import {Text} from 'react-native';
import {ButtonWithBitmap} from 'homepairs-elements';
import { render, fireEvent } from 'react-native-testing-library';
import {bolt} from 'homepairs-images';

jest.mock('homepairs-images');

describe('Test to see if the component functions properly', () => {
    const message = 'Hello World!';
    const testfunc = () => {return message;};
    const mockFunction = jest.fn(testfunc);

    beforeEach(()=>{
        mockFunction.mockClear();
    });

    it('Test for default props and structure', () => {
        expect(ButtonWithBitmap.defaultProps.containerStyle).toBeDefined();
        expect(ButtonWithBitmap.defaultProps.testID).toBeDefined();
        expect(ButtonWithBitmap.defaultProps.name).toBeNull();
        expect(ButtonWithBitmap.defaultProps.buttonTextStyle).toBeDefined();
        expect(ButtonWithBitmap.defaultProps.buttonStyle).toBeDefined();
        expect(ButtonWithBitmap.defaultProps.imageStyle).toBeDefined();
    });

    it('Test for functionality, should be the same as the ThinButton', () => {
        const rendered = render(<ButtonWithBitmap image={bolt} testID='click-bitmap-button' name='Test' onPress={mockFunction} />);
        const {getByTestId, getByText} = rendered;

        const testId = 'click-bitmap-button';

        fireEvent.press(getByTestId(testId));
        fireEvent.press(getByTestId(testId));

        expect(mockFunction).toHaveBeenCalledTimes(2);
        expect(getByText('Test')).toBeDefined();


    });

    it('Test for functionality and structure, should not have a TextComponent', () => {
        const rendered = render(<ButtonWithBitmap image={bolt} testID='click-bitmap-button' onPress={mockFunction} />);
        const {getByTestId, queryAllByType} = rendered;


        const testId = 'click-bitmap-button';

        fireEvent.press(getByTestId(testId));
        fireEvent.press(getByTestId(testId));

        expect(mockFunction).toHaveBeenCalledTimes(2);
        expect(queryAllByType(Text)).toHaveLength(0);
    });
    
});