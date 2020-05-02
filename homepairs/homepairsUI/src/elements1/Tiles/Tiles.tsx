import React from 'react';
import { 
    View,
    StyleSheet,
    Image,
    Text,
} from 'react-native';
import {styles, textStyleBase} from './styles';


export type ImageTileProps = {
    /**
     * Used to indicate the object during testing
     */
    testID?: string,

    /**
     * The bitmap image used for the image 
     */
    image: any;

    /**
     * Optional enlarge to use render a larger tile (web)
     */
    enlarge?: boolean;

}

export type TextTileProps = {
    /**
     * Used to indicate the object during testing
     */
    testID?: string,

    /**
     * The bitmap image used for the image 
     */
    text: string;

    /**
     * Define the font size of the text 
     */
    fontSize?: number;

    adjustFontSizeToFit?: boolean;

}

/**
 * ------------------------------------------------------------
 * Image Tiles
 * ------------------------------------------------------------
 * A small unit that holds the image of a bitmap and is formatted in the shape 
 * of a rounded tile. This will often been seen on serviceProvider information 
 * or the top of the Service Requests page.
 * 
 * @param {ImageileProps} props 
 */
export function ImageTile(props:ImageTileProps){
    const {image, enlarge} = props;
    return (
        <View style={enlarge ? styles.imageTileContainerLarge : styles.imageTileContainer}>
            <Image source={image} style={styles.imageStyle}/>
        </View>
    );
}

ImageTile.defaultProps= {
    testID: 'image-tile',
    enlarge: false,
};


/**
 * ------------------------------------------------------------
 * Text Tile
 * ------------------------------------------------------------
 * A small unit that holds a string and is formatted in the shape 
 * of a rounded tile. This can be used for the hamburger menu or for 
 * the add provider button for the service provider flat list
 * 
 * @param {TextTileProps} props 
 */
export function TextTile(props:TextTileProps){
    const {text, fontSize, adjustFontSizeToFit} = props;
    const textStyle = {...textStyleBase, fontSize};
    const styleSheet = StyleSheet.create({textStyle});
    return (
        <View style={styles.textTileContainer}>
            <Text style={styleSheet.textStyle} adjustsFontSizeToFit={adjustFontSizeToFit}>{text}</Text>
        </View>
    );
}

TextTile.defaultProps= {
    testID: 'text-tile',
    fontSize: 30,
    adjustFontSizeToFit: false,
};