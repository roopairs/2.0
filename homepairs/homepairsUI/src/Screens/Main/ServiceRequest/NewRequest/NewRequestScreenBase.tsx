import React, {Component} from 'react'; //* *For every file that uses jsx, YOU MUST IMPORT REACT  */
import { HeaderState, Property, ApplianceType, ServiceRequest, HomePairsDimensions } from 'homepairs-types';
import strings from 'homepairs-strings';
import Colors from 'homepairs-colors';
import 'react-widgets/dist/css/react-widgets.css';
import { StyleSheet, Text, View, ScrollView, Platform } from 'react-native';
import { NavigationRouteScreenProps, NavigationRouteHandler } from 'homepairs-utilities';
import {AddressPanel, InputForm, InputFormProps, ThinButton, ThinButtonProps} from 'homepairs-elements';
import * as BaseStyles from 'homepairs-base-styles';
import {ChooseServiceCategory, ChooseAppliance} from 'homepairs-components';
import {DateTimePicker} from 'react-widgets';
import {DatePicker} from 'react-native-datepicker';
import Moment from 'moment';
import momentLocalizer from 'react-widgets-moment';

Moment.locale('en');
momentLocalizer();


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
    selectedPropId: string, 
    serviceCategory: ApplianceType,
    applianceId: string,
    serviceProvider: string, 
    serviceType: string, 
    description: string, 
    serviceDate: Date, 
    clientName: string, 
    phoneNumber: string
};

const initialState : NewRequestState = {
    address: '', 
    selectedPropId: '',
    serviceCategory: ApplianceType.None, 
    applianceId: '', 
    serviceProvider: '', 
    serviceType: '',
    description: '', 
    serviceDate: null, 
    clientName: '', 
    phoneNumber: '',
};

const styles = StyleSheet.create({
    scrollContainer: {
        padding: BaseStyles.MarginPadding.large,
    },
    datePickerContainer: {
        padding: BaseStyles.MarginPadding.medium,
        backgroundColor: 'red',
    },
    iconImage: {
        height: 20, 
        width: 20, 
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

    clientNameRef;

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
        maxLength: 500,
    }

    buttonProps: ThinButtonProps = {
        name: 'Send Request', 
        onClick: () => {}, 
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
        },
    }

    constructor(props: Readonly<Props>) {
        super(props);
        
        this.getFormAddress = this.getFormAddress.bind(this);
        this.getFormCategory = this.getFormCategory.bind(this);
        this.getFormAppliance = this.getFormAppliance.bind(this);
        this.getFormServiceProvider = this.getFormServiceProvider.bind(this);
        this.getFormServiceType = this.getFormServiceType.bind(this);
        this.getFormDescription = this.getFormDescription.bind(this);
        this.getFormDate = this.getFormDate.bind(this);
        this.getFormClientName = this.getFormClientName.bind(this);
        this.getFormPhoneNumber = this.getFormPhoneNumber.bind(this);
        this.state = initialState;
        this.addressRef = React.createRef();
        this.serviceCategoryRef = React.createRef();
        this.applianceIdRef = React.createRef();
        this.serviceProviderRef = React.createRef();
        this.serviceTypeRef = React.createRef();
        this.descriptionRef = React.createRef();
        this.serviceDateRef = React.createRef();
        this.clientNameRef = React.createRef();
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

    getFormClientName(childData: string) {
        this.setState({clientName: childData});
    }

    getFormPhoneNumber(childData: string) {
        this.setState({phoneNumber: childData});
    }

    validateForms() {
        return true;
    }

    clickSubmitButton() {
        const {address, serviceCategory, applianceId, serviceProvider, serviceType, description, serviceDate, clientName, phoneNumber} = this.state;
    }

    renderDatePicker() {
        const {serviceDate} = this.state;
        const startDate = new Date();
        const maxDate = new Date();
        startDate.setHours(0, 0, 0);
        maxDate.setDate(startDate.getDate() + 90);
        maxDate.setHours(0, 0, 0);
        if (Platform.OS === 'web') {
            const picker = <DateTimePicker 
                key='web datetime picker'
                dropDown
                placeholder='Choose a date and time'
                value={serviceDate}
                onChange={value => this.getFormDate(value)}
                min={startDate}
                time
            />;
            return picker;
        }
        return <DatePicker 
            key='mobile date time picker'
            minDate={startDate}
            maxDate={startDate.setDate(startDate.getDate() + 90)}
            onDateChange={(date) => this.getFormDate(date)}
            mode='datetime'
            confirmBtnText='Confirm'
            cancelBtnText='Cancel'
            placeholder='Choose a date and time'        
        />;
    }

    render() {
        const {properties} = this.props;
        return (
            <ScrollView style={styles.scrollContainer}>
                <Text>Address</Text>
                <AddressPanel properties={properties} parentCallBack={this.getFormAddress}/>
                <Text>Choose service Category</Text>
                <ChooseServiceCategory onPress={this.getFormCategory}/>
                <Text>Choose an appliance (if applicable)</Text>
                <Text>What happened?</Text>
                <InputForm 
                    parentCallBack={this.getFormDescription}
                    numberOfLines={this.formProps.numberOfLines} 
                    inputStyle={this.formProps.inputStyle}
                    multiline={this.formProps.multiline}
                    maxLength={this.formProps.maxLength}
                    />
                <Text>When do you need it fixed?</Text>
                <>{this.renderDatePicker()}</>
                <Text>Who should they ask for?</Text>
                <InputForm
                    parentCallBack={this.getFormClientName}
                />
                <ThinButton 
                    name={this.buttonProps.name}
                    onClick={this.buttonProps.onClick}
                    containerStyle={this.buttonProps.containerStyle}
                    buttonStyle={this.buttonProps.buttonStyle}
                    buttonTextStyle={this.buttonProps.buttonTextStyle}
                />
            </ScrollView>
        );
    }
}