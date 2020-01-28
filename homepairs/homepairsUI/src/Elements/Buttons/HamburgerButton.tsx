import React from 'react';
import { HomePairFonts } from 'homepairs-fonts';
import * as BaseStyles from 'homepairs-base-styles';
import {
    TouchableOpacity,
    Text,
    View,
    StyleSheet,
    Platform,
} from 'react-native';

export type HamburgerButtonProps = {
    key?: any;
    onClick?: () => any;
    onPressIn?: () => any;
    onPressOut?: () => any;
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 40,
    },
    button: {
        flex: 1,
        justifyContent: 'center',
        alignSelf: 'center',
        backgroundColor: 'transparent',
        paddingLeft: 2,
        borderRadius: 8,
        maxHeight: 50,
        maxWidth: 50,
        borderWidth: 1,
        borderColor: '#B3C0C2',
    },
    buttonText: {
        flex:1,
        fontFamily: HomePairFonts.nunito_extrabold,
        color: '#B3C0C2',
        fontSize: Platform.OS === 'web' ? 40 : 60,
    },
});

/* *
 * ------------------------------------------------------------
 * Hamburger Button
 * ------------------------------------------------------------
 *
 * */
export default function ThinButton(props: HamburgerButtonProps) {
    // This function will call the parent callback function.
    const {
        onClick,
        onPressIn,
        onPressOut,
    } = props;

    const {container, button, buttonText} = styles;
    function onPress() {
        onClick();
    }

    return (
        <View style={container}>
            <TouchableOpacity
                testID='click-hamburger-button'
                style={button}
                onPress={onPress}
                onPressIn={onPressIn}
                onPressOut={onPressOut}
            >
                <Text style={buttonText}>&#8801;</Text>
            </TouchableOpacity>
        </View>
    );
}

ThinButton.defaultProps = {
    onClick: () => {},
    onPressIn: () => {},
    onPressOut: () => {},
};

