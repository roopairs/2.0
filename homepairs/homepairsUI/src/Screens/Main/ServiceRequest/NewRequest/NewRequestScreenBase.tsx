import React, {Component} from 'react'; //* *For every file that uses jsx, YOU MUST IMPORT REACT  */
import { HeaderState, Property, ApplianceType, ServiceRequest } from 'homepairs-types';
import strings from 'homepairs-strings';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { NavigationRouteScreenProps, NavigationRouteHandler } from 'homepairs-utilities';
import {AddressPanel, InputForm, InputFormProps} from 'homepairs-elements';
import * as BaseStyles from 'homepairs-base-styles';
import {ChooseServiceCategory} from 'homepairs-components';
import ServiceTypePanel from 'src/Elements/Panels/ServiceTypePanel';

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

const styles = StyleSheet.create({
    scrollContainer: {
        padding: BaseStyles.MarginPadding.large,
    },
    formTitle: {
        fontFamily: BaseStyles.FontTheme.primary,
        fontSize: BaseStyles.FontTheme.reg,
        color: '#AFB3B5',
        paddingVertical: BaseStyles.MarginPadding.medium,
    },
});

type Props = NavigationRouteScreenProps & NewRequestDispatchProps & PropertyState;

const serviceRequestStrings = strings.serviceRequestPage;

export default class ServiceRequestBase extends Component<Props, NewRequestState> {

    addressRef;

    serviceCategoryRef;

    applianceIdRef;

    serviceProviderRef;

    serviceTypeRef;

    descriptionRef;

    serviceDateRef;

    serviceNameRef;

    phoneNumberRef;

    formProps : InputFormProps = {
        inputStyle: {
            alignItems: 'center',
            alignSelf: 'center',
            margin: 1,
            minWidth: 40,
            width: '100%',
            height: 100,
            borderColor: '#AFB3B5',
            borderWidth: 1,
            borderRadius: 4,
            paddingHorizontal: 10,
        },
        numberOfLines: 3, 
        multiline: true,
    }

    constructor(props: Readonly<Props>) {
        super(props);
        
        this.getFormCategory = this.getFormCategory.bind(this);
        this.getFormAddress = this.getFormAddress.bind(this);
        this.getFormAppliance = this.getFormAppliance.bind(this);
        this.getFormServiceType = this.getFormServiceType.bind(this);
        
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
            <ScrollView style={styles.scrollContainer}>
                <Text style={styles.formTitle}>ADDRESS</Text>
                <AddressPanel properties={properties} parentCallBack={this.getFormAddress}/>
                <Text style={styles.formTitle}>CHOOSE SERVICE CATEGORY</Text>
                <ChooseServiceCategory onPress={this.getFormCategory}/>
                <Text style={styles.formTitle}>CHOOSE SERVICE TYPE</Text>
                <ServiceTypePanel parentCallBack={this.getFormServiceType}/>
                <Text style={styles.formTitle}>WHAT HAPPENED?</Text>
                <InputForm 
                    numberOfLines={this.formProps.numberOfLines} 
                    inputStyle={this.formProps.inputStyle}
                    multiline={this.formProps.multiline}
                    />
            </ScrollView>
        );
    }
}