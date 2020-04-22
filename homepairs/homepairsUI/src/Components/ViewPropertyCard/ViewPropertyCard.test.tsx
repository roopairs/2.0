import React from 'react';
import { ThinButton } from 'homepairs-elements';
import { mockStackNavigation, PropertyList1  } from 'homepairs-test';
import { fireEvent, render } from 'react-native-testing-library';
import { ImageBackground } from 'react-native';
import ViewPropertyCard from './ViewPropertyCard';

// Mock the images so we don't have issues rendering. We shouldn't use actual images in our tests anyway.
jest.mock('homepairs-images');


const CLICK_BUTTON = 'click-thin-button';
describe('Test for ViewProperty Card', () => {

    it('Test is default Props are defined', () => {
        const {viewButtonSelectedCallBack, image} = ViewPropertyCard.defaultProps;
        const expectedResult = { propertyIndex: 1, navigation: mockStackNavigation};
        expect(viewButtonSelectedCallBack(1, mockStackNavigation)).toStrictEqual(expectedResult);
        expect(image).toBeDefined();
    });

    it('Test the basic functionality of this component', () => {
        const [property] = PropertyList1;
        const mockViewButtonSelectedCallBack = jest.fn();
        const rendered = render(
            <ViewPropertyCard 
                propertyIndex={1} 
                property={property} 
                viewButtonSelectedCallBack={mockViewButtonSelectedCallBack} />);
        const {getByTestId, queryAllByType} = rendered;

        // Test if the proper components have rendered.  
        expect(queryAllByType(ImageBackground)).toHaveLength(1);
        expect(queryAllByType(ThinButton)).toHaveLength(1);

        // Test if the proper events invoke after pressing a button 
        fireEvent.press(getByTestId(CLICK_BUTTON));
        expect(mockViewButtonSelectedCallBack).toHaveBeenCalled();

    });
});