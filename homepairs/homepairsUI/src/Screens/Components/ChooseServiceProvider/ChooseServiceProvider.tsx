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
import { ServiceRequestButton, ServiceProviderButton } from 'src/Elements';

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
});

export type ServiceProviderRadioState = {
    preferredProvidersSelected: boolean,
}

export type ServiceProviderRadioProps = {
    parentCallBack?: (childData: string) => any;
    serviceProviders: ServiceProvider[],
}

const initialState: ServiceProviderRadioState = {
    preferredProvidersSelected: true,
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
        parentCallBack: (childData: string) => { return childData; },
        serviceProviders: [],
    }

    constructor(props: Readonly<ServiceProviderRadioProps>) {
        super(props);
        this.state = initialState;
        this.onPressNetwork = this.onPressNetwork.bind(this);
        this.onPressPreferred = this.onPressPreferred.bind(this);
    }

    onPressNetwork() {
        this.setState({ preferredProvidersSelected: false });
    }

    onPressPreferred() {
        this.setState({ preferredProvidersSelected: true });
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
                        onPress={this.onPressPreferred}>
                        <Text style={preferredProvidersSelected ?
                            styles.selectedText : styles.unselectedText}>
                            {"Preferred"}
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        testID='service-radio-completed'
                        style={rightButtonStyle}
                        onPress={this.onPressNetwork}>
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

        return (
            preferredProvidersSelected ? this.renderPreferredProviders()
                : (
                    <View style={styles.textContainer}>
                        <Text>
                            {"\tYour request will be sent to the Roopairs network. When your service request is ready, you will be able to choose from a handful of bids from qualified service professionals."}
                        </Text>
                    </View>
                )
        );
    }

    // eslint-disable-next-line class-methods-use-this
    renderPreferredProviders() {
        const {serviceProviders, parentCallBack} = this.props;
        const filteredServiceProviders = serviceProviders; // TO DO IMPLEMENT FILTER

        return (
            filteredServiceProviders.map(
                serviceProvider => {
                    return (<ServiceProviderButton onClick={parentCallBack} key={serviceProvider.name} serviceProvider={serviceProvider} />);
                }));
    }

    render() {
        const { preferredProvidersSelected } = this.state;

        return (
            <ScrollView style={{ flexGrow: 1 }}>
                <View style={styles.addBottomMargin}>
                    {this.renderProviderTypeRadioButton(preferredProvidersSelected)}
                    {this.renderServiceProviders()}
                </View>
            </ScrollView>
        );
    }
}