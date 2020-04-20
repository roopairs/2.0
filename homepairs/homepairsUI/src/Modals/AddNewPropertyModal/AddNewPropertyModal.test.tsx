/* eslint-disable react/jsx-props-no-spreading */

import { shallow} from "enzyme";
import * as React from "react";
import {InputForm, Card, GoogleInputForm, ThinButton } from 'homepairs-elements';
import {fireEvent, render} from "react-native-testing-library";
import {AddNewPropertyState, Property} from 'homepairs-types';
import { mockStackNavigation, navigationStackSpyFunction} from 'homepairs-test';
import { NavigationStackScreenProps, NavigationStackProp } from 'react-navigation-stack';
import { TextInput, View, ScrollView } from 'react-native';
import {HelperText} from 'react-native-paper';
import AddNewPropertyModalBase from "./AddNewPropertyModalBase";

type Props = ModalInjectedProps &
    NavigationStackScreenProps &
    AddNewPropertyDispatchProps &
    AddNewPropertyState;

export type ModalInjectedProps = {
    onChangeModalVisibility: (isVisible?: boolean) => void;
};

export type AddNewPropertyDispatchProps = {
    onCreateProperty: (newProperty: Property, info: AddNewPropertyState, setInitialState: () => void, navigation: NavigationStackProp) => void
}

const props : Props = {
    onCreateProperty: undefined,
    email: undefined, 
    roopairsToken: undefined,
    navigation: mockStackNavigation,
};

describe("Add New Property Modal", () => {
    const onCreateProperty: (newProperty: any, info: any, 
        setInitialState: any, navigation: any) => void = () => {return mockStackNavigation.navigate('onCreate is invoked');};
    const createFunction = jest.fn(onCreateProperty);
    const createFunction2 = jest.fn(onCreateProperty);
    const createFunction3 = jest.fn(onCreateProperty);
    const createFunction4 = jest.fn(onCreateProperty);
    
    const wrapper = shallow(<AddNewPropertyModalBase {...props} onCreateProperty={createFunction}/>);
    const rendered1 = render(<AddNewPropertyModalBase {...props} onCreateProperty={createFunction2}/>);
    const rendered2 = render(<AddNewPropertyModalBase {...props} onCreateProperty={createFunction3}/>);
    const rendered3 = render(<AddNewPropertyModalBase {...props} onCreateProperty={createFunction4}/>);

    beforeEach(() => {
        navigationStackSpyFunction.mockClear();
    });

    it("Test for proper components", () => {
        expect(wrapper.find(GoogleInputForm)).toHaveLength(1);
        expect(wrapper.find(InputForm)).toHaveLength(3);
        expect(wrapper.find(Card)).toHaveLength(1);
        expect(wrapper.find(ScrollView)).toHaveLength(1);
        expect(wrapper.find(View)).toHaveLength(2);
        expect(wrapper.find(HelperText)).toHaveLength(1);
        expect(wrapper.find(ThinButton)).toHaveLength(1);
    });

    it ("Test validate forms", () => {
        const {getByType, getAllByType} = rendered3;
        const inputs= getAllByType(TextInput);
        const modal = getByType(AddNewPropertyModalBase);
        const address = inputs[0];
        const tenants = inputs[1];
        const bedrooms = inputs[2];
        const bathrooms = inputs[3];

        fireEvent.changeText(address, '');
        fireEvent.changeText(tenants, 'asdf');
        fireEvent.changeText(bedrooms, 'asdf');
        fireEvent.changeText(bathrooms, 'asdf');

        
        expect(modal.instance.validateForms()).toBeFalsy();

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
        expect(createFunction3).toHaveBeenCalledTimes(0);
        expect(navigationStackSpyFunction).toHaveBeenCalledTimes(0);

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
        expect(createFunction3).toHaveBeenCalledTimes(1);
        expect(navigationStackSpyFunction).toHaveBeenCalledTimes(1);

    });

});