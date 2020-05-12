import React from 'react'; //* *For every file that uses jsx, YOU MUST IMPORT REACT  */
import { StyleSheet, Text, View } from 'react-native';
import { HomePairFonts } from 'homepairs-fonts';
import strings from 'homepairs-strings';
import * as BaseStyles from 'homepairs-base-styles';
import { HomePairsDimensions, Property } from 'homepairs-types';
import { isNullOrUndefined } from 'homepairs-utilities';
import { ThinButton } from 'homepairs-elements';

export type ServiceRequestCountProps = {
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

const serviceRequestStrings = strings.detailedPropertyPage.serviceRequestCount;
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
    titleContainer: {
        borderBottomColor: colors.veryLightGray,
        borderBottomWidth: 1,
        paddingBottom: BaseStyles.MarginPadding.mediumConst,
        marginBottom: BaseStyles.MarginPadding.mediumConst,
    },
    buttonContainer: {
        marginTop: BaseStyles.MarginPadding.mediumConst,
    },
    title: {
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
 * Service Request Count Info 
 * ---------------------------------------------------
 * A child component for the Detailed Property Card that presents details about 
 * the current service requests. It presents pending, scheduled, and in progress.  
 * @param {ServiceRequestCountProps} props 
 */
export default function ServiceRequestCount(props: ServiceRequestCountProps) {
    const { property, hasEdit, onClick } = props;
    const pending = 2;
    const scheduled = 3;
    const inProgress = 1;

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
                {renderDetailBox(serviceRequestStrings.pending, pending)}
                {renderDetailBox(serviceRequestStrings.scheduled, scheduled)}
                {renderDetailBox(serviceRequestStrings.inProgress, inProgress)}
            </View>
        );
    }

    return (
        <View style={{flex: 1}}>
            <View style={styles.container}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>{serviceRequestStrings.title}</Text>
                </View>
                    {renderLivingSpace()}
                <View style={styles.buttonContainer}>
                    {isNullOrUndefined(hasEdit) || hasEdit ? (
                        <ThinButton
                            name={serviceRequestStrings.button}
                            buttonStyle={styles.editButton}
                            buttonTextStyle={styles.editButtonText}
                            onClick={onClick} />
                    ) : (
                            <></>
                        )}
                </View>
            </View>
            </View>
    );
}

ServiceRequestCount.defaultProps = {
    hasEdit: true,
    onClick: () => { },
};