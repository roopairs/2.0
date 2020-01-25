import React from 'react';
import {
    TouchableOpacity,
    Text,
    View,
    ViewStyle,
    TextStyle,
    StyleSheet,
    Image,
    ImageStyle,
    ImageSourcePropType,
} from 'react-native';
import { roopairsLogo } from 'homepair-images';
import HomePairColors from 'homepair-colors';

export type LoginButtonProps = {
    name?: String;
    onClick?: () => any;
    image?: ImageSourcePropType;
    imageStyle?: ImageStyle;
    containerStyle?: ViewStyle;
    buttonStyle?: ViewStyle;
    buttonTextStyle?: TextStyle;
};

export default function LoginButton(props: LoginButtonProps) {
    const {
        name,
        onClick,
        image,
        imageStyle,
        containerStyle,
        buttonStyle,
        buttonTextStyle,
    } = props;

    function onPress() {
        onClick();
    }

    return (
        <View style={containerStyle}>
            <TouchableOpacity style={buttonStyle} onPress={onPress}>
                <Image style={imageStyle} source={image} />
                <Text style={buttonTextStyle}>{name}</Text>
            </TouchableOpacity>
        </View>
    );
}

const DefaultLoginButtonStyles = StyleSheet.create({
    container: {
        flex: 2,
        alignSelf: 'center',
        justifyContent: 'center',
        paddingHorizontal: 10,
        minHeight: 50,
    },
    imageStyle: {
        width: 40,
        height: 40,
        resizeMode: 'contain',
    },
    button: {
        alignItems: 'center',
        backgroundColor: 'transparent',
        flexDirection: 'row',
        padding: 10,
        maxWidth: 300,
        minWidth: 200,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: HomePairColors.LightModeColors.roopairs,
    },
    signUpButtonText: {
        color: HomePairColors.LightModeColors.roopairs,
        fontSize: 15,
        alignSelf: 'center',
    },
});

LoginButton.defaultProps = {
    name: '',
    onClick: () => {},
    image: roopairsLogo,
    imageStyle: DefaultLoginButtonStyles.imageStyle,
    containerStyle: DefaultLoginButtonStyles.container,
    buttonStyle: DefaultLoginButtonStyles.button,
    buttonTextStyle: DefaultLoginButtonStyles.signUpButtonText,
};
