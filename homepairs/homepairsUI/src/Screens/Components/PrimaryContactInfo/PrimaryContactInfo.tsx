import React from 'react'; //* *For every file that uses jsx, YOU MUST IMPORT REACT  */
import { StyleSheet, Text, View } from 'react-native';
import strings from 'homepairs-strings';
import { HomePairsDimensions, Contact } from 'src/state/types';
import * as BaseStyles from 'homepairs-base-styles';
import { HomePairFonts } from 'homepairs-fonts';
import { DarkModeInjectedProps } from '../WithDarkMode/WithDarkMode';

export type PrimaryContactInfoProps = DarkModeInjectedProps & {
    propertyManager: Contact;
};

const primaryContactStrings = strings.detailedPropertyPage.primaryContact;

function setStyles(colorTheme?: BaseStyles.ColorTheme) {
    const colors = colorTheme == null ? BaseStyles.LightColorTheme : colorTheme;
    return StyleSheet.create({
        container: {
            backgroundColor: colors.secondary,
            marginHorizontal: BaseStyles.MarginPadding.large,
            marginTop: BaseStyles.MarginPadding.largeConst,
            marginBottom: BaseStyles.MarginPadding.large,
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
        primaryContactContainer: {
            borderBottomColor: colors.veryLightGray,
            borderBottomWidth: 1,
            paddingBottom: BaseStyles.MarginPadding.mediumConst,
            marginBottom: BaseStyles.MarginPadding.mediumConst,
        },
        title: {
            color: colors.tertiary,
            fontSize: BaseStyles.FontTheme.reg,
            fontFamily: HomePairFonts.nunito_bold,
        },
        subtitle: {
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
            fontSize: 16,
        },
        textContainer: {
            width: BaseStyles.ContentWidth.reg,
            borderBottomColor: colors.veryLightGray,
            paddingBottom: BaseStyles.MarginPadding.mediumConst,
            borderBottomWidth: 1,
        },
        cardContainer: {
            backgroundColor: 'white',
            maxWidth: HomePairsDimensions.MAX_CONTENT_SIZE,
            width: BaseStyles.ContentWidth.reg,
            marginHorizontal: '5%',
            borderRadius: 7,
            shadowColor: 'black',
            shadowRadius: 20,
            shadowOffset: { width: 1, height: 1 },
            shadowOpacity: 100,
            elevation: 9,
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
            flex: 1,
        },
        detailsTitle: {
            color: colors.tertiary,
            fontFamily: 'nunito-regular',
            fontSize: 12,
        },
        detailsWrapperStyle: {
            width: BaseStyles.ContentWidth.thin,
            marginTop: BaseStyles.MarginPadding.small,
            marginBottom: BaseStyles.MarginPadding.smallConst,
            alignSelf: 'flex-start',
            justifyContent: 'flex-start',
        },
    });
}

export default function PrimaryContactInfo(props: PrimaryContactInfoProps) {
    const {
        primaryColorTheme,
        propertyManager,
    } = props;

    const {firstName, lastName, email} = propertyManager;
    const styles = setStyles(primaryColorTheme);

    function labeledItem(label: string, value: string) {
        return (
            <View style={styles.detailsWrapperStyle}>
                <Text style={styles.detailsTitle}>{label}</Text>
                <Text style={styles.cardDescription}>{value}</Text>
            </View>
        );
    }

    function ContactInfo() {
        return (
            <View style={styles.detailsWrapperStyle}>
                {labeledItem(primaryContactStrings.name, (`${firstName} ${lastName}`))}
                {labeledItem(primaryContactStrings.email, (`${email}`))}
            </View>
        );
    }

    /* Need the wrapper View so iOS can render the content properly. I don't know why it does this. */
    return (
        <View>
            <View style={styles.container}>
                <View style={styles.primaryContactContainer}>
                    <Text style={styles.title}>{primaryContactStrings.title}</Text>
                    <Text style={styles.subtitle}>{primaryContactStrings.subtitle}</Text>
                </View>
                {ContactInfo()}
            </View>
        </View>
    );

}
