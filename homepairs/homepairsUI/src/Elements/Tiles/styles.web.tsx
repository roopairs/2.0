import * as BaseStyles from 'homepairs-base-styles';
import {StyleSheet} from 'react-native';

const textStyleBase = {
    alignSelf: 'center',
    textAlign: 'center',
    color: BaseStyles.LightColorTheme.veryLightGray,
    fontFamily: BaseStyles.FontTheme.tertiary,
};

const styles = StyleSheet.create({
    imageTileContainer: {
        aspectRatio: 1,
        justifyContent: 'center',
        height: 70,
        width: 70,
        borderRadius: 7.5,
        borderWidth: 1,
        borderColor: BaseStyles.LightColorTheme.veryLightGray,
        backgroundColor: BaseStyles.LightColorTheme.secondary,
    },
    imageStyle: {
        height: '100%',
        width: '100%',
        aspectRatio: 1,
        resizeMode: 'cover',
        borderRadius: 5,
        backgroundColor: BaseStyles.LightColorTheme.secondary,   
    },
    textTileContainer: {
        aspectRatio: 1, // Use this to make the component dimensions relative to its height/width
        justifyContent: 'center',
        height: 70,
        width: 70,
        borderRadius: 7.5,
        borderWidth: 1,
        borderColor: BaseStyles.LightColorTheme.secondary,
        backgroundColor: "#919799",
    },
});

export {styles, textStyleBase};