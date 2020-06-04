import React from 'react';
import {
    TouchableOpacity,
    Text,
    View,
    StyleSheet,
    Image,
} from 'react-native';
import {ServiceRequest, AccountTypes, ServiceRequestStatusEnums} from 'homepairs-types';
import * as BaseStyles from 'homepairs-base-styles';
import { HomePairFonts } from 'homepairs-fonts';
import { clock } from 'homepairs-images';
import Moment from 'moment';
import {categoryToString} from 'src/utility';

export type ServiceRequestButtonProps = {
    onClick?: (serviceRequest: ServiceRequest) => any,
    activeType?: ServiceRequestStatusEnums,
    serviceRequest?: ServiceRequest,
}

const colors = BaseStyles.LightColorTheme;

const styles = StyleSheet.create({
    container: {
        borderLeftWidth: 10,
        borderRadius: BaseStyles.BorderRadius.medium, 
        padding: BaseStyles.MarginPadding.medium,
        borderTopColor: colors.lightGray,
        borderRightColor: colors.lightGray,
        borderBottomColor: colors.lightGray,
        borderWidth: 1,
        marginVertical: 10,
        marginHorizontal: 20,
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
    const {onClick, activeType, serviceRequest} = props;
    Moment.locale('en');
    const date = Moment(serviceRequest.startDate.toString()).format('LLL');
    const active = serviceRequest.status === "Pending" || serviceRequest.status === "Scheduled" || serviceRequest.status === "InProgress";

    let borderColor = colors.lightGray;
    if(activeType === ServiceRequestStatusEnums.Pending){
        borderColor = colors.roopairs;
    }
    else if(activeType === ServiceRequestStatusEnums.Scheduled){
        borderColor = colors.roopairs_blue;
    }
    else if(activeType === ServiceRequestStatusEnums.InProgress){
        borderColor = colors.roopairs_purple;
    }
    else{
        borderColor = colors.lightGray;
    }

    return (
        <View style={[styles.container, {borderLeftColor: borderColor}]}>
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
    activeType: ServiceRequestStatusEnums.Pending,
};