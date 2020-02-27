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
    idTest?: string;
    key?: any;
    name?: String;
    onClick?: () => any;
    onPressIn?: () => any;
    onPressOut?: () => any;
    containerStyle?: ViewStyle;
    buttonStyle?: ViewStyle;
    buttonTextStyle?: TextStyle;
};



/**
 * ------------------------------------------------------------
 * Thin Button
 * ------------------------------------------------------------
 * A component that renders a clickable space
 * with a border and text. This element is intended to be clicked
 * to invoke a specific function. onClick, onPressIn, and onPressOut
 * should have some callback that can communicate with the parent the
 * next steps to take.
 * 
 * @param {ThinButtonProps} props 
 */
export default function ThinButton(props: ThinButtonProps) {
    // This function will call the parent callback function.
    const {
        idTest,
        name,
        onClick,
        onPressIn,
        onPressOut,
        containerStyle,
        buttonStyle,
        buttonTextStyle,
    } = props;

    function handleClick() {
        onClick();
    }

    return (
        <View style={containerStyle}>
            <TouchableOpacity
                testID={idTest}
                style={buttonStyle}
                onPress={handleClick}
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
    buttonText: {
        color: '#B3C0C2',
        fontSize: 16,
        alignSelf: 'center',
    },
});

ThinButton.defaultProps = {
    idTest: 'click-thin-button',
    name: '',
    onClick: () => {},
    onPressIn: () => {},
    onPressOut: () => {},
    containerStyle: DefaultThinButtonStyles.container,
    buttonStyle: DefaultThinButtonStyles.button,
    buttonTextStyle: DefaultThinButtonStyles.buttonText,
};

