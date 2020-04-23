import React from "react";
import { ScrollView, StyleSheet, StatusBar, Platform, View, Dimensions, Text } from 'react-native';
import { ThinButtonProps, Card, AppliancePanel } from 'homepairs-elements';
import strings from 'homepairs-strings';
import * as BaseStyles from 'homepairs-base-styles';
import { HomePairsDimensions} from 'homepairs-types';
import Colors from 'homepairs-colors';
import {FontTheme} from 'homepairs-base-styles';
import { HomePairFonts } from 'homepairs-fonts';
import { categoryToString, isNullOrUndefined} from 'homepairs-utilities';
import {prepareNavigationHandlerComponent, NavigationRouteScreenProps} from 'homepairs-routes';
import Moment from 'moment';

type Props = NavigationRouteScreenProps;

const serviceRequestStrings = strings.serviceRequestModal;


function setInputStyles(colorTheme?: BaseStyles.ColorTheme){
    const {width} = Dimensions.get('window');
    const colors = isNullOrUndefined(colorTheme) ? BaseStyles.LightColorTheme : colorTheme;
    return StyleSheet.create({
        formTitle: {
            marginVertical: '3.5%',
            fontFamily: BaseStyles.FontTheme.primary,
            color: colors.lightGray,
        },
        subContainer: {
            marginBottom: '3.5%',
            paddingTop: 1,
            paddingHorizontal: 3,
            borderRadius: 4,
            width: '100%',
            opacity: 50,
        },
        modalContainer: {
            flex:1,
            maxWidth: HomePairsDimensions.MAX_PALLET,
            width: Platform.OS === 'web' ? width : BaseStyles.ContentWidth.max,
            alignSelf: 'center',
        },
        scrollStyle: {
            flex:1,
            marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
            width: '100%',
        },
        scrollContentContainerStyle: {
            maxWidth: HomePairsDimensions.MAX_CONTENT_SIZE,
            alignItems: 'center',
            justifyContent: 'center',
            alignSelf: 'center',
            width: BaseStyles.ContentWidth.reg,
            paddingVertical: BaseStyles.MarginPadding.large,
            flexGrow: 1, // Needed to center the contents of the scroll container
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
        cardTitle: {
            color: colors.secondary,
            fontFamily: 'nunito-regular',
            fontSize: 20,
            alignSelf: 'center',
        },
        cardTitleContainer: {
            borderTopRightRadius: 7,
            borderTopLeftRadius: 7,
            width: BaseStyles.ContentWidth.max,
            backgroundColor: colors.primary, 
            paddingVertical: BaseStyles.MarginPadding.largeConst,
            paddingHorizontal: BaseStyles.MarginPadding.largeConst,
            alignSelf: 'center',
            justifyContent: 'flex-start',
        },
        cardWrapperStyle: {
            width: BaseStyles.ContentWidth.thin,
            marginTop: BaseStyles.MarginPadding.small,
            marginBottom: BaseStyles.MarginPadding.smallConst,
            alignSelf: 'center',
            justifyContent: 'center',
        },
        errorStyle: {
            fontFamily: FontTheme.secondary, 
            fontSize: 16,
        },
        closeButton: {
            flex:1,
            fontSize: 20,
            color: colors.secondary, 
            fontFamily: HomePairFonts.nunito_regular,
        },
        detailText: {
            fontSize: BaseStyles.FontTheme.reg + 2, 
            fontFamily: HomePairFonts.nunito_regular, 
        },
    });
}

/**
 * Helper function to format POC information in component 
 * @param {string} poc 
 * @param {string} pocName 
 */
function formatPointOfContact(pocName:string, poc: string){
    if(isNullOrUndefined(poc) && isNullOrUndefined(pocName))
        return 'Not Applicable';
    if(isNullOrUndefined(poc))
        return pocName;
    if(isNullOrUndefined(pocName))
        return poc;
    return `${pocName} ${poc}`;
}

export class ServiceRequestModalBase extends React.Component<Props> {
    styles;

    serviceRequest;

    submitButton : ThinButtonProps = {
        name: '', 
        onClick: () => {}, 
        buttonStyle: {
            alignItems: 'center',
            backgroundColor: Colors.LightModeColors.transparent,
            padding: BaseStyles.MarginPadding.mediumConst,
            maxWidth: HomePairsDimensions.MAX_BUTTON_WIDTH,
            minWidth: HomePairsDimensions.MIN_BUTTON_WIDTH,
            borderRadius: BaseStyles.BorderRadius.large,
            borderWidth: 1,
            borderColor: Colors.LightModeColors.blueButton,
        },
        buttonTextStyle: {
            color: Colors.LightModeColors.blueButtonText, 
            fontSize: BaseStyles.FontTheme.reg,
            alignSelf: 'center',
        },
        containerStyle: {
            flex: 1,
            alignSelf: 'center',
            justifyContent: 'center',
            marginTop: BaseStyles.MarginPadding.largeConst,
            marginBottom: BaseStyles.MarginPadding.xlarge,
            minHeight: 50,
        },
    };

    constructor(props: Readonly<Props>) {
        super(props);
        this.styles = setInputStyles(null);
        this.serviceRequest = props.navigation.getParam('serviceRequest');
        this.state = {};
    }

    renderBody() {
        const date = Moment(this.serviceRequest.startDate.toString()).format('LLL');
        return (
            <View>
                <View style={this.styles.subContainer}>
                    <Text style={this.styles.formTitle}>{serviceRequestStrings.status}</Text>
                    <Text style={this.styles.detailText}>{this.serviceRequest.status}</Text>
                </View>
                <View style={this.styles.subContainer}>
                    <Text style={this.styles.formTitle}>{serviceRequestStrings.address}</Text>
                    <Text style={this.styles.detailText}>{this.serviceRequest.address}</Text>
                </View>
                <View style={this.styles.subContainer}>
                    <Text style={this.styles.formTitle}>{serviceRequestStrings.serviceType}</Text>
                    <Text style={this.styles.detailText}>{categoryToString(this.serviceRequest.appliance.category)} Repair</Text>
                </View>
                <View style={this.styles.subContainer}>
                    <Text style={this.styles.formTitle}>{serviceRequestStrings.technician}</Text>
                    <Text style={this.styles.detailText}>{isNullOrUndefined(this.serviceRequest.technician) 
                        ? 'Not Applicable' : this.serviceRequest.technician} </Text>
                </View>
                <View style={this.styles.subContainer}>
                    <Text style={this.styles.formTitle}>{serviceRequestStrings.startDate}</Text>
                    <Text style={this.styles.detailText}>{date}</Text>
                </View>
                <View style={this.styles.subContainer}>
                    <Text style={this.styles.formTitle}>{serviceRequestStrings.poc}</Text>
                    <Text style={this.styles.detailText}>{formatPointOfContact(this.serviceRequest.pocName, this.serviceRequest.poc)}</Text>
                </View>
                <View style={this.styles.subContainer}>
                    <Text style={this.styles.formTitle}>{serviceRequestStrings.details}</Text>
                    <Text style={this.styles.detailText}>{this.serviceRequest.details}</Text>
                </View>
                <View style={this.styles.subContainer}>
                    <Text style={this.styles.formTitle}>{serviceRequestStrings.appliance}</Text>
                    <AppliancePanel hasButton={false} appliance={this.serviceRequest.appliance} />
                </View>
            </View>            
        );
    }

    render() {
        const {navigation} = this.props;
        const showCloseButton = true;
        return(
            <View style={this.styles.modalContainer}>
            <ScrollView style={this.styles.scrollStyle}
            contentContainerStyle={this.styles.scrollContentContainerStyle}
            showsHorizontalScrollIndicator={false}>
                <Card
                    containerStyle={this.styles.cardContainer}
                    showCloseButton={showCloseButton}
                    closeButtonStyle={this.styles.closeButton}
                    title={serviceRequestStrings.title} 
                    closeButtonPressedCallBack={() => navigation.goBack()} 
                    titleStyle={this.styles.cardTitle}
                    titleContainerStyle={this.styles.cardTitleContainer}
                    wrapperStyle={this.styles.cardWrapperStyle}
                    >
                    {this.renderBody()}
                </Card>
            </ScrollView>
        </View>);
    }
}

export default prepareNavigationHandlerComponent(ServiceRequestModalBase);