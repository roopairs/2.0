import React, { Component } from 'react';
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import {
    HomePairsDimensions, ServiceRequest, Appliance, ApplianceType, ServiceRequestStatusEnums, ServiceProvider,
} from 'homepairs-types';
import * as BaseStyles from 'homepairs-base-styles';
import Colors from 'homepairs-colors';
import { ServiceRequestButton, ServiceProviderButton, ThinButton, ThinButtonProps } from 'homepairs-elements';
import { HomePairFonts } from 'res/fonts';

const colors = BaseStyles.LightColorTheme;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: BaseStyles.MarginPadding.small,
    },
    pallet: {
        backgroundColor: colors.secondary,
        width: BaseStyles.ContentWidth.max,
        flex: 1,
        maxWidth: HomePairsDimensions.MAX_CONTENT_SIZE,
        alignSelf: 'center',
    },
    addBottomMargin: {
        flex: 1,
        marginBottom: BaseStyles.MarginPadding.largeConst,
    },
    buttonContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        paddingTop: BaseStyles.MarginPadding.xsmallConst,
        width: BaseStyles.ContentWidth.max,
    },
    textContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        marginTop: BaseStyles.MarginPadding.large,
        width: BaseStyles.ContentWidth.max,
    },
    title: {
        fontFamily: BaseStyles.FontTheme.primary,
        color: colors.lightGray,
    },
    option: {
        fontSize : BaseStyles.FontTheme.reg,
        fontFamily: HomePairFonts.nunito_regular,
    },
    selectedLeftButton: {
        alignItems: 'flex-start',
        justifyContent: 'center',
        backgroundColor: colors.primary,
        padding: BaseStyles.MarginPadding.mediumConst,
        width: BaseStyles.ContentWidth.half,
        borderTopLeftRadius: BaseStyles.BorderRadius.small,
        borderBottomLeftRadius: BaseStyles.BorderRadius.small,
        borderWidth: 1,
        borderColor: colors.lightGray,
        height: 40,
    },
    selectedRightButton: {
        alignItems: 'flex-end',
        justifyContent: 'center',
        backgroundColor: colors.primary,
        padding: BaseStyles.MarginPadding.mediumConst,
        width: BaseStyles.ContentWidth.half,
        borderTopRightRadius: BaseStyles.BorderRadius.small,
        borderBottomRightRadius: BaseStyles.BorderRadius.small,
        borderWidth: 1,
        borderColor: colors.lightGray,
        height: 40,
    },
    selectedText: {
        color: colors.secondary,
        fontSize: BaseStyles.FontTheme.reg,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
    },
    unselectedLeftButton: {
        alignItems: 'flex-start',
        justifyContent: 'center',
        backgroundColor: colors.transparent,
        padding: BaseStyles.MarginPadding.mediumConst,
        width: BaseStyles.ContentWidth.half,
        borderTopLeftRadius: BaseStyles.BorderRadius.small,
        borderBottomLeftRadius: BaseStyles.BorderRadius.small,
        borderWidth: 1,
        borderColor: colors.lightGray,
        height: 40,
    },
    unselectedRightButton: {
        alignItems: 'flex-end',
        justifyContent: 'center',
        backgroundColor: colors.transparent,
        padding: BaseStyles.MarginPadding.mediumConst,
        width: BaseStyles.ContentWidth.half,
        borderTopRightRadius: BaseStyles.BorderRadius.small,
        borderBottomRightRadius: BaseStyles.BorderRadius.small,
        borderWidth: 1,
        borderColor: colors.lightGray,
        height: 40,
    },
    unselectedText: {
        color: colors.lightGray,
        fontSize: BaseStyles.FontTheme.reg,
        alignSelf: 'center',
    },
    networkText: {
        textAlign: 'center',
        alignSelf:'center', 
        fontFamily: BaseStyles.FontTheme.primary,
        fontSize: BaseStyles.FontTheme.reg,
    },
});

export type ServiceProviderRadioState = {
    preferredProvidersSelected: boolean,
    providerName: string,
    clicked: boolean,
}

export type ServiceProviderRadioProps = {
    parentCallBack?: (childData: number) => any;
    serviceProviders: ServiceProvider[],
}

const initialState: ServiceProviderRadioState = {
    preferredProvidersSelected: true,
    providerName: '',
    clicked: false,
};

function filterTabbedObjects(unfilteredServiceProviders: ServiceRequest[]) {
    const filteredServiceProviders: ServiceRequest[] = unfilteredServiceProviders.filter(sp => sp);
    /* TO DO - IMPLEMENT THIS ONCE WE CAN FILTER SERVICE PROVIDERS. RIGHT NOW, THEY ONLY HAVE A SKILL FIELD,
       BUT NOT NECESSARILY ANY FIELD THAT CAN CORRESPOND WITH REQUEST OR APPLIANCE TYPES */
    return filteredServiceProviders;
}

/**
 * ------------------------------------------------------------
 * Choose Service Provider Component 
 * ------------------------------------------------------------
 * A visual component that shows the user two tabs for navigating the type of service provider they would like to ß
 */

export default class ChooseServiceProvider extends Component<ServiceProviderRadioProps, ServiceProviderRadioState> {

    // eslint-disable-next-line react/static-property-placement
    static defaultProps: ServiceProviderRadioProps = {
        parentCallBack: (childData: number) => { return childData; },
        serviceProviders: [],
    }

    constructor(props: Readonly<ServiceProviderRadioProps>) {
        super(props);
        this.state = initialState;
        this.onPressNetwork = this.onPressNetwork.bind(this);
        this.onPressPreferred = this.onPressPreferred.bind(this);
        this.selectProvider = this.selectProvider.bind(this);
    }

    onPressNetwork() {
        this.setState({ preferredProvidersSelected: false });
    }

    onPressPreferred() {
        this.setState({ preferredProvidersSelected: true });
    }

    selectProvider(provId: number, name: string) {
        const { parentCallBack } = this.props;
        parentCallBack(provId);
        this.setState({ providerName: name, clicked: true });
    }

    renderProviderTypeRadioButton(preferredProvidersSelected: boolean) {
        const leftButtonStyle = preferredProvidersSelected ? styles.selectedLeftButton : styles.unselectedLeftButton;
        const rightButtonStyle = preferredProvidersSelected ? styles.unselectedRightButton : styles.selectedRightButton;
        return (
            <View style={styles.container}>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        testID='service-radio-current'
                        style={leftButtonStyle}
                        onPressIn={this.onPressPreferred}>
                        <Text style={preferredProvidersSelected ?
                            styles.selectedText : styles.unselectedText}>
                            {"Preferred"}
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        testID='service-radio-completed'
                        style={rightButtonStyle}
                        onPressIn={this.onPressNetwork}>
                        <Text style={preferredProvidersSelected ?
                            styles.unselectedText : styles.selectedText}>
                            {"Network"}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        );

    }

    renderServiceProviders() {
        const { preferredProvidersSelected } = this.state;

        const buttonProps: ThinButtonProps = {name : 'Continue',
        containerStyle: {
            flex: 1,
            alignSelf: 'center',
            justifyContent: 'center',
            marginTop: BaseStyles.MarginPadding.largeConst,
            marginBottom: BaseStyles.MarginPadding.xlarge,
            minHeight: 50,
        }, 
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
        }};

        return (
            preferredProvidersSelected ? this.renderPreferredProviders()
                : (
                    <View>
                        <View style={styles.textContainer}>
                            <Text style={styles.networkText}>
                                {"\tYour request will be sent to the Roopairs network. When your service request is ready, you will be able to choose from a handful of bids from qualified service professionals."}
                            </Text>
                        </View>
                        <ThinButton
                            onClick={() => this.selectProvider(-1, "Network")}
                            name={buttonProps.name}
                            containerStyle={buttonProps.containerStyle}
                            buttonStyle={buttonProps.buttonStyle}
                            buttonTextStyle={buttonProps.buttonTextStyle}
                        />
                    </View>
                )
        );
    }



    // eslint-disable-next-line class-methods-use-this
    renderPreferredProviders() {
        const { serviceProviders } = this.props;
        const filteredServiceProviders = serviceProviders; // TO DO IMPLEMENT FILTER

        return (
            filteredServiceProviders.map(
                serviceProvider => {
                    return (<ServiceProviderButton onClick={this.selectProvider} key={serviceProvider.name} serviceProvider={serviceProvider} />);
                }));
    }

    render() {
        const { preferredProvidersSelected, clicked, providerName } = this.state;

        return clicked ? (
            <View style={{ alignSelf: 'center', width: BaseStyles.ContentWidth.reg }}>
                <Text style={styles.option}>{providerName}</Text>
            </View>) : (
                <ScrollView style={{ flexGrow: 1 }}>
                    <View style={styles.addBottomMargin}>
                        {this.renderProviderTypeRadioButton(preferredProvidersSelected)}
                        {this.renderServiceProviders()}
                    </View>
                </ScrollView>
            );
    }
}