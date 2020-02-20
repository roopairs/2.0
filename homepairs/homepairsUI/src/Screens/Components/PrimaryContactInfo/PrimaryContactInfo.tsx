import React from 'react'; //* *For every file that uses jsx, YOU MUST IMPORT REACT  */
import { StyleSheet, Text, View } from 'react-native';
import strings from 'homepairs-strings';
import { HomePairsDimensions, Contact } from 'src/state/types';
import * as BaseStyles from 'homepairs-base-styles';
import { HomePairFonts } from 'homepairs-fonts';

export type PrimaryContactInfoProps = {
    propertyManager: Contact;
};

const primaryContactStrings = strings.detailedPropertyPage.primaryContact;

function setStyles(colorTheme?: BaseStyles.ColorTheme) {
    const colors = colorTheme == null ? BaseStyles.LightColorTheme : colorTheme;
    return StyleSheet.create({
        container: {
            backgroundColor: colors.secondary,
            marginHorizontal: BaseStyles.MarginPadding.medium,
            marginTop: BaseStyles.MarginPadding.mediumConst,
            marginBottom: BaseStyles.MarginPadding.medium,
            borderRadius: BaseStyles.BorderRadius.large,
            borderBottomColor: colors.veryLightGray,
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
        detailsLabel: {
            color: colors.lightGray,
            fontFamily: 'nunito-regular',
            fontSize: 12,
        },
        detailsValue: {
            fontFamily: BaseStyles.FontTheme.primary,
            fontSize: 16,
        },
        detailsWrapperStyle: {
            width: BaseStyles.ContentWidth.thin,
            marginTop: BaseStyles.MarginPadding.small,
            marginBottom: BaseStyles.MarginPadding.smallConst,
            alignSelf: 'flex-start',
            justifyContent: 'flex-start',
        },
        contactWrapperStyle: {
            width: BaseStyles.ContentWidth.thin,
            marginHorizontal: BaseStyles.MarginPadding.medium,
            marginTop: BaseStyles.MarginPadding.mediumConst,
            marginBottom: BaseStyles.MarginPadding.medium,
            alignSelf: 'flex-start',
            justifyContent: 'flex-start',
        },
    });
}

export default function PrimaryContactInfo(props: PrimaryContactInfoProps) {
    const {
        propertyManager,
    } = props;

    const { firstName, lastName, email } = propertyManager;
    const styles = setStyles(BaseStyles.LightColorTheme);

    function labeledItem(label: string, value: string) {
        return (
            <View>
                <View style={styles.detailsWrapperStyle}>
                    <Text style={styles.detailsLabel}>{label}</Text>
                </View>
                <View style={styles.detailsWrapperStyle}>
                    <Text style={styles.detailsValue}>{value}</Text>
                </View>
            </View>
        );
    }

    function ContactInfo() {
        return (
            <View>
                <View style={styles.contactWrapperStyle}>
                    {labeledItem(primaryContactStrings.name, (`${firstName} ${lastName}`))}
                </View>
                <View style={styles.contactWrapperStyle}>
                    {labeledItem(primaryContactStrings.email, (`${email}`))}
                </View>
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
