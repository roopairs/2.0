import React from 'react'; //**For every file that uses jsx, YOU MUST IMPORT REACT  */
import { StyleSheet, Text } from 'react-native';
import { Sticker } from 'src/Elements/Elements';
import { ColorTheme, FontTheme, ContentWidth, MarginPadding, LightColorTheme} from 'homepair-base-styles';
import { DarkModeInjectedProps } from '../WithDarkMode/WithDarkMode';

export type AddressStickerProps = DarkModeInjectedProps & {
    address: String
}

function setStyle(colorTheme?: ColorTheme) {
    let colors = (colorTheme == null) ? LightColorTheme : colorTheme 
    return(
        StyleSheet.create({
            container:{
                backgroundColor: colors.veryLightGray,
                width: ContentWidth.thin,
                alignSelf: 'center',
                alignItems: 'center',
                marginVertical: MarginPadding.xlargConst,
                padding: MarginPadding.largeConst,
                borderRadius: 5,
            },
            cityStateText: {
                color: colors.tertiary,
                fontSize: FontTheme.reg,
                fontFamily: FontTheme.primary,
            },
            streetText: {
                fontSize: FontTheme.reg,
                fontFamily: FontTheme.primary,
                color: colors.lightGray,
            },
            textContainer: {
                width: ContentWidth.reg,
                paddingBottom: MarginPadding.mediumConst,
                borderBottomWidth: 1,
            },
    }))
}


export default function AddressSticker(props: AddressStickerProps) {
    let styles = setStyle(props.primaryColorTheme)
    return(
       <Sticker style={styles.container}>
            <Text style={styles.cityStateText}>San Luis Obispo, CA{" "} 
            <Text style={styles.streetText}>/{" " + props.address}</Text>
            </Text>
        </Sticker>
    )
}