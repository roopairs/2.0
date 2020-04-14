import React from 'react';
import {
    TouchableOpacity,
    Text,
    View,
    StyleSheet,
    Image,
} from 'react-native';
import {ServiceRequest} from 'homepairs-types';
import * as BaseStyles from 'homepairs-base-styles';
import { HomePairFonts } from 'homepairs-fonts';
import { clock } from 'homepairs-images';
import Moment from 'moment';
import {categoryToString} from 'homepairs-utilities';

export type ServiceRequestButtonProps = {
    onClick?: (serviceRequest: ServiceRequest) => any,
    active?: boolean,
    serviceRequest?: ServiceRequest,
}

const colors = BaseStyles.LightColorTheme;

const styles = StyleSheet.create({
    container: {
        borderLeftWidth: 10,
        borderRadius: BaseStyles.BorderRadius.medium, 
        padding: BaseStyles.MarginPadding.medium,
        borderColor: colors.lightGray,
        borderWidth: 1,
        margin: 20,
    },
    buttonStyle: {
        paddingLeft: BaseStyles.MarginPadding.medium,
    },
    titleText: {
        color: colors.tertiary,
        fontSize: BaseStyles.FontTheme.reg + 2, 
        fontFamily: HomePairFonts.nunito_bold,
        marginLeft: 2,
    }, 
    companyDetailsText: {
        color: colors.lightGray,
        fontSize: BaseStyles.FontTheme.reg - 1, 
        fontFamily: HomePairFonts.nunito_light,
        padding: BaseStyles.MarginPadding.xsmallConst,
    },
    dateContainer: {
        flexDirection: 'row',
        padding: BaseStyles.MarginPadding.xsmallConst,
    },
    dateText: {
        color: colors.tertiary, 
        fontSize: BaseStyles.FontTheme.reg, 
        fontFamily: HomePairFonts.nunito_regular,
        marginLeft: BaseStyles.MarginPadding.medium,
    },
    buttonImage: {
        width: 24,
        height: 24,
    },
});

export default function ServiceRequestButton(props: ServiceRequestButtonProps) {
    const {onClick, active, serviceRequest} = props;
    Moment.locale('en');
    const date = Moment(serviceRequest.startDate.toString()).format('LLL');

    return (
        <View style={[styles.container, {borderLeftColor: active ? colors.primary : colors.lightGray}]}>
            <TouchableOpacity
                testID='click-service-request-button'
                style={styles.buttonStyle}
                onPress={() => onClick(serviceRequest)}
            >
                <Text style={styles.titleText}>
                    {categoryToString(serviceRequest.appliance.category)} Repair
                </Text>
                <Text style={styles.companyDetailsText}>
                    {serviceRequest.companyName}
                </Text>
                <Text style={styles.companyDetailsText}>
                    {serviceRequest.poc}
                </Text>
                <View style={styles.dateContainer}>
                    <Image style={styles.buttonImage} source={clock}/>
                    <Text style={styles.dateText}>
                        {date}
                    </Text>
                </View>
            </TouchableOpacity>
        </View>
    );
}

ServiceRequestButton.defaultProps = {
    onClick: () => {}, 
    active: true,
};