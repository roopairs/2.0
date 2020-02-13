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
    const editFunction = jest.fn(onEditProperty);
    const editFunction2 = jest.fn(onEditProperty);
    const editFunction3 = jest.fn(onEditProperty);

    const wrapper = shallow(<EditPropertyModalBase {...props} onChangeModalVisibility={modalFunction} onEditProperty={editFunction}/>);
    const rendered = renderer.create(<EditPropertyModalBase {...props} onChangeModalVisibility={modalFunction} onEditProperty={editFunction}/>);
    const rendered1 = render(<EditPropertyModalBase {...props} onChangeModalVisibility={modalFunction2} onEditProperty={editFunction2}/>);
    const rendered2 = render(<EditPropertyModalBase {...props} onChangeModalVisibility={modalFunction3} onEditProperty={editFunction3}/>);

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