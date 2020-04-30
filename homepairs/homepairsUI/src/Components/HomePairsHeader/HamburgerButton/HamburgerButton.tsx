import React from 'react';
import {
    TouchableOpacity,
    View,
    Image,
    Text,
} from 'react-native';
import {hamburger} from 'homepairs-images';
import {styles} from './styles';

export type HamburgerButtonProps = {
    /**
     * Used to find an instance of the component when testing
     */
    testID?: string,

    /**
     * Unique indicator for when many of these instances are created
     */
    key?: any;

    /**
     * Callback button that invokes when a full press/click (click and release) has been invoked
     */
    onClick?: () => any;

    /**
     * Callback button that invokes when a button has been pressed.
     */
    onPressIn?: () => any;

    /**
     * Callback button that invokes when a button has been released from a press/click
     */
    onPressOut?: () => any;
};

 /**
  * ------------------------------------------------------------
  * Hamburger Button
  * ------------------------------------------------------------
  * A simple button that by default, renders a thin button with a 
  * hamburger (congruence) symbol. This is intended to be used with
  * navigation menus.
  *  
  * @param {HamburgerButtonProps} props 
  */
export default function HamburgerButton(props: HamburgerButtonProps) {
    // This function will call the parent callback function.
    const {onClick} = props;

    const {container, button, imageStyle} = styles;
    function onPress() {
        onClick();
    }

    return (
        <View style={container}>
            <TouchableOpacity
                testID='click-hamburger-button'
                style={button}
                onPress={onPress}>
                <Image style={imageStyle} source={hamburger}/>
            </TouchableOpacity>
        </View>
    );
}

HamburgerButton.defaultProps = {
    onClick: () => {},
};

