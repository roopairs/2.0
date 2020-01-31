import React from 'react'; //* *For every file that uses jsx, YOU MUST IMPORT REACT  */
import { StyleSheet, Text, View } from 'react-native';
import { ThinButtonProps, renderThinButton } from 'homepairs-elements';
import { HomePairFonts } from 'homepairs-fonts';
import strings from 'homepairs-strings';
import * as BaseStyles from 'homepairs-base-styles';
import { HomePairsDimensions, Property } from 'homepairs-types';
import { DarkModeInjectedProps } from '../WithDarkMode/WithDarkMode';

export type GeneralHomeInfoProps = DarkModeInjectedProps & {
    property: Property;
    hasEdit?: boolean;
    onClick?: () => any;
};

const generalHomeStrings = strings.detailedPropertyPage.generalHomeInfo;

function setStyles(colorTheme?: BaseStyles.ColorTheme) {
    const colors = colorTheme == null ? BaseStyles.LightColorTheme : colorTheme;
    return StyleSheet.create({
        container: {
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
            shadowOffset: { width: 1, height: 1 },
            shadowOpacity: 0.25,
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
        detailContainer: {
            flex: 1,
            alignSelf: 'center',
            alignItems: 'center',
        },
        detailName: {
            fontSize: BaseStyles.FontTheme.xsmal,
            marginBottom: BaseStyles.MarginPadding.mediumConst,
            color: colors.tertiary,
        },
        detail: {
            color: colors.tertiary,
            fontSize: BaseStyles.FontTheme.reg + 2,
            fontFamily: HomePairFonts.nunito_bold,
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
        editButtonText: {
            color: colors.lightGray,
        },
    });
}

export default function GeneralHomeInfo(props: GeneralHomeInfoProps) {
    const {
        primaryColorTheme,
        property,
        hasEdit,
        onClick,
    } = props;
    const {streetAddress, tenants, bedrooms, bathrooms, city, state} = property;
    const styles = setStyles(primaryColorTheme);

    const thinButtonProps: ThinButtonProps = {
        name: generalHomeStrings.button,
        buttonStyle: styles.editButton,
        buttonTextStyle: styles.editButtonText,
        onClick,
    };

    function detailBox(arg0: String, arg1: number) {
        return (
            <View style={styles.detailContainer}>
                <Text style={styles.detailName}>{arg0}</Text>
                <Text style={styles.detail}>{arg1}</Text>
            </View>
        );
    }

    function livingSpace() {
        return (
            <View style={styles.livingSpaceContainer}>
                {detailBox(generalHomeStrings.tenants, tenants)}
                {detailBox(generalHomeStrings.bedrooms, bedrooms)}
                {detailBox(generalHomeStrings.bathrooms, bathrooms)}
            </View>
        );
    }

    /** Need the wrapper View so iOS can render the content properly. I don't know why it does this. */
    return (
        <View>
            <View style={styles.container}>
                <View style={styles.addressContainer}>
                    <Text style={styles.streetAddress}>{streetAddress}</Text>
                    <Text style={styles.cityStateText}>
                        {city},{" "}{state}
                    </Text>
                </View>
                {livingSpace()}

                {typeof hasEdit === 'undefined' ||
                hasEdit == null ||
                hasEdit ? (
                    renderThinButton(thinButtonProps)
                ) : (
                    <></>
                )}
            </View>
        </View>
    );
}

GeneralHomeInfo.defaultProps = {
    hasEdit: true,
    onClick: () => {},
};