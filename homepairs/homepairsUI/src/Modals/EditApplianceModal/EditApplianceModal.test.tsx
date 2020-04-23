/* eslint-disable react/jsx-props-no-spreading */

import { shallow} from "enzyme";
import * as React from "react";
import {InputForm, Card, ApplianceCategoryPanel, ThinButton} from 'homepairs-elements';
import {fireEvent, render} from "react-native-testing-library";
import {Appliance} from 'homepairs-types';
import { mockStackNavigation, navigationStackSpyFunction} from 'homepairs-test';
import { NavigationStackScreenProps, NavigationStackProp } from 'react-navigation-stack';
import { TextInput, View, ScrollView, Text } from 'react-native';
import {HelperText} from 'react-native-paper';
import { EditApplianceModalBase } from "./EditApplianceModal";

jest.mock('homepairs-images');

export type EditApplianceDispatchProps = {
    onEditAppliance: (newAppliance: Appliance,
         displayError: (msg: string) => void, navigation: NavigationStackProp) => void
}

type Props = NavigationStackScreenProps &
    EditApplianceDispatchProps;

const props : Props = {
    onEditAppliance: undefined,
    navigation: mockStackNavigation,
    theme: undefined, 
    screenProps: undefined,
};

describe("Edit Appliance Modal", () => {
    const onEditAppliance: (newProperty: any, info: any, 
        setInitialState: any, navigation: any) => void = () => {return mockStackNavigation.navigate('onEditAppliance is invoked');};
    const createFunction = jest.fn(onEditAppliance);
    const createFunction2 = jest.fn(onEditAppliance);
    const createFunction3 = jest.fn(onEditAppliance);
    const createFunction4 = jest.fn(onEditAppliance);
    
    const wrapper = shallow(<EditApplianceModalBase {...props} onEditAppliance={createFunction}/>);
    const rendered1 = render(<EditApplianceModalBase {...props} onEditAppliance={createFunction2}/>);
    const rendered2 = render(<EditApplianceModalBase {...props} onEditAppliance={createFunction3}/>);
    const rendered3 = render(<EditApplianceModalBase {...props} onEditAppliance={createFunction4}/>);

    beforeEach(() => {
        navigationStackSpyFunction.mockClear();
    });

    it("Test for proper components", () => {
        expect(wrapper.find(InputForm)).toHaveLength(5);
        expect(wrapper.find(ApplianceCategoryPanel)).toHaveLength(1);
        expect(wrapper.find(Text)).toHaveLength(1);
        expect(wrapper.find(Card)).toHaveLength(1);
        expect(wrapper.find(ScrollView)).toHaveLength(1);
        expect(wrapper.find(View)).toHaveLength(2);
        expect(wrapper.find(HelperText)).toHaveLength(1);
        expect(wrapper.find(ThinButton)).toHaveLength(1);
    });

    it ("Test validate forms", () => {
        const {getByType, getAllByType} = rendered3;
        const inputs = getAllByType(TextInput);
        const modal = getByType(EditApplianceModalBase);
        const name = inputs[0];
        const manufacturer = inputs[1];
        const modelNum = inputs[2];
        const serialNum = inputs[3];
        const location = inputs[4];

        fireEvent.changeText(name, '');
        fireEvent.changeText(manufacturer, 'asdf');
        fireEvent.changeText(modelNum, 'asdf');
        fireEvent.changeText(serialNum, 'asdf');
        fireEvent.changeText(location, '2');

        
        expect(modal.instance.validateForms()).toBeFalsy();

        fireEvent.changeText(name, '123 Testing St.');
        fireEvent.changeText(manufacturer, '5');
        fireEvent.changeText(modelNum, '4');
        fireEvent.changeText(serialNum, '2');
        fireEvent.changeText(location, '2');

        expect(modal.instance.validateForms()).toBeTruthy();

    });

    it("Test behavior when closed", () => {
        const {getByTestId} = rendered1;
        fireEvent.press(getByTestId('click-card-close-button'));
        expect(navigationStackSpyFunction).toHaveBeenCalled();
    });

    it("Test when submitted behavior", () => {
        const {getByTestId, getAllByType} = rendered2;

        fireEvent.press(getByTestId('click-thin-button'));
        expect(createFunction3).toHaveBeenCalledTimes(1);
        expect(navigationStackSpyFunction).toHaveBeenCalledTimes(1);

        const inputs = getAllByType(TextInput);
        const name = inputs[0];
        const manufacturer = inputs[1];
        const modelNum = inputs[2];
        const serialNum = inputs[3];
        const location = inputs[4];

        fireEvent.changeText(name, '123 Testing St.');
        fireEvent.changeText(manufacturer, '5');
        fireEvent.changeText(modelNum, '4');
        fireEvent.changeText(serialNum, '2');
        fireEvent.changeText(location, '2');

        fireEvent.press(getByTestId('click-thin-button'));
        expect(createFunction3).toHaveBeenCalledTimes(2);
        expect(navigationStackSpyFunction).toHaveBeenCalledTimes(2);

    });

});