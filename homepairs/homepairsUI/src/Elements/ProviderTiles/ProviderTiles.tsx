import React from 'react';
import * as BaseStyles from 'homepairs-base-styles';
import { 
    View,
    ImageSourcePropType, 
    StyleSheet,
    Image,
} from 'react-native';


export type ProviderTilesProps = {
    /**
     * Used to indicate the object during testing
     */
    testID?: string,

    /**
     * The bitmap image used for the image 
     */
    image: ImageSourcePropType;

}

const styles = StyleSheet.create({
    container: {
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 5,
        minHeight: 65,
        maxHeight: 75,
        minWidth: 65,
        maxWidth: 75,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: BaseStyles.LightColorTheme.veryLightGray,
        backgroundColor: BaseStyles.LightColorTheme.secondary,
    },
    imageStyle: {
        height: 55,
        width: 55,
        resizeMode: 'contain',
        borderRadius: 5,
        backgroundColor: BaseStyles.LightColorTheme.secondary,
    },
});


/**
 * ------------------------------------------------------------
 * Provider Tiles
 * ------------------------------------------------------------
 * A small unit that holds the image of a bitmap and is formatted in the shape 
 * of a rounded tile. This will often been seen on serviceProvider information 
 * or the top of the Service Requests page.
 * 
 * @param {ProviderTilesProps} props 
 */
export function ProviderTiles(props:ProviderTilesProps){
    const {image} = props;
    return (
        <View style={styles.container}>
            <Image source={image} style={styles.imageStyle}/>
        </View>
    );
}

ProviderTiles.defaultProps= {
    testID: 'button-with-bitmap',
};
