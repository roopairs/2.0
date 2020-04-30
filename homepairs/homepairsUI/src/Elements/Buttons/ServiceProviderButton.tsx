import React from 'react';
import {
    TouchableOpacity,
    Text,
    View,
    StyleSheet,
    Image,
} from 'react-native';
import { HomePairsDimensions, ServiceRequest, ServiceProvider } from 'homepairs-types';
import * as BaseStyles from 'homepairs-base-styles';
import Colors from 'homepairs-colors';
import { HomePairFonts } from 'homepairs-fonts';
import { clock } from 'homepairs-images';
import Moment from 'moment';
import { categoryToString } from 'homepairs-utilities';


export type ServiceProviderButtonProps = {
    key?: string,
    onClick?: (provId: number, name: string) => any,
    active?: boolean,
    serviceProvider?: ServiceProvider,
}

const colors = BaseStyles.LightColorTheme;

const styles = StyleSheet.create({
    container: {
        borderRadius: BaseStyles.BorderRadius.medium,
        borderColor: colors.lightGray,
        borderWidth: 1,
        margin: 20,
    },
    buttonStyle: {
    },
    titleText: {
        alignContent: 'center',
        color: colors.tertiary,
        fontSize: BaseStyles.FontTheme.reg + 1,
        fontFamily: HomePairFonts.nunito_bold,
    },
    companyDetailsText: {
        alignContent: 'center',
        color: colors.lightGray,
        fontSize: BaseStyles.FontTheme.reg - 2,
        fontFamily: HomePairFonts.nunito_light,
    },
    payRateText: {
        alignContent: 'center',
        color: Colors.LightModeColors.blueButtonText,
        fontSize: BaseStyles.FontTheme.reg - 2,
        fontFamily: HomePairFonts.nunito_bold,
    },
    dateContainer: {
        flexDirection: 'row',
        padding: BaseStyles.MarginPadding.xsmallConst,
    },
    dateText: {
        alignContent: 'center',
        color: colors.tertiary,
        fontSize: BaseStyles.FontTheme.reg,
        fontFamily: HomePairFonts.nunito_regular,
        marginLeft: BaseStyles.MarginPadding.medium,
    },
    buttonImage: {
        width: 24,
        height: 24,
    },
    leftColumnStyle: {
        flexGrow: 1,
        justifyContent: 'center',
        alignContent: 'center',
        textAlign: "center",
        backgroundColor: Colors.LightModeColors.transparent,
        padding: BaseStyles.MarginPadding.largeConst,
        width: HomePairsDimensions.MAX_BUTTON_WIDTH * 0.35,
        borderRightWidth: 0.5,
        borderColor: Colors.LightModeColors.greyCardDivider,
    },
    rightColumnStyle: {
        flexGrow: 2,
        justifyContent: 'flex-start',
        backgroundColor: Colors.LightModeColors.transparent,
        padding: BaseStyles.MarginPadding.largeConst,
        width: HomePairsDimensions.MAX_BUTTON_WIDTH * 0.65,
        borderLeftWidth: 0.5,
        borderColor: Colors.LightModeColors.greyCardDivider,
    },
});

export default function ServiceProviderButton(props: ServiceProviderButtonProps) {
    const { onClick, serviceProvider } = props;
    Moment.locale('en');
    //const date = Moment(serviceProvider.startDate.toString()).format('LLL');

    return (
        <View style={[styles.container]}>
            <TouchableOpacity
                testID='click-service-request-button'
                style={styles.buttonStyle}
                onPress={() => onClick(serviceProvider.provId, serviceProvider.name)}
            >
                <View style={{ flexDirection: 'row' }}>
                    <View style={styles.leftColumnStyle}>
                        <Text style={styles.payRateText}>
                            ${serviceProvider.payRate} / hour
                        </Text>
                    </View>
                    <View style={styles.rightColumnStyle}>
                        <Text style={styles.titleText}>
                            {serviceProvider.name}
                        </Text>
                        <Text style={styles.companyDetailsText}>
                            <br />{serviceProvider.skills}
                        </Text>
                        <Text style={styles.companyDetailsText}>
                            <br />{serviceProvider.email}
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    );
}

ServiceProviderButton.defaultProps = {
    onClick: () => { },
    active: true,
};