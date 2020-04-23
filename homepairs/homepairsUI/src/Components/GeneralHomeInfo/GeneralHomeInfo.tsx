import React from 'react'; //* *For every file that uses jsx, YOU MUST IMPORT REACT  */
import { StyleSheet, Text, View } from 'react-native';
import { HomePairFonts } from 'homepairs-fonts';
import strings from 'homepairs-strings';
import * as BaseStyles from 'homepairs-base-styles';
import { HomePairsDimensions, Property } from 'homepairs-types';
import { isNullOrUndefined } from 'homepairs-utilities';
import {ThinButton} from 'homepairs-elements';

export type GeneralHomeInfoProps = {
    /**
     * The individual property that gives this card the information to present 
     */
    property: Property;

    /**
     * This allows the property to render the edit button. Should be set true for 
     * Property Mangers and false for Tenants 
     */
    hasEdit?: boolean;

    /**
     * Callback function that should invoke something for the parent. This should 
     * navigate the user to an Edit Property modal
     */
    onClick?: () => any;
};

const generalHomeStrings = strings.detailedPropertyPage.generalHomeInfo;
const colors = BaseStyles.LightColorTheme;
const styles = StyleSheet.create({
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
        fontSize: 20,
    },
});

/**
 * ---------------------------------------------------
 * General Home Info 
 * ---------------------------------------------------
 * A child component for the Detailed Property Card that presents details about 
 * the conditions of the living space. It presents an adress, the maximum amount 
 * of tenants, number of bedrooms, and the number of bathrooms.  
 * @param {GeneralHomeInfoProps} props 
 */
export default function GeneralHomeInfo(props: GeneralHomeInfoProps) {
    const { property, hasEdit, onClick } = props;
    console.log(`In General Home Info`)
    console.log(property);
    const {address, tenants, bedrooms, bathrooms} = property;

    function renderDetailBox(arg0: String, arg1: number) {
        return (
            <View style={styles.detailContainer}>
                <Text style={styles.detailName}>{arg0}</Text>
                <Text style={styles.detail}>{arg1}</Text>
            </View>
        );
    }

    function renderLivingSpace() {
        return (
            <View style={styles.livingSpaceContainer}>
                {renderDetailBox(generalHomeStrings.tenants, tenants)}
                {renderDetailBox(generalHomeStrings.bedrooms, bedrooms)}
                {renderDetailBox(generalHomeStrings.bathrooms, bathrooms)}
            </View>
        );
    }

    return (
        <View>
            <View style={styles.container}>
                <View style={styles.addressContainer}>
                    <Text style={styles.streetAddress}>{address}</Text>
                </View>
                {renderLivingSpace()}

                {isNullOrUndefined(hasEdit) || hasEdit ? (
                    <ThinButton 
                        name={generalHomeStrings.button}
                        buttonStyle={styles.editButton}
                        buttonTextStyle={styles.editButtonText}
                        onClick={onClick}/>
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