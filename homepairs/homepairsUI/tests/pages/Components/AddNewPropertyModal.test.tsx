/**
 * @jest-environment jsdom
 */

import { shallow} from "enzyme";
import * as React from "react";
import {InputForm, Card } from 'homepairs-elements';
import {fireEvent, render} from "react-native-testing-library";
import renderer from 'react-test-renderer';
import { AddNewPropertyModalBase } from "homepairs-components";
import {AddNewPropertyState, Property} from 'homepairs-types';
import {ColorTheme} from 'homepairs-base-styles';


type Props = ModalInjectedProps &
    DarkModeInjectedProps &
    AddNewPropertyDispatchProps &
    AddNewPropertyState;

export type ModalInjectedProps = {
    onChangeModalVisibility: (isVisible?: boolean) => void;
};

export type DarkModeInjectedProps = {
    primaryColorTheme?: ColorTheme,
};

export type AddNewPropertyDispatchProps = {
    onCreateProperty: (newProperty: Property, info: AddNewPropertyState, setInitialState: () => void, onChangeModalVisibility: (check: boolean) => void) => void
};

const props : Props = {
    onChangeModalVisibility: undefined,
    onCreateProperty: undefined,
    email: undefined, 
    roopairsToken: undefined,
};

describe("Add New Property Modal", () => {
    const onChangeModalVisibility = () => {return 'onChange is invoked';};
    const onCreateProperty = () => {return 'onCreate is invoked';};
    const modalFunction = jest.fn(onChangeModalVisibility);
    const modalFunction2 = jest.fn(onChangeModalVisibility);
    const modalFunction3 = jest.fn(onChangeModalVisibility);
    const createFunction = jest.fn(onCreateProperty);
    const createFunction2 = jest.fn(onCreateProperty);
    const createFunction3 = jest.fn(onCreateProperty);

    const wrapper = shallow(<AddNewPropertyModalBase {...props} onChangeModalVisibility={modalFunction} onCreateProperty={createFunction}/>);
    const rendered = renderer.create(<AddNewPropertyModalBase {...props} onChangeModalVisibility={modalFunction} onCreateProperty={createFunction}/>);
    const rendered1 = render(<AddNewPropertyModalBase {...props} onChangeModalVisibility={modalFunction2} onCreateProperty={createFunction2}/>);
    const rendered2 = render(<AddNewPropertyModalBase {...props} onChangeModalVisibility={modalFunction3} onCreateProperty={createFunction3}/>);

    it("Test for proper components", () => {
        expect(wrapper.find(InputForm)).toHaveLength(6);
        expect(wrapper.find(Card)).toHaveLength(1);
    });

    it("Test that methods are being called", () => {
        rendered.root.props.onChangeModalVisibility();
        rendered.root.props.onCreateProperty();
        expect(modalFunction.mock.calls).toHaveLength(1);
        expect(createFunction.mock.calls).toHaveLength(1);
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