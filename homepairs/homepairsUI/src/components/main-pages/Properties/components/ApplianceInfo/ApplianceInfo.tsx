import React from 'react'; //* *For every file that uses jsx, YOU MUST IMPORT REACT  */
import { StyleSheet, Text, View, Platform } from 'react-native';
import { ThinButtonProps, ThinButton, ApplianceCategorizer } from 'src/elements';
import { HomePairFonts } from 'homepairs-fonts';
import strings from 'homepairs-strings';
import * as BaseStyles from 'homepairs-base-styles';
import { HomePairsDimensions, Appliance } from 'homepairs-types';

export type ApplianceInfoProps = {
    onAddApplianceModal?: () => any,
    onEditApplianceModal?: (appliance: Appliance) => any,
    appliances?: Appliance[],
    propId: string,
    hasEdit? : boolean,
}

type Props = ApplianceInfoProps;

const applianceInfoStrings = strings.applianceInfo;

function setStyles(colorTheme?: BaseStyles.ColorTheme) {
    const colors = colorTheme == null ? BaseStyles.LightColorTheme : colorTheme;
    return StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: colors.secondary,
            marginHorizontal: BaseStyles.MarginPadding.large,
            marginTop: BaseStyles.MarginPadding.largeConst,
            borderRadius: BaseStyles.BorderRadius.large,
            borderBottomColor: colors.veryLightGray,
            borderBottomWidth: 1,
            padding: BaseStyles.MarginPadding.mediumConst,
            width: BaseStyles.ContentWidth.thin,
            alignSelf: 'center',
            justifyContent: 'space-evenly',
            shadowColor: colors.shadow,
            shadowRadius: 10,
            shadowOffset: { width: 1, height: 1 },
            shadowOpacity: 0.25,
            elevation: 9,
        },
        titleContainer: {
            borderBottomColor: colors.veryLightGray,
            borderBottomWidth: 1,
            paddingBottom: BaseStyles.MarginPadding.mediumConst,
            marginBottom: BaseStyles.MarginPadding.mediumConst,
        },
        titleText: {
            color: colors.tertiary,
            fontSize: BaseStyles.FontTheme.reg + 2,
            fontFamily: HomePairFonts.nunito_bold,
        },
        textContainer: {
            width: BaseStyles.ContentWidth.reg,
            borderBottomColor: colors.veryLightGray,
            paddingBottom: BaseStyles.MarginPadding.mediumConst,
            borderBottomWidth: 1,
        },
        editButton: {
            alignItems: 'center',
            backgroundColor: colors.transparent,
            padding: BaseStyles.MarginPadding.mediumConst,
            width: HomePairsDimensions.MIN_BUTTON_WIDTH,
            marginBottom: Platform.OS !== 'web' ? 15 : undefined,
            borderRadius: 8,
            borderWidth: 1,
            borderColor: colors.lightGray,
        },
        editButtonText: {
            color: colors.lightGray,
            fontSize: 20,
        },
        details: {
            alignItems: 'center',
        },
    });
}


export default function ApplianceInfo(props: Props) {
    const {
        appliances,
        onAddApplianceModal,
        onEditApplianceModal,
        hasEdit,
    } = props;

    const styles = setStyles();

    const thinButtonProps: ThinButtonProps = {
        name: applianceInfoStrings.button.title,
        buttonStyle: styles.editButton,
        buttonTextStyle: styles.editButtonText,
        onClick: () => onAddApplianceModal(),
    };

    return (
        <View style={{ paddingBottom: BaseStyles.MarginPadding.largeConst}}>
            <View style={styles.container}>
                <View style= {styles.titleContainer}>
                    <Text style= {styles.titleText}>
                        {applianceInfoStrings.title}
                    </Text>
                </View>
                <View style= {styles.details}>
                    <ApplianceCategorizer 
                        onClick={onEditApplianceModal} 
                        appliances={appliances}
                        hasButton={hasEdit}/>
                    {hasEdit ?     
                    <ThinButton 
                        testID='add-appliance-button'
                        name={thinButtonProps.name} 
                        buttonStyle={thinButtonProps.buttonStyle} 
                        buttonTextStyle={thinButtonProps.buttonTextStyle} 
                        onClick={thinButtonProps.onClick}/>
                        :
                        <></>
                    }
                </View>
            </View>
        </View>
    );

}

ApplianceInfo.defaultProps = {
    hasEdit: true,
    onAddApplianceModal: () => {},
    onEditApplianceModal: () => {},
};