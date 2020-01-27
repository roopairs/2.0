import React, { ReactElement } from 'react';
import { StyleSheet, View, ViewStyle} from 'react-native';

export type StickerProps = {
    children?: ReactElement[] | ReactElement,
    style?: ViewStyle,
};


const styles = StyleSheet.create({
    container:{
        backgroundColor: 'rgba(0,0,0,.25)',
        width: '90%',
        alignSelf: 'center',
        alignItems: 'center',
        marginVertical: 30,
        padding: 20,
        borderRadius: 5,
    },
});

export default function Sticker(props: StickerProps) {
    const {style, children} = props;
    return(
       <View style={style}>
            {children}
        </View>
    );
}

Sticker.defaultProps = {
    children: <></>,
    style: styles, 
};