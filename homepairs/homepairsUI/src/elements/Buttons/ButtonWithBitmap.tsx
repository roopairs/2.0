import React from 'react';
import { isNullOrUndefined } from 'src/utility';
import * as BaseStyles from 'homepairs-base-styles';
import { 
    View,
    ImageSourcePropType, 
    ImageStyle,
    ViewStyle,
    TextStyle,
    StyleSheet,
    Image,
    TouchableOpacity,
    Text,
} from 'react-native';


type Props = {
    /**
     * Used to indicate the object during testing
     */
    testID?: string,

    /**
     * The bitmap image used for the image 
     */
    image: ImageSourcePropType;

    /**
     * Optional style to format the image. Otherwise, a default style will be 
     * used instead
     */
    imageStyle?: ImageStyle;

    /**
     * Optional name use for the button
     */
    name?: string

    /**
     * Style for the area surround the contents of the button. Here, you would define the border
     */
    containerStyle?: ViewStyle;

    /**
     * The style for the innards of a button. Here, you define the format within the border 
     */
    buttonStyle?: ViewStyle;

    /**
     * The style of the text rendered if applicable 
     */
    buttonTextStyle?: TextStyle;

    /**
     * Callback function for when this button has been pressed.
     */
    onPress: (...args) => any;

}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        width:'30%',
        paddingHorizontal: 10,
    },
    imageStyle: {
        width: 50,
        height: 50,
        resizeMode: 'contain',
    },
    button: {
        alignItems: 'center',
        backgroundColor: 'transparent',
        flexDirection: 'column',
        padding: 10,
        minWidth: 100,
        minHeight: 100,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: BaseStyles.LightColorTheme.gray,
        shadowColor: 'black',
        shadowRadius: 3,
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: .2,
        elevation: 2,
    },
    buttonText: {
        marginTop: BaseStyles.MarginPadding.smallConst,
        color: BaseStyles.LightColorTheme.gray,
        fontSize: 15,
        alignSelf: 'center',
        textAlign: 'center',
    },
});


/**
 * ------------------------------------------------------------
 * Button With Bitmap
 * ------------------------------------------------------------
 * A small button whom functions akin to a thin button. It, however, has a image rendered along 
 * with optional text. Use this element if you need an image rendered as a button. 
 * @param {Props} props 
 */
export default function ButtonWithBitmap(props:Props){
    const {image, imageStyle, name, containerStyle, buttonStyle, buttonTextStyle, onPress} = props;

    return (
        <View style={containerStyle}>
            <TouchableOpacity style={buttonStyle} onPress={onPress}>
                <Image source={image} style={imageStyle}/>
                {isNullOrUndefined(name) ? <></> : <Text style={buttonTextStyle}>{name}</Text>}
            </TouchableOpacity>
        </View>
    );
}

ButtonWithBitmap.defaultProps= {
    testID: 'button-with-bitmap',
    containerStyle: styles.container,
    imageStyle: styles.imageStyle,
    name: null,
    buttonStyle: styles.button,
    buttonTextStyle: styles.buttonText,
};

