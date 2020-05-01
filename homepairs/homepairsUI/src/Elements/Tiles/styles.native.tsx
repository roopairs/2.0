import * as BaseStyles from 'homepairs-base-styles';
import {StyleSheet, Platform} from 'react-native';

const textStyleBaseAndroid = {
    fontFamily: BaseStyles.FontTheme.tertiary,
    textAlign: 'center',
    textAlignVertical: 'center',
    color: BaseStyles.LightColorTheme.veryLightGray,
};

const textStyleBaseIOS = {
    fontFamily: BaseStyles.FontTheme.tertiary,
    textAlign: 'center',
    alignSelf: 'center',
    color: BaseStyles.LightColorTheme.veryLightGray,
};

const textStyleBase = Platform.OS === 'android' ? 
    textStyleBaseAndroid : textStyleBaseIOS;

const styles = StyleSheet.create({
    imageTileContainer: {
        flex:1,
        alignItems: 'center',
        justifyContent: 'center',
        aspectRatio: 1,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: BaseStyles.LightColorTheme.veryLightGray,
        backgroundColor: BaseStyles.LightColorTheme.secondary,
    },
    imageTileContainerLarge: {
        flex:1,
        alignItems: 'center',
        justifyContent: 'center',
        aspectRatio: 1,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: BaseStyles.LightColorTheme.veryLightGray,
        backgroundColor: BaseStyles.LightColorTheme.secondary,
    },
    imageStyle: {
        aspectRatio: 1,
        flex: 1,
        resizeMode: 'cover',
        borderRadius: 5,
        backgroundColor: BaseStyles.LightColorTheme.secondary,
    },
    textTileContainer: {
        flex:1,
        aspectRatio: 1, // Use this to make the component dimensions relative to its height/width
        backgroundColor: "#919799",
        borderColor: BaseStyles.LightColorTheme.secondary,
        borderWidth: 1,
        borderRadius: 5,
        justifyContent: 'center',
        padding: 4,
    },
});

export {styles, textStyleBase};
