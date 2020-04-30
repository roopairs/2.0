import React from "react";
import { ScrollView, View, Text} from 'react-native';
import { ThinButtonProps, Card, ThinButton, ImageTile} from 'homepairs-elements';
import strings from 'homepairs-strings';
import * as BaseStyles from 'homepairs-base-styles';
import { HomePairsDimensions} from 'homepairs-types';
import Colors from 'homepairs-colors';
import {prepareNavigationHandlerComponent, NavigationRouteScreenProps} from 'homepairs-routes';
import {deletePreferredProvider} from 'homepairs-endpoints';
import {HelperText} from 'react-native-paper';
import {servprov} from 'homepairs-images';
import setInputStyles from './styles';
import { Tile } from "react-native-elements";

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
                <View style={this.styles.tileContainer} >
                    <ImageTile image={servprov} enlarge/>
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

export default prepareNavigationHandlerComponent(ServiceRequestModalBase);
