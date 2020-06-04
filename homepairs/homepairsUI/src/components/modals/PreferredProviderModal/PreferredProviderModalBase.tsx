import React from "react";
import { ScrollView, View, Text, Platform} from 'react-native';
import { ThinButtonProps, Card, ThinButton, ImageTile} from 'src/elements';
import strings from 'homepairs-strings';
import * as BaseStyles from 'homepairs-base-styles';
import { HomePairsDimensions, ServiceProvider, ProviderDictionary  } from 'homepairs-types';
import Colors from 'homepairs-colors';
import {NavigationRouteScreenProps, NavigationRouteHandler} from 'src/routes';
import {HelperText} from 'react-native-paper';
import setInputStyles from './styles';


export type PreferredProviderModalDispatchProps = {
    onRemoveServiceProvider: (
        token: string,
        serviceProvider: ServiceProvider, 
        displayError: (error:string) => void,
        navigation: NavigationRouteHandler) => any
}

export type PreferredProviderStateProps = {
    preferredProvider: ProviderDictionary,
    token: string,
}

export type PreferredProviderProps = NavigationRouteScreenProps & PreferredProviderModalDispatchProps & PreferredProviderStateProps;

type PreferredProviderModalState = {
    errorMsg: string, 
    errorCheck: boolean
}

const initialState : PreferredProviderModalState = {
    errorMsg: '', 
    errorCheck: false,
};

const preferredProviderStrings = strings.preferredProviderModal;

export class PreferredProvidertModalBase extends React.Component<PreferredProviderProps, PreferredProviderModalState> {
    styles;

    serviceProvider;

    servicePhoneNum;

    token;

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

    constructor(props: Readonly<PreferredProviderProps>) {
        super(props);
        this.styles = setInputStyles(null);
        this.servicePhoneNum = props.navigation.getParam('serviceProvider');
        this.token = props.navigation.getParam('token');
        this.serviceProvider = props.preferredProvider[this.servicePhoneNum];
        this.state = initialState;
        this.setInitialState = this.setInitialState.bind(this);
        this.displayError = this.displayError.bind(this);
        this.clickRemoveButton = this.clickRemoveButton.bind(this);
    }

    setInitialState() {
        this.setState(initialState);
    }

    displayError(msg: string) {
        this.setState({errorMsg: msg, errorCheck: true});
    }

    clickRemoveButton() {
        const {navigation, onRemoveServiceProvider, token} = this.props;
        this.setState({errorCheck: false});
        console.log('Clciked');
        console.log(this.token);
        onRemoveServiceProvider(token, this.serviceProvider, this.displayError, navigation);
        console.log('Clciked after request');

    }

    renderHeader() {
        const {logo} = this.serviceProvider;
        const image = Platform.OS === 'web' ? logo : {uri: logo} ;
        return (
            <View>
                <View style={this.styles.tileContainer} >
                    <ImageTile image={image} enlarge/>
                </View>
                <View>
                    <Text style={this.styles.companyName}>{this.serviceProvider.name}</Text>
                </View>
                <View style={this.styles.horizontalLine}/>
                <View style={this.styles.payRateContainer}>
                    <Text style={this.styles.payRate}>${this.serviceProvider.payRate} / hour</Text>
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
        const {founded, email, phoneNum, contractLic, skills} = this.serviceProvider;
        const dateFounded = new Date(this.serviceProvider.founded);

        return (
            <View>
                <View style={this.styles.subContainer}>
                    <Text style={this.styles.formTitle}>{preferredProviderStrings.overview}</Text>
                    <Text style={this.styles.detailText}>Founded: {dateFounded.toDateString()}</Text>
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
                <>
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
            </>
       );
    }
}

