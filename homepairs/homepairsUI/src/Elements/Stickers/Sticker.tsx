import React, { ReactElement } from 'react'; //**For every file that uses jsx, YOU MUST IMPORT REACT  */
import { StyleSheet, View, ViewStyle} from 'react-native';

export type StickerProps = {
    children?: ReactElement[] | ReactElement,
    style?: ViewStyle,
}

export default function Sticker(props: StickerProps) {
    return(
       <View style={(props.style === null) ? styles.container : props.style}>
            {props.children}
        </View>
    )
}

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
})