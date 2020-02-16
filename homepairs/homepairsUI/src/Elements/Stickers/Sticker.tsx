import React, { ReactElement } from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';

export type StickerProps = {
    /** 
     * React elements passed into the sticker to be rendered with a background
     */
    children?: ReactElement[] | ReactElement;
    style?: ViewStyle;
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgba(0,0,0,.25)',
        width: '90%',
        alignSelf: 'center',
        alignItems: 'center',
        marginVertical: 30,
        padding: 20,
        borderRadius: 5,
    },
});

/**
 * ------------------------------------------------------------
 * Sticker
 * ------------------------------------------------------------
 * A simple component whose purpose is to present text with a background.
 * It takes in a regular viewStyle and is capable of rendering ReactComponents
 * in standard React fashion.
 * */
export default function Sticker(props: StickerProps) {
    const { style, children } = props;
    return <View style={style}>{children}</View>;
}

Sticker.defaultProps = {
    children: <></>,
    style: styles.container,
};
