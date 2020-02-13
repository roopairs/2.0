/**
 * @jest-environment jsdom
 */

import * as React from "react";
import { View, Text, Button, Platform, Dimensions} from 'react-native';
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
    
    it('Testing Mobile Devices' , () => {
        Platform.OS = 'ios';

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


        rootComponent.instance.onChangeModalVisibility(true);
        fireEvent.press(baseComponent);
        fireEvent.press(modalComponent);

        expect(modalVisibilitySpy).toHaveBeenCalledWith(false);
        expect(modalVisibilitySpy).toHaveBeenCalledWith(true);
        expect(modalVisibilitySpy).toHaveBeenCalledTimes(3);
    });

    /*
    it('Testing Web Platform' , () => {
        // You can change the platform by assigning it a new string
        Platform.OS = 'web';
        const eventListenerMock = jest.fn((type:string, handler:any) => {handler();});
        jest.mock('Dimensions', () => {
            return {
                get: jest.fn(() => {
                    return {
                        height: 1334, 
                        width: 750,
                    };}),
                addEventListener: eventListenerMock,
                removeEventListener: null,//eventListenerMock,
            };
        });


        const TestComponent = withModal(TestBaseComponent, TestModalComponent);
        // Needed to use two different libraries to spy on some of the functions. 
        const rendered = render(<TestComponent testID='test'/>);
        const {getAllByTestId, getByTestId, queryAllByTestId, getByType} = rendered;

        const rootComponent = getByTestId('test');
        const modalVisibilitySpy = jest.spyOn(rootComponent.instance, 'onChangeModalVisibility');
        const updateStyleSpy = jest.spyOn(rootComponent.instance, 'updateStyles');

        // We expect the Dimensions.addEventListener to have been called onces with the updateStyle()
        //expect(eventListenerMock).toHaveBeenCalledTimes(1);
        //expect(Dimensions.addEventListener).toHaveBeenCalledWith(updateStyleSpy);

        // Here is an example of how we can mock the Dimensions module
        jest.mock('Dimensions', () => {
            return {
                get: jest.fn(() => {
                    return {
                        height: 400, 
                        width: 750,
                    };
                }),
            };
        });

        console.log(Dimensions.get('window'));
        console.log(Platform.OS);

        rendered.update(<TestComponent testID='test'/>);
    
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

        // Check if the callback is still being called on a change of event
        rendered.unmount();

    });
    */
});