
/**
 * @jest-environment jsdom
 */

import {Panel, ThinButton} from 'homepairs-elements';
import {Appliance, ApplianceType} from 'homepairs-types';
import { shallow } from 'enzyme';
import * as React from 'react';
import { View,  Animated, TouchableHighlight, Image} from 'react-native';
import { fireEvent, render } from 'react-native-testing-library';

jest.mock('homepairs-images');


describe("Panel", () => {
    const testFunc = () => { return "Button pressed";};
    const spyFunc = jest.fn(testFunc);
    const fakeApp = <Appliance
        applianceId={1234}
        appName='Fake Appliance'
        category={ApplianceType.Plumbing}
        manufacturer="Vulcan Equipment"
        modelNum={1}
        serialNum={2}
        location='Kitchen'
    />;
    const fakeApp2 = <Appliance
        applianceId={4321}
        appName='Fake Appliance 2'
        category={ApplianceType.GeneralAppliance}
        manufacturer="Chacon Equipment"
        modelNum={2}
        serialNum={3}
        location='Basement'
    />;
    const wrapper = shallow(<Panel appliance={fakeApp}/>);
    const rendered = render(<Panel onEditApplianceModal={spyFunc} appliance={fakeApp2}/>);

    it ("Test for proper components", () => {
        expect(wrapper.find(Animated.View)).toHaveLength(1);
        expect(wrapper.find(View)).toHaveLength(11);
        expect(wrapper.find(ThinButton)).toHaveLength(1);
        expect(wrapper.find(TouchableHighlight)).toHaveLength(1);
        expect(wrapper.find(Image)).toHaveLength(1);
    });

    it ("Method test", () => {
        const {getByTestId} = rendered;
        const button = getByTestId('click-thin-button');
        
        fireEvent.press(button);
        fireEvent.press(button);

        expect(spyFunc.mock.calls).toHaveLength(2);
        expect(spyFunc.mock.results[0].value).toBe("Button pressed");
    });
});

