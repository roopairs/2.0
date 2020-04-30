import React from 'react';
import {
    TouchableOpacity,
    Text,
    View,
    StyleSheet,
    Image,
    Platform,
} from 'react-native';
import {ServiceRequest, ServiceProvider} from 'homepairs-types';
import * as BaseStyles from 'homepairs-base-styles';
import { HomePairFonts } from 'homepairs-fonts';
import { clock } from 'homepairs-images';
import Moment from 'moment';
import {categoryToString, isNullOrUndefined} from 'homepairs-utilities';
import { TextTile, ImageTile } from '../Tiles/Tiles';

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
        padding: BaseStyles.MarginPadding.medium,
        borderColor: colors.lightGray,
        borderWidth: 1,
        margin: 20,
    },
    buttonStyle: {
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

function renderLogo(name: string, logo?: string) {

    // Render remote images. Need to format in {uri: string} to work on iOS
    const image = Platform.OS === 'web' ? logo : {uri: logo} ;
    return isNullOrUndefined(logo) ? 
        <TextTile text={name} fontSize={16}/>
        :
        <ImageTile image={image}/>;     
}

export default function ServiceProviderButton(props: ServiceProviderButtonProps) {
    const {onClick, serviceProvider} = props;
    Moment.locale('en');
    //const date = Moment(serviceProvider.startDate.toString()).format('LLL');

    return (
        <View style={[styles.container]}>
            <TouchableOpacity
                testID='click-service-request-button'
                style={styles.buttonStyle}
                onPress={() => onClick(serviceProvider.provId, serviceProvider.name)}
            >
                {renderLogo(serviceProvider.name, serviceProvider.logo)}
                <Text style={styles.titleText}>
                    {serviceProvider.name}
                </Text>
                <Text style={styles.companyDetailsText}>
                    {serviceProvider.skills}
                </Text>
                <Text style={styles.companyDetailsText}>
                    {serviceProvider.email}
                </Text>
            </TouchableOpacity>
        </View>
    );
}

ServiceProviderButton.defaultProps = {
    onClick: () => {}, 
    active: true,
};