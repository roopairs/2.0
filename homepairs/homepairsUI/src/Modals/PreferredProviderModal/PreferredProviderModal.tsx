import React from "react";
import { ScrollView, StyleSheet, StatusBar, Platform, View, Dimensions, Text, Image } from 'react-native';
import { ThinButtonProps, Card, ThinButton } from 'homepairs-elements';
import strings from 'homepairs-strings';
import * as BaseStyles from 'homepairs-base-styles';
import { HomePairsDimensions} from 'homepairs-types';
import Colors from 'homepairs-colors';
import {FontTheme} from 'homepairs-base-styles';
import { HomePairFonts } from 'homepairs-fonts';
import { isNullOrUndefined} from 'homepairs-utilities';
import {prepareNavigationHandlerComponent, NavigationRouteScreenProps} from 'homepairs-routes';
import {deletePreferredProvider} from 'homepairs-endpoints';
import {HelperText} from 'react-native-paper';

type Props = NavigationRouteScreenProps;

type PreferredProviderState = {
    errorMsg: string, 
    errorCheck: boolean
}

const initialState : PreferredProviderState = {
    errorMsg: '', 
    errorCheck: false,
};

const preferredProviderStrings = strings.preferredProviderModal;

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
            color: 'white',
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
        horizontalLine: {
            alignSelf: 'center',
            margin: BaseStyles.MarginPadding.large,
            width: 80,
            borderBottomWidth: 3, 
            borderBottomColor: colors.primary,
        },
        payRateContainer: {
            flexDirection: 'row', 
            justifyContent: 'center',
        },
        payRate: {
            alignSelf: 'center',
            color: colors.primary, 
            fontSize: BaseStyles.FontTheme.reg, 
            fontFamily: BaseStyles.FontTheme.primary,
            fontWeight: 'bold',
        }, 
        starting: {
            color: colors.lightGray,
            fontSize: BaseStyles.FontTheme.small, 
            fontFamily: BaseStyles.FontTheme.primary,
        },
        companyName: {
            alignSelf: 'center', 
            fontSize: BaseStyles.FontTheme.lg, 
            fontFamily: BaseStyles.FontTheme.primary, 
            fontWeight: 'bold',
            color: BaseStyles.LightColorTheme.gray,
        },
        companyImage: {
            flex: 1,
            alignSelf: 'center',
            width: BaseStyles.ContentWidth.max,
            height: '100%',
            overflow: 'hidden',
        },
        companyImageWeb: {
            alignSelf: 'center',
            width: BaseStyles.ContentWidth.max,
            height: '100%',
        },
    });
}

export class ServiceRequestModalBase extends React.Component<Props, PreferredProviderState> {
    styles;

    serviceProvider;

    submitButton : ThinButtonProps = {
        name: 'Remove Provider', 
        onClick: () => {this.clickRemoveButton();},
        buttonStyle: {
            alignItems: 'center',
            backgroundColor: Colors.LightModeColors.transparent,
            padding: BaseStyles.MarginPadding.mediumConst,
            maxWidth: HomePairsDimensions.MAX_BUTTON_WIDTH,
            minWidth: HomePairsDimensions.MIN_BUTTON_WIDTH,
            borderRadius: BaseStyles.BorderRadius.large,
            borderWidth: 1,
            borderColor: BaseStyles.LightColorTheme.red,
        },
        buttonTextStyle: {
            color: BaseStyles.LightColorTheme.red, 
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
        this.serviceProvider = props.navigation.getParam('serviceProvider');
        this.state = initialState;
        this.setInitialState = this.setInitialState.bind(this);
        this.displayError = this.displayError.bind(this);
    }

    setInitialState() {
        this.setState(initialState);
    }

    displayError(msg: string) {
        this.setState({errorMsg: msg, errorCheck: true});
    }

    async clickRemoveButton() {
        const {navigation} = this.props;
        this.setState({errorCheck: false});
        await deletePreferredProvider(this.serviceProvider, this.displayError, navigation);
    }

    renderHeader() {
        return (
            <View>
                <Image 
                    source={this.serviceProvider.logo}
                    style={Platform.OS === 'web'
                    ? this.styles.companyImageWeb
                    : this.styles.companyImage} 
                    resizeMode='cover'
                />
                <View>
                    <Text style={this.styles.companyName}>{this.serviceProvider.name}</Text>
                </View>
                <View style={this.styles.horizontalLine}/>
                <View style={this.styles.payRateContainer}>
                    <Text style={this.styles.payRate}>${this.serviceProvider.payRate}/hour</Text>
                    <Text style={this.styles.starting}> starting cost</Text>
                </View>
            </View>
        );
    }

    renderError () {
        const {errorMsg, errorCheck} = this.state;
        return <View style={{alignSelf:'center'}}>
            <HelperText 
                type='error' 
                visible={errorCheck} 
                style={this.styles.errorStyle}>
                    {errorMsg}
            </HelperText>
        </View>;
    }

    renderBody() {
        return (
            <View>
                <View style={this.styles.subContainer}>
                    <Text style={this.styles.formTitle}>{preferredProviderStrings.overview}</Text>
                    <Text style={this.styles.detailText}>Hired {this.serviceProvider.timesHired} times{'\n'}Founded: {this.serviceProvider.founded.toString()}</Text>
                </View>
                <View style={this.styles.subContainer}>
                    <Text style={this.styles.formTitle}>{preferredProviderStrings.companyEmail}</Text>
                    <Text style={this.styles.detailText}>{this.serviceProvider.email}</Text>
                </View>
                <View style={this.styles.subContainer}>
                    <Text style={this.styles.formTitle}>{preferredProviderStrings.phoneNum}</Text>
                    <Text style={this.styles.detailText}>{this.serviceProvider.phoneNum} Repair</Text>
                </View>
                <View style={this.styles.subContainer}>
                    <Text style={this.styles.formTitle}>{preferredProviderStrings.license}</Text>
                    <Text style={this.styles.detailText}>#{this.serviceProvider.contractLic}</Text>
                </View>
                <View style={this.styles.subContainer}>
                    <Text style={this.styles.formTitle}>{preferredProviderStrings.skills}</Text>
                    <Text style={this.styles.detailText}>{this.serviceProvider.skills}</Text>
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
                    title={preferredProviderStrings.title} 
                    closeButtonPressedCallBack={() => navigation.goBack()} 
                    titleStyle={this.styles.cardTitle}
                    titleContainerStyle={this.styles.cardTitleContainer}
                    wrapperStyle={this.styles.cardWrapperStyle}
                    >
                    {this.renderHeader()}
                    {this.renderBody()}
                    <ThinButton
                        name={this.submitButton.name}
                        onClick={this.submitButton.onClick}
                        buttonStyle={this.submitButton.buttonStyle}
                        buttonTextStyle={this.submitButton.buttonTextStyle}
                        containerStyle={this.submitButton.containerStyle}
                    />
                </Card>
            </ScrollView>
        </View>);
    }
}

export default prepareNavigationHandlerComponent(ServiceRequestModalBase);
