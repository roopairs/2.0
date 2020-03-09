import React from 'react';
import {} from 'react-native';
import {ChooseServiceRequest} from 'homepairs-components';
import { fireEvent, render } from 'react-native-testing-library';
import { ApplianceType } from 'src/state/types';
import ButtonWithBitmap from 'src/Elements/Buttons/ButtonWithBitmap';


jest.mock('homepairs-images');

const {Plumbing, LightingAndElectric, HVAC, GeneralAppliance, None} = ApplianceType;
describe('Test for Choose Service Request Component', () => {
    const mockSelectCategory = jest.fn((applianceType: ApplianceType) => {return applianceType;});
    const rendered = render(<ChooseServiceRequest onPress={mockSelectCategory} />);

    const {getAllByType, getByText} = rendered;
    const bitMapButtons = getAllByType(ButtonWithBitmap);

    it('Test for proper rendering',  () => {
        expect(getByText('CHOOSE SERVICE REQUEST CATEGORY')).toBeDefined();
        expect(bitMapButtons).toHaveLength(4);
    });

    it('Test for proper functionality', () =>{
        // Press each button in the component 
        bitMapButtons.forEach(bitMapButton => {
            fireEvent.press(bitMapButton);
        });

        expect(mockSelectCategory).toHaveBeenCalledTimes(4);
        expect(mockSelectCategory).toHaveBeenNthCalledWith(1, LightingAndElectric);
        expect(mockSelectCategory).toHaveBeenNthCalledWith(2, Plumbing);
        expect(mockSelectCategory).toHaveBeenNthCalledWith(3, HVAC);
        expect(mockSelectCategory).toHaveBeenNthCalledWith(4, GeneralAppliance);
    });
});