import React, {Component} from 'react'; //* *For every file that uses jsx, YOU MUST IMPORT REACT  */
import { HeaderState, Property, ApplianceType, ServiceRequest } from 'homepairs-types';
import strings from 'homepairs-strings';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { NavigationRouteScreenProps, NavigationRouteHandler } from 'homepairs-utilities';
import {AddressPanel} from 'homepairs-elements';
import * as BaseStyles from 'homepairs-base-styles';

export type NewRequestDispatchProps = {
    header: HeaderState, 
    onCreateServiceRequest: (newServReq: ServiceRequestBase, setInitialState: () => void, 
        displayError: (msg: string) => void, navigation: NavigationRouteHandler) => void
};

export type PropertyState = {
    properties: Property[]
};

type NewRequestState = {
    address: string, 
    serviceCategory: ApplianceType,
    applianceId: string,
    serviceProvider: string, 
    serviceType: string, 
    description: string, 
    serviceDate: Date, 
    serviceName: string, 
    phoneNumber: string
};

type Props = NavigationRouteScreenProps & NewRequestDispatchProps & PropertyState;

const serviceRequestStrings = strings.serviceRequestPage;

export default class ServiceRequestBase extends Component<Props, NewRequestState> {
    styles = StyleSheet.create({
        scrollContainer: {
            padding: BaseStyles.MarginPadding.large,
        },
    });

    addressRef;

    serviceCategoryRef;

    applianceIdRef;

    serviceProviderRef;

    serviceTypeRef;

    descriptionRef;

    serviceDateRef;

    serviceNameRef;

    phoneNumberRef;

    constructor(props: Readonly<Props>) {
        super(props);
        
        this.getFormCategory = this.getFormCategory.bind(this);
        this.getFormAddress = this.getFormAddress.bind(this);
        this.getFormAppliance = this.getFormAppliance.bind(this);

        this.addressRef = React.createRef();
        this.serviceCategoryRef = React.createRef();
        this.applianceIdRef = React.createRef();
        this.serviceProviderRef = React.createRef();
        this.serviceTypeRef = React.createRef();
        this.descriptionRef = React.createRef();
        this.serviceDateRef = React.createRef();
        this.serviceNameRef = React.createRef();
        this.phoneNumberRef = React.createRef();
    }

    getFormAddress(childData : string) {
        this.setState({address: childData});
    }

    getFormCategory(childData : ApplianceType) {
        this.setState({serviceCategory: childData});
    }

    getFormAppliance(childData: string) {
        this.setState({applianceId: childData});
    }

    getFormServiceProvider(childData: string) {
        this.setState({serviceProvider: childData});
    }

    getFormServiceType(childData: string) {
        this.setState({serviceType: childData});
    }

    getFormDescription(childData: string) {
        this.setState({description: childData});
    }

    getFormDate(childData: Date) {
        this.setState({serviceDate: childData});
    }

    getFormServiceName(childData: string) {
        this.setState({serviceName: childData});
    }

    getFormPhoneNumber(childData: string) {
        this.setState({phoneNumber: childData});
    }

    validateForms() {
        return true;
    }

    clickSubmitButton() {
        const {address, serviceCategory, applianceId, serviceProvider, serviceType, description, serviceDate, serviceName, phoneNumber} = this.state;
    }

    render() {
        const {properties} = this.props;
        return (
            <ScrollView style={this.styles.scrollContainer}>
                <AddressPanel properties={properties} parentCallBack={this.getFormAddress}/>
            </ScrollView>
        );
    }
}