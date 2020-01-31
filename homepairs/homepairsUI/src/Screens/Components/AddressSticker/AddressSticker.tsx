import React from 'react'; //* *For every file that uses jsx, YOU MUST IMPORT REACT  */
import { StyleSheet, Text } from 'react-native';
import { Sticker } from 'homepairs-elements';
import { ColorTheme, FontTheme, ContentWidth, MarginPadding, LightColorTheme} from 'homepairs-base-styles';
import { DarkModeInjectedProps } from '../WithDarkMode/WithDarkMode';

export type AddressStickerProps = DarkModeInjectedProps & {
    address: String
}

function setStyle(colorTheme: ColorTheme) {
    const colors = colorTheme; 
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
    }));
}


export default function AddressSticker(props: AddressStickerProps) {
    const {address, primaryColorTheme} = props;
    const styles = setStyle(primaryColorTheme);
    return(
       <Sticker style={styles.container}>
            <Text style={styles.cityStateText}>San Luis Obispo, CA{" "} 
            <Text style={styles.streetText}>/{` ${address}`}</Text>
            </Text>
        </Sticker>
    );
}

AddressSticker.defaultProps = {
    primaryColorTheme: LightColorTheme,
};