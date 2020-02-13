/**
 * @jest-environment jsdom
 */

import { shallow} from "enzyme";
import * as React from "react";
import {InputForm, Card} from 'homepairs-elements';
import {fireEvent, render} from "react-native-testing-library";
import renderer from 'react-test-renderer';
import { EditPropertyModalBase } from "homepairs-components";
import {EditPropertyState, Property} from 'homepairs-types';
import {ColorTheme} from 'homepairs-base-styles';


type Props = ModalInjectedProps & DarkModeInjectedProps & EditPropertyDispatchProps & EditPropertyState;

export type ModalInjectedProps = {
    onChangeModalVisibility: (isVisible?: boolean) => void;
};

export type DarkModeInjectedProps = {
    primaryColorTheme?: ColorTheme,
};

export type EditPropertyDispatchProps = {
    onEditProperty: (newProperty: Property, info: EditPropertyState, onChangeModalVisibility: (check: boolean) => void) => void
}



const props : Props = {
    onChangeModalVisibility: undefined,
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
    const onChangeModalVisibility = () => {return 'onChange is invoked';};
    const onEditProperty = () => {return 'onCreate is invoked';};
    const modalFunction = jest.fn(onChangeModalVisibility);
    const modalFunction2 = jest.fn(onChangeModalVisibility);
    const modalFunction3 = jest.fn(onChangeModalVisibility);
    const modalFunction4 = jest.fn(onChangeModalVisibility);
    const editFunction = jest.fn(onEditProperty);
    const editFunction2 = jest.fn(onEditProperty);
    const editFunction3 = jest.fn(onEditProperty);
    const editFunction4 = jest.fn(onEditProperty);

    const wrapper = shallow(<EditPropertyModalBase {...props} onChangeModalVisibility={modalFunction} onEditProperty={editFunction}/>);
    const rendered = renderer.create(<EditPropertyModalBase {...props} onChangeModalVisibility={modalFunction} onEditProperty={editFunction}/>);
    const rendered1 = render(<EditPropertyModalBase {...props} onChangeModalVisibility={modalFunction2} onEditProperty={editFunction2}/>);
    const rendered2 = render(<EditPropertyModalBase {...props} onChangeModalVisibility={modalFunction3} onEditProperty={editFunction3}/>);
    const rendered3 = render(<EditPropertyModalBase {...props} onChangeModalVisibility={modalFunction4} onEditProperty={editFunction4}/>);

    it("Test for proper components", () => {
        expect(wrapper.find(InputForm)).toHaveLength(6);
        expect(wrapper.find(Card)).toHaveLength(1);
    });

    it("Test that methods are being called", () => {
        rendered.root.props.onChangeModalVisibility();
        rendered.root.props.onEditProperty();
        expect(modalFunction.mock.calls).toHaveLength(1);
        expect(editFunction.mock.calls).toHaveLength(1);
    });

    it ("Test validate forms", () => {
        const {getAllByTestId, getByType} = rendered3;
        const inputs = getAllByTestId('userTextInput');
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

        expect(modal.instance.validateForms()).toBeFalsy();

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
        expect(modalFunction.mock.calls).toHaveLength(1);
    });

    it("Test when submitted behavior", () => {
        const {getByTestId} = rendered2;
        fireEvent.press(getByTestId('click-thin-button'));
        expect(modalFunction.mock.calls).toHaveLength(1);
    });
});