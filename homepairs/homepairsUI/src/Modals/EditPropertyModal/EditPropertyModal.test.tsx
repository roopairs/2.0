/* eslint-disable react/jsx-props-no-spreading */

import { shallow} from "enzyme";
import * as React from "react";
import {InputForm, Card, GoogleInputForm, ThinButton} from 'homepairs-elements';
import {fireEvent, render} from "react-native-testing-library";
import {EditPropertyState, Property} from 'homepairs-types';
import { NavigationStackProp } from 'react-navigation-stack';
import { prepareNavigationMock } from 'homepairs-test';
import { TextInput, ScrollView, View } from 'react-native';
import {HelperText} from 'react-native-paper';
import {NavigationRouteHandler} from 'homepairs-routes';
import EditPropertyModalBase from "./EditPropertyModalBase";


type Props = NavigationStackProp & EditPropertyDispatchProps & EditPropertyState;


export type EditPropertyDispatchProps = {
    onEditProperty: (newProperty: Property, info: EditPropertyState, navigation: NavigationRouteHandler) => void
}

const [mockStackNavigation, navigationStackSpyFunction] = prepareNavigationMock();
const props : Props = {
    navigation: mockStackNavigation,
    onEditProperty: undefined,
    email: undefined, 
    index: undefined, 
    oldProp: {
        streetAddress: '123 Testing St.', 
        state: 'CA', 
        city: 'San Luis Obispo', 
        bedrooms: Number(0), 
        bathrooms: Number(0), 
        tenants: Number(0),
    }, 
    roopairsToken: undefined,
};

describe("Edit Property Modal", () => {
    const onEditProperty: (newProperty: Property, info: EditPropertyState, 
        navigation: NavigationStackProp) => void = 
        () => {return mockStackNavigation.navigate('onCreate is invoked');};
    const editFunction = jest.fn(onEditProperty);
    const editFunction2 = jest.fn(onEditProperty);
    const editFunction3 = jest.fn(onEditProperty);
    const editFunction4 = jest.fn(onEditProperty);

    const wrapper = shallow(<EditPropertyModalBase {...props} onEditProperty={editFunction}/>);
    const rendered1 = render(<EditPropertyModalBase {...props} onEditProperty={editFunction2}/>);
    const rendered2 = render(<EditPropertyModalBase {...props} onEditProperty={editFunction3}/>);
    const rendered3 = render(<EditPropertyModalBase {...props} onEditProperty={editFunction4}/>);

    beforeEach(() => {
        navigationStackSpyFunction.mockClear();
    });

    it("Test for proper components", () => {
        expect(wrapper.find(GoogleInputForm)).toHaveLength(1);
        expect(wrapper.find(InputForm)).toHaveLength(3);
        expect(wrapper.find(Card)).toHaveLength(1);
        expect(wrapper.find(ScrollView)).toHaveLength(1);
        expect(wrapper.find(View)).toHaveLength(1);
        expect(wrapper.find(HelperText)).toHaveLength(1);
        expect(wrapper.find(ThinButton)).toHaveLength(1);
    });

    it ("Test validate forms", () => {
        const {getAllByType, getByType, getByTestId} = rendered3;
        const inputs = getAllByType(TextInput);
        const modal = getByType(EditPropertyModalBase);
        const address = inputs[0];
        const tenants = inputs[1];
        const bedrooms = inputs[2];
        const bathrooms = inputs[3];

        fireEvent.changeText(address, '');
        fireEvent.changeText(tenants, 'asdf');
        fireEvent.changeText(bedrooms, 'asdf');
        fireEvent.changeText(bathrooms, 'asdf');

        fireEvent.press(getByTestId('click-thin-button'));
        expect(modal.instance.validateForms()).toBeFalsy();
        expect(navigationStackSpyFunction).toHaveBeenCalledTimes(0);

        fireEvent.changeText(address, '123 Testing St.');
        fireEvent.changeText(tenants, '5');
        fireEvent.changeText(bedrooms, '4');
        fireEvent.changeText(bathrooms, '2');

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
        expect(editFunction3).toHaveBeenCalledTimes(1);
        expect(navigationStackSpyFunction).toHaveBeenCalledTimes(1);

        const inputs = getAllByType(TextInput);
        const address = inputs[0];
        const tenants = inputs[1];
        const bedrooms = inputs[2];
        const bathrooms = inputs[3];

        fireEvent.changeText(address, '123 Testing St.');
        fireEvent.changeText(tenants, '5');
        fireEvent.changeText(bedrooms, '4');
        fireEvent.changeText(bathrooms, '2');

        fireEvent.press(getByTestId('click-thin-button'));
        expect(editFunction3).toHaveBeenCalledTimes(2);
        expect(navigationStackSpyFunction).toHaveBeenCalledTimes(2);
        expect(navigationStackSpyFunction).toHaveBeenCalledWith('onCreate is invoked');

    });
});