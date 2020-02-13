/**
 * @jest-environment jsdom
 */

import * as React from "react";
import { View, Text, Button } from "react-native";
import {render, fireEvent} from "react-native-testing-library";
import { ModalInjectedProps, withModal } from 'homepairs-components';


const CLICK_BASE = 'click-base-component';
const CLICK_MODAL = 'click-modal-component';

function TestBaseComponent(props: ModalInjectedProps){
    const {onChangeModalVisibility} = props;
    return <Button testID={CLICK_BASE} title={CLICK_BASE} onPress={() => {onChangeModalVisibility(true);}} />;
}

function TestModalComponent(props: ModalInjectedProps){
    const {onChangeModalVisibility} = props;
    return <Button testID={CLICK_MODAL} title={CLICK_MODAL} onPress={() => {onChangeModalVisibility(false);}} />;
}

describe('With Modal Test',()=>{
    it('Basic Functionality' , () => {
        const TestComponent = withModal(TestBaseComponent, TestModalComponent);
        
        // Needed to use two different libraries to spy on some of the functions. 
        const rendered = render(<TestComponent testID='test'/>);
        const {getAllByTestId, getByTestId, queryAllByTestId, getByType} = rendered;

        const rootComponent = getByTestId('test');

        const modalVisibilitySpy = jest.spyOn(rootComponent.instance, 'onChangeModalVisibility');
        
        const baseComponents = queryAllByTestId(CLICK_BASE);
        const modalComponents = queryAllByTestId(CLICK_MODAL);
        expect(baseComponents).toHaveLength(1);
        expect(modalComponents).toHaveLength(1);


        const baseComponent = getByTestId(CLICK_BASE);
        const modalComponent = getByTestId(CLICK_MODAL);

        //fireEvent.press(modalComponent);

        rootComponent.instance.onChangeModalVisibility(true);
        fireEvent.press(baseComponent);
        fireEvent.press(modalComponent);

        expect(modalVisibilitySpy).toHaveBeenCalledWith(false);
        expect(modalVisibilitySpy).toHaveBeenCalledWith(true);
        expect(modalVisibilitySpy).toHaveBeenCalledTimes(3);

    });
});