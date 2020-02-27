
/**
 * @jest-environment jsdom
 */

import {ApplianceCategoryPanel, ThinButton} from 'homepairs-elements';
import {ApplianceType} from 'homepairs-types';
import { shallow } from 'enzyme';
import * as React from 'react';
import { View,  Animated, TouchableHighlight, Text, Image} from 'react-native';
import { fireEvent, render } from 'react-native-testing-library';
import strings from 'homepairs-strings';

jest.mock('homepairs-images');

describe("Category Panel", () => {
    const testFunc = (appType: ApplianceType) => { return appType;};
    const spyFunc = jest.fn(testFunc);
    const wrapper = shallow(<ApplianceCategoryPanel />);
    const rendered = render(<ApplianceCategoryPanel parentCallBack={spyFunc} initialCategory={ApplianceType.None}/>);

    it ("Test for proper components", () => {
        expect(wrapper.find(Animated.View)).toHaveLength(1);
        expect(wrapper.find(View)).toHaveLength(2);
        expect(wrapper.find(TouchableHighlight)).toHaveLength(5);
        expect(wrapper.find(Text)).toHaveLength(5);
        expect(wrapper.find(Image)).toHaveLength(1);
    });

    it ("Method test", () => {
        const {getByTestId, getByType} = rendered;
        const categoryStrings = strings.applianceInfo.categories;
        const categoryPanel = getByType(ApplianceCategoryPanel);
        const plumbing = getByTestId('click-plumbing');
        const le = getByTestId('click-LE');
        const hvac = getByTestId('click-HVAC');
        const ga = getByTestId('click-GA');
        
        fireEvent.press(plumbing);
        expect(categoryPanel.instance.state.selectedCategoryString).toBe(categoryStrings.PLUMBING);
        fireEvent.press(le);
        expect(categoryPanel.instance.state.selectedCategoryString).toBe(categoryStrings.LE);
        fireEvent.press(hvac);
        expect(categoryPanel.instance.state.selectedCategoryString).toBe(categoryStrings.HVAC);
        fireEvent.press(ga);
        expect(categoryPanel.instance.state.selectedCategoryString).toBe(categoryStrings.GA);

        expect(spyFunc.mock.calls).toHaveLength(4);
        expect(spyFunc.mock.results[0].value).toBe(ApplianceType.Plumbing);
        expect(spyFunc.mock.results[1].value).toBe(ApplianceType.LightingAndElectric);
        expect(spyFunc.mock.results[2].value).toBe(ApplianceType.HVAC);
        expect(spyFunc.mock.results[3].value).toBe(ApplianceType.GeneralAppliance);
    });
});