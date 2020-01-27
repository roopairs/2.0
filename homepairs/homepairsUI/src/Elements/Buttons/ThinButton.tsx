import React from 'react';
import {
    TouchableOpacity,
    Text,
    View,
    ViewStyle,
    TextStyle,
    StyleSheet,
} from 'react-native';

export type ThinButtonProps = {
    key?: any;
    name?: String;
    onClick?: () => any;
    onPressIn?: () => any;
    onPressOut?: () => any;
    containerStyle?: ViewStyle;
    buttonStyle?: ViewStyle;
    buttonTextStyle?: TextStyle;
};

/* *
 * ------------------------------------------------------------
 * Thin Button
 * ------------------------------------------------------------
 * A component that renders a clickable space
 * with a border and text. This element is intended to be clicked
 * to invoke a specific function. onClick, onPressIn, and onPressOut
 * should have some callback that can communicate with the parent the
 * next steps to take.
 *
 * */
export default function ThinButton(props: ThinButtonProps) {
    // This function will call the parent callback function.
    const {
        name,
        onClick,
        onPressIn,
        onPressOut,
        containerStyle,
        buttonStyle,
        buttonTextStyle,
    } = props;

    function onPress() {
        onClick();
    }

    return (
        <View style={containerStyle}>
            <TouchableOpacity
                style={buttonStyle}
                onPress={onPress}
                onPressIn={onPressIn}
                onPressOut={onPressOut}
            >
                <Text style={buttonTextStyle}>{name}</Text>
            </TouchableOpacity>
        </View>
    );
}

const DefaultThinButtonStyles = StyleSheet.create({
    container: {
        flex: 1,
        alignSelf: 'center',
        justifyContent: 'center',
        paddingHorizontal: 10,
        minHeight: 50,
    },
    button: {
        alignItems: 'center',
        backgroundColor: 'transparent',
        padding: 10,
        maxWidth: 300,
        minWidth: 200,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#B3C0C2',
    },
    signUpButtonText: {
        color: '#B3C0C2',
        fontSize: 16,
        alignSelf: 'center',
    },
});

ThinButton.defaultProps = {
    name: '',
    onClick: () => {},
    onPressIn: () => {},
    onPressOut: () => {},
    containerStyle: DefaultThinButtonStyles.container,
    buttonStyle: DefaultThinButtonStyles.button,
    buttonTextStyle: DefaultThinButtonStyles.signUpButtonText,
};

export function renderThinButton(thinButtonProps: ThinButtonProps) {
    const {
        key,
        name,
        onClick,
        onPressIn,
        onPressOut,
        containerStyle,
        buttonStyle,
        buttonTextStyle,
    } = thinButtonProps;
    return (
        <ThinButton
            key={key}
            name={name}
            onClick={onClick}
            onPressIn={onPressIn}
            onPressOut={onPressOut}
            containerStyle={containerStyle}
            buttonStyle={buttonStyle}
            buttonTextStyle={buttonTextStyle}
        />
    );
}
