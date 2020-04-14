import React from 'react';
import {} from 'react-native';
import {ChooseServiceCategory} from 'homepairs-components';
import { fireEvent, render } from 'react-native-testing-library';
import { ApplianceType } from 'src/state/types';
import ButtonWithBitmap from 'src/Elements/Buttons/ButtonWithBitmap';


jest.mock('homepairs-images');

const {Plumbing, LightingAndElectric, HVAC, GeneralAppliance} = ApplianceType;
describe('Test for Choose Service Category Component', () => {
    const mockSelectCategory = jest.fn((applianceType: ApplianceType) => {return applianceType;});
    let bitMapButtons; 

    beforeEach(() => {
        const rendered = render(<ChooseServiceCategory onPress={mockSelectCategory} />);
        const {getAllByType} = rendered;
        bitMapButtons = getAllByType(ButtonWithBitmap);
        mockSelectCategory.mockClear();
    });

    it('Test for proper rendering',  () => {
        expect(bitMapButtons).toHaveLength(4);
    });

    // Press each button in the component 
    it('Test for press for Lighting and Electric', () =>{
        fireEvent.press(bitMapButtons[0]);
        expect(mockSelectCategory).toHaveBeenCalledTimes(1);
        expect(mockSelectCategory).toHaveBeenNthCalledWith(1, LightingAndElectric);
    });

    it('Test for press for  Plumbing', () =>{
        fireEvent.press(bitMapButtons[1]);
        expect(mockSelectCategory).toHaveBeenCalledTimes(1);
        expect(mockSelectCategory).toHaveBeenNthCalledWith(1, Plumbing);
    });

    it('Test for press for Heating, Ventilation, and Air Conditioning', () =>{
        fireEvent.press(bitMapButtons[2]);
        expect(mockSelectCategory).toHaveBeenCalledTimes(1);
        expect(mockSelectCategory).toHaveBeenNthCalledWith(1, HVAC);
    });

    it('Test for press for General Appliance', () =>{
        fireEvent.press(bitMapButtons[3]);
        expect(mockSelectCategory).toHaveBeenCalledTimes(1);
        expect(mockSelectCategory).toHaveBeenNthCalledWith(1, GeneralAppliance);
    });
});