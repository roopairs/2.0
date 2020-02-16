/* eslint-disable react/jsx-props-no-spreading */

import { shallow} from "enzyme";
import * as React from "react";
import {InputForm, Card} from 'homepairs-elements';
import {fireEvent, render} from "react-native-testing-library";
import { EditPropertyModalBase } from "homepairs-components";
import {EditPropertyState, Property} from 'homepairs-types';
import { NavigationStackProp } from 'react-navigation-stack';
import { mockStackNavigation, navigationStackSpyFunction } from 'tests/fixtures/DummyComponents';
import { TextInput } from 'react-native';


type Props = NavigationStackProp & EditPropertyDispatchProps & EditPropertyState;


export type EditPropertyDispatchProps = {
    onEditProperty: (newProperty: Property, info: EditPropertyState, navigation: NavigationStackProp) => void
}

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
        (newProperty, info, navigation ) => {return navigation.navigate('onCreate is invoked');};
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
        expect(wrapper.find(InputForm)).toHaveLength(6);
        expect(wrapper.find(Card)).toHaveLength(1);
    });

    it ("Test validate forms", () => {
        const {getAllByType, getByType, getByTestId} = rendered3;
        const inputs = getAllByType(TextInput);
        const modal = getByType(EditPropertyModalBase);
        const address = inputs[0];
        const city = inputs[1];
        const state = inputs[2];
        const tenants = inputs[3];
        const bedrooms = inputs[4];
        const bathrooms = inputs[5];

        fireEvent.changeText(address, '');
        fireEvent.changeText(city, '');
        fireEvent.changeText(state, '');
        fireEvent.changeText(tenants, 'asdf');
        fireEvent.changeText(bedrooms, 'asdf');
        fireEvent.changeText(bathrooms, 'asdf');

        fireEvent.press(getByTestId('click-thin-button'));
        expect(modal.instance.validateForms()).toBeFalsy();
        expect(navigationStackSpyFunction).toHaveBeenCalledTimes(0);

        fireEvent.changeText(address, '123 Testing St.');
        fireEvent.changeText(city, 'San Luis Obispo');
        fireEvent.changeText(state, 'CA');
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
        expect(navigationStackSpyFunction).toHaveBeenCalledTimes(1);

        const inputs = getAllByType(TextInput);
        const address = inputs[0];
        const city = inputs[1];
        const state = inputs[2];
        const tenants = inputs[3];
        const bedrooms = inputs[4];
        const bathrooms = inputs[5];

        fireEvent.changeText(address, '123 Testing St.');
        fireEvent.changeText(city, 'San Luis Obispo');
        fireEvent.changeText(state, 'CA');
        fireEvent.changeText(tenants, '5');
        fireEvent.changeText(bedrooms, '4');
        fireEvent.changeText(bathrooms, '2');

        fireEvent.press(getByTestId('click-thin-button'));
        expect(navigationStackSpyFunction).toHaveBeenCalledTimes(2);
        expect(navigationStackSpyFunction).toHaveBeenCalledWith('onCreate is invoked');

    });
});