import React from 'react'; //**For every file that uses jsx, YOU MUST IMPORT REACT  */
import { StyleSheet, Text, View, Platform} from 'react-native';
import { ThinButton, ThinButtonProps } from 'homepair-elements';
import { HomePairFonts } from 'homepair-fonts';
import strings from 'homepair-strings';
import * as BaseStyles from 'homepair-base-styles';
import { DarkModeInjectedProps } from '../WithDarkMode/WithDarkMode';
import { HomePairsDimensions } from 'homepair-types';


export type GeneralHomeInfoProps = DarkModeInjectedProps & {
    address: String
    tenants: number
    bedrooms: number
    bathrooms: number
    onClick: () => any  
}

const generalHomeStrings = strings.detailedPropertyPage.generalHomeInfo
export default function GeneralHomeInfo(props: GeneralHomeInfoProps) {
    let styles = setStyles(props.primaryColorTheme)

    const onClick = () => props.onClick()

    let thinButtonProps : ThinButtonProps = {
        name: generalHomeStrings.button,
        buttonStyle: styles.editButton,
        buttonTextStyle: styles.editButtonText,
        onClick: onClick,
    }

    function detailBox(arg0: String, arg1: number){
        return(
            <View style={styles.detailContainer}> 
                <Text style={styles.detailName}>{arg0}</Text>
                <Text style={styles.detail}>{arg1}</Text>
            </View>
        )
    }

    function livingSpace() {
        return (
            <View style={styles.livingSpaceContainer}> 
                {detailBox(generalHomeStrings.tenants, props.tenants)}
                {detailBox(generalHomeStrings.bedrooms, props.bedrooms)}
                {detailBox(generalHomeStrings.bathrooms, props.bathrooms)}
            </View>
        )
    }

    /**Need the wrapper View so iOS can render the content properly. I don't know why it does this. */
    return(
        <View>
            <View style={styles.container}>
            <View style={styles.addressContainer}>
                    <Text style={styles.streetAddress}>{props.address}</Text>
                    <Text style={styles.cityStateText}>San Luis Obispo, CA</Text>
                </View>
                {livingSpace()}
                <ThinButton {...thinButtonProps}/>
            </View>
        </View>
    );
}

function setStyles(colorTheme?: BaseStyles.ColorTheme) {
    let colors = (colorTheme == null) ? BaseStyles.LightColorTheme : colorTheme
    return(
        StyleSheet.create({
            container:{
                backgroundColor: colors.secondary,
                marginHorizontal: BaseStyles.MarginPadding.large,
                marginTop: BaseStyles.MarginPadding.largeConst,
                borderRadius: BaseStyles.BorderRadius.large,
                borderBottomColor: colors.veryLightGray,
                borderBottomWidth: 1,
                padding: BaseStyles.MarginPadding.large,
                width: BaseStyles.ContentWidth.thin,
                alignSelf: 'center',
                shadowColor: colors.shadow,
                shadowRadius: 10,
                shadowOffset: {width : 1, height: 1,},
                shadowOpacity: .25,
                elevation: 9,
            },
            livingSpaceContainer: {
                flexDirection: 'row',
                alignContent: 'center',
                alignItems: 'center',
                justifyContent: 'center',
                alignSelf: 'center',
                width: BaseStyles.ContentWidth.wide,
                paddingVertical: BaseStyles.MarginPadding.mediumConst,
            },
            addressContainer: {
                borderBottomColor: colors.veryLightGray,
                borderBottomWidth: 1,
                paddingBottom: BaseStyles.MarginPadding.mediumConst,
                marginBottom: BaseStyles.MarginPadding.mediumConst,
            },
            streetAddress: {
                color: colors.tertiary,
                fontSize: BaseStyles.FontTheme.reg,
                fontFamily: HomePairFonts.nunito_bold,
            },
            cityStateText: {
                color: colors.tertiary,
                fontSize: BaseStyles.FontTheme.xsmal,
            },
            cardTitle: {
                fontSize: BaseStyles.FontTheme.reg + 2,
                maxWidth: 450,
                fontFamily: BaseStyles.FontTheme.secondary,
            },
            cardDescription: {
                fontFamily: BaseStyles.FontTheme.primary,
                fontSize: BaseStyles.FontTheme.small,
            },
            textContainer: {
                width: BaseStyles.ContentWidth.reg,
                borderBottomColor: colors.veryLightGray,
                paddingBottom: BaseStyles.MarginPadding.mediumConst,
                borderBottomWidth: 1,
            },
            detailContainer:{
                flex: 1, 
                alignSelf: 'center', 
                alignItems: 'center'
            },
            detailName: {
                fontSize: BaseStyles.FontTheme.xsmal, 
                marginBottom: BaseStyles.MarginPadding.mediumConst, 
                color: colors.tertiary
            },
            detail: {
                color: colors.tertiary,
                fontSize: BaseStyles.FontTheme.reg + 2, 
                fontFamily: HomePairFonts.nunito_bold
            },
            editButton: {
                alignItems: 'center',
                backgroundColor: colors.transparent,
                padding: BaseStyles.MarginPadding.mediumConst,
                width: HomePairsDimensions.MIN_BUTTON_WIDTH,
                borderRadius: 8,
                borderWidth: 1,
                borderColor: colors.lightGray,
            },
            editButtonText : {
                color: colors.lightGray
            }
    })
)}