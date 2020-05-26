
/**
 * @jest-environment jsdom
 */

import { ThinButton } from 'src/elements';
import {Appliance, ApplianceType} from 'homepairs-types';
import { shallow } from 'enzyme';
import * as React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { fireEvent, render } from 'react-native-testing-library';
import ApplianceCategorizer from './ApplianceCategorizer';
import ApplianceInfo from './ApplianceInfo';

jest.mock('homepairs-images');

describe("Panel", () => {
    const testFunc = () => { return "Button pressed";};
    const spyFunc = jest.fn(testFunc);
    const fakeAppliances : Appliance[] = [
        {
            applianceId: 1234,
            appName: 'Fake Appliance',
            category: ApplianceType.Plumbing,
            manufacturer: "Vulcan Equipment",
            modelNum: 1,
            serialNum: 2,
            location: 'Kitchen',
        },
        {
            applianceId: 1234,
            appName: 'Fake Appliance 2',
            category: ApplianceType.Plumbing,
            manufacturer: "Vulcan Equipment",
            modelNum: 1,
            serialNum: 2,
            location: 'Kitchen',
        },
        {
            applianceId: 1234,
            appName: 'Fake Appliance',
            category: ApplianceType.Plumbing,
            manufacturer: "Vulcan Equipment",
            modelNum: 1,
            serialNum: 2,
            location: 'Basement',
        },
        {
            applianceId: 1234,
            appName: 'Fake Appliance',
            category: ApplianceType.Plumbing,
            manufacturer: "Vulcan Equipment",
            modelNum: 1,
            serialNum: 2,
            location: 'Living Room',
        },
    ];
    const wrapper = shallow(<ApplianceInfo appliances={fakeAppliances}/>);
    const rendered = render(<ApplianceInfo onAddApplianceModal={spyFunc} appliances={fakeAppliances}/>);

    it ("Test for proper components", () => {
        expect(wrapper.find(Text)).toHaveLength(1);
        expect(wrapper.find(ApplianceCategorizer)).toHaveLength(1);
        expect(wrapper.find(View)).toHaveLength(3);
        expect(wrapper.find(ThinButton)).toHaveLength(1);
    });

    it ("Method test", () => {
        const {getByTestId} = rendered;
        const button = getByTestId('add-appliance-button').findByType(TouchableOpacity);
        
        fireEvent.press(button);
        fireEvent.press(button);

        expect(spyFunc.mock.calls).toHaveLength(2);
        expect(spyFunc.mock.results[0].value).toBe("Button pressed");
    });
});