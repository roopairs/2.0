/**
 * @jest-environment jsdom
 */

import {Panel} from 'homepairs-elements';
import {ApplianceCategorizer} from 'homepairs-components';
import {Appliance, ApplianceType} from 'homepairs-types';
import { shallow } from 'enzyme';
import * as React from 'react';
import { View, Text} from 'react-native';
import { render } from 'react-native-testing-library';

jest.mock('homepairs-images');

describe("Panel", () => {
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
    const wrapper = shallow(<ApplianceCategorizer appliances={fakeAppliances}/>);
    const emptyWrapper = shallow(<ApplianceCategorizer appliances={[]}/>);
    // const rendered = render(<ApplianceCategorizer appliances={fakeAppliances}/>);

    it ("Test for proper components", () => {
        expect(wrapper.find(View)).toHaveLength(4);
        expect(wrapper.find(Text)).toHaveLength(3);
        expect(wrapper.find(Panel)).toHaveLength(4);
    });

    it ("Test for empty appliances components", () => {
        expect(emptyWrapper.find(View)).toHaveLength(1);
        expect(emptyWrapper.find(Text)).toHaveLength(1);
    });

    /*
    it ("Method test", () => {
        const {getAllByType} = rendered;
        const categories = getAllByType(View);
        expect(categories).toHaveLength(3);
    });
    */
});

