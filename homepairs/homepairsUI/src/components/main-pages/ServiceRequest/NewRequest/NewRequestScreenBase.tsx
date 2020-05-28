import React, { Component } from 'react'; //* *For every file that uses jsx, YOU MUST IMPORT REACT  */
import { Property, ApplianceType, NewServiceRequest, HomePairsDimensions, Appliance, ServiceProvider, AccountTypes } from 'homepairs-types';
import Colors from 'homepairs-colors';
import { StyleSheet, Text, View, ScrollView} from 'react-native';
import { stringToCategory, isEmptyOrSpaces, categoryToString, isPositiveWholeNumber, isPhoneNumberValid, isAlphaCharacterOnly } from 'src/utility';
import {NavigationRouteScreenProps} from 'homepairs-routes';
import {AddressPanel, InputForm, InputFormProps, ThinButton, ThinButtonProps, ServiceTypePanel, DatePicker} from 'homepairs-elements';
import * as BaseStyles from 'homepairs-base-styles';
import { HelperText } from 'react-native-paper';
import axios from 'axios';
import { HOMEPAIRS_PROPERTY_ENDPOINT, postNewServiceRequest, HOMEPAIRS_PREFERRED_PROVIDER_ENDPOINT } from 'homepairs-endpoints';
import {ChooseServiceCategory, ChooseAppliance, ChooseServiceProvider} from './components';

type NewRequestState = {
    address: string,
    addressState: boolean,
    propId: string,
    serviceCategory: ApplianceType,
    serviceCategoryState: boolean,
    applianceId: string,
    applianceState: boolean,
    providerId: number,
    providerState: boolean,
    serviceType: string,
    serviceTypeState: boolean,
    details: string,
    detailsState: boolean,
    serviceDate: Date,
    dateState: boolean,
    poc: string, 
    pocState: boolean,
    pocName: string,
    pocNameState: boolean,
    appliances: Appliance[],
    errorMsg: string,
    errorCheck: boolean,
    serviceProviders: ServiceProvider[],
};

const initialState: NewRequestState = {
    address: '',
    addressState: false,
    propId: '',
    serviceCategory: ApplianceType.None,
    serviceCategoryState: false,
    applianceId: '',
    applianceState: false,
    providerId: -1,
    providerState: false,
    serviceType: '',
    serviceTypeState: false,
    details: '',
    detailsState: false,
    serviceDate: null,
    dateState: false,
    poc: '', 
    pocState: false,
    pocName: '',
    pocNameState: false,
    appliances: [],
    errorMsg: '',
    errorCheck: false,
    serviceProviders: [],
};

const styles = StyleSheet.create({
    scrollContainer: {
        padding: BaseStyles.MarginPadding.large,
    },
    formTitle: {
        fontFamily: BaseStyles.FontTheme.primary,
        fontSize: BaseStyles.FontTheme.reg,
        color: '#AFB3B5',
        paddingVertical: BaseStyles.MarginPadding.large,
    },
    datePickerContainer: {
        padding: BaseStyles.MarginPadding.medium,
        backgroundColor: 'red',
    },
    iconImage: {
        height: 20,
        width: 20,
    },
    errorStyle: {
        fontFamily: BaseStyles.FontTheme.secondary,
        fontSize: 16,
    },
    option: {
        fontSize : BaseStyles.FontTheme.reg,
        fontFamily: BaseStyles.FontTheme.primary,
    },
    input: {
        alignItems: 'center',
        alignSelf: 'center',
        margin: BaseStyles.MarginPadding.xsmallConst,
        minWidth: 40,
        width: BaseStyles.ContentWidth.max,
        height: 40,
        borderColor: BaseStyles.LightColorTheme.lightGray,
        borderWidth: 1,
        borderRadius: BaseStyles.BorderRadius.small,
        paddingHorizontal: BaseStyles.MarginPadding.mediumConst,
    },
});

export type NewRequestScreenStateProps = {
    accountType: AccountTypes,
    properties: Property[],
    token: string,
    pmId: number,
    phoneNumber: string,
}

export type NewRequestScreenProps =
    & NavigationRouteScreenProps
    & NewRequestScreenStateProps

export class NewServiceRequestBase extends Component<NewRequestScreenProps, NewRequestState> {

    addressRef;

    serviceCategoryRef;

    applianceIdRef;

    serviceProviderRef;

    serviceTypeRef;

    descriptionRef;

    serviceDateRef;

    pocRef;

    pocNameRef;

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
            padding: 10,
        },
        numberOfLines: 3,
        multiline: true,
        maxLength: 500,
    }

    buttonProps: ThinButtonProps = {
        name: 'Send Request',
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

    constructor(props: Readonly<NewRequestScreenProps>) {
        super(props);

        this.getFormAddress = this.getFormAddress.bind(this);
        this.getFormCategory = this.getFormCategory.bind(this);
        this.getFormAppliance = this.getFormAppliance.bind(this);
        this.getFormServiceType = this.getFormServiceType.bind(this);
        this.getFormServiceProvider = this.getFormServiceProvider.bind(this);
        this.getFormDescription = this.getFormDescription.bind(this);
        this.getFormDate = this.getFormDate.bind(this);
        this.getPOC = this.getPOC.bind(this);
        this.getPOCName = this.getPOCName.bind(this);
        this.fetchAppliances = this.fetchAppliances.bind(this);
        this.displayError = this.displayError.bind(this);
        this.fetchServiceProviders = this.fetchServiceProviders.bind(this);

        // Fix the address if only one address is included in the property. 
        this.state = (props.properties.length === 1) ? 
            {...initialState, address: props.properties[0].address, addressState: true, propId: props.properties[0].propId} 
            : 
            initialState;

        this.addressRef = React.createRef();
        this.serviceCategoryRef = React.createRef();
        this.applianceIdRef = React.createRef();
        this.serviceProviderRef = React.createRef();
        this.serviceTypeRef = React.createRef();
        this.descriptionRef = React.createRef();
        this.serviceDateRef = React.createRef();
        this.pocRef = React.createRef();
        this.pocNameRef = React.createRef();
    }

    componentDidMount() {
        const {properties, accountType} = this.props;

        if(accountType === AccountTypes.Tenant){
            const [tenantProperty] = properties;
            const {address, propId} = tenantProperty; 
            this.setState({address, addressState: true, propId});
        }

        this.fetchServiceProviders();
    }

    async getFormAddress(childData: string, propId: string) {
        this.setState({ address: childData, propId, addressState: true });
        await this.fetchAppliances(propId);
    }

    getFormCategory(childData: ApplianceType) {
        this.setState({ serviceCategory: childData, serviceCategoryState: true });
    }

    getFormAppliance(childData: string) {
        this.setState({ applianceId: childData, applianceState: true });
    }

    getFormServiceProvider(childData: number) {
        this.setState({ providerId: childData, providerState: true });
    }

    getFormServiceType(childData: string) {
        this.setState({ serviceType: childData, serviceTypeState: true });
    }

    getFormDescription(childData: string) {
        this.setState({ details: childData, detailsState: true });
    }

    getFormDate(childData: Date) {
        this.setState({ serviceDate: childData, dateState: true });
    }

    getPOC(childData: string) {
        this.setState({poc: childData, pocState: true});
    }

    getPOCName(childData: string) {
        this.setState({pocName: childData, pocNameState: true});
    }

    fetchAppliances = async (propId: string) => {
        if (propId !== '') {
            await axios.get(`${HOMEPAIRS_PROPERTY_ENDPOINT}${propId}`).then((result) => {
                const { appliances } = result.data;
                const applianceInfo: Appliance[] = [];
                appliances.forEach(appliance => {
                    const { appId, category, name, manufacturer, modelNum, serialNum, location } = appliance;

                    applianceInfo.push({
                        applianceId: appId,
                        category: stringToCategory(category),
                        appName: name, manufacturer, modelNum, serialNum, location,
                    });
                });
                this.setState({ appliances: applianceInfo });
            });
        }
    };

    fetchServiceProviders = async () => {
        const {pmId} = this.props;
        await axios.get(`${HOMEPAIRS_PREFERRED_PROVIDER_ENDPOINT}${pmId}/`).then((result) =>{
            const {providers} = result.data;
            const providerInfo: ServiceProvider[] = [];
            providers.forEach(provider => {
                const { provId, prefId, name, email, phoneNum, contractLic, skills, founded, rate, timesHired, earliestHire, logo, address } = provider;
                providerInfo.push({provId, prefId, name, email, phoneNum, contractLic, skills, founded, payRate: rate, timesHired, earliestHire, logo, address});
            });
            this.setState({serviceProviders: providerInfo});
        });  
    };

    displayError(msg: string) {
        this.setState({ errorMsg: msg, errorCheck: true });
    }

    async clickSubmitButton() {
        const { serviceCategory, applianceId, providerId, serviceType, details, serviceDate, propId, poc, pocName} = this.state;
        const {navigation, token, accountType} = this.props;
        this.setState({errorCheck: false});
        if (this.validateForms()) {
            const pm = accountType === AccountTypes.PropertyManager;
            const newServiceRequest: NewServiceRequest = {
                token,
                propId,
                appId: applianceId,
                providerId,
                serviceType,
                serviceCategory: categoryToString(serviceCategory),
                serviceDate: serviceDate.toISOString(),
                details,
                poc, 
                pocName,
            };
            await postNewServiceRequest(newServiceRequest, this.displayError, navigation, pm).catch(error => console.log(error));
        }
    }

    validateForms() {
        const {address, serviceCategory, applianceId, providerId, serviceType, serviceDate, poc, pocName} = this.state;
        let check = true;
        if (isEmptyOrSpaces(address))
            check = false;
        if (serviceCategory === ApplianceType.None)
            check = false;
        if (isEmptyOrSpaces(applianceId))
            check = false;
        if (serviceDate === null)
            check = false;
        if (isEmptyOrSpaces(serviceType))
            check = false;
        if (!isPositiveWholeNumber(providerId.toString()))
            check = false;
        if(!isPhoneNumberValid(poc)) {
            this.pocRef.current.setError(true);
            check = false;
        }
        if (!isAlphaCharacterOnly(pocName)) {
            this.pocNameRef.current.setError(true);
            check = false;
        }
        return check;
    }

    renderError() {
        const { errorMsg, errorCheck } = this.state;
        return <View style={{ alignSelf: 'center' }}>
            <HelperText type='error' visible={errorCheck} style={styles.errorStyle}>{errorMsg}</HelperText>
        </View>;
    }

    render() {
        const {properties, accountType} = this.props;
        const {
            addressState,
            serviceCategoryState,
            applianceState,
            providerState,
            serviceTypeState,
            detailsState,
            dateState,
            appliances,
            serviceCategory,
            serviceProviders,
            serviceDate,
            pocState, 
            pocNameState,
        } = this.state;
        // TODO: Write Address Screen If only one property exists
        return (
            <View style={styles.scrollContainer}>
                <Text style={styles.formTitle}>ADDRESS</Text>
                {properties.length === 1 || accountType === AccountTypes.Tenant ? 
                    <View style={{alignSelf: 'center', width: BaseStyles.ContentWidth.reg}}>
                        <Text style={styles.option}>{properties[0].address}</Text> 
                    </View>
                    :
                    <AddressPanel properties={properties} parentCallBack={this.getFormAddress}/> 
                }
                {addressState ? 
                    <>
                        <Text style={styles.formTitle}>SERVICE CATEGORY</Text>
                        <ChooseServiceCategory onPress={this.getFormCategory} />
                    </> : <></>
                }
                {serviceCategoryState ?
                    <>
                        <Text style={styles.formTitle}>APPLIANCE (IF APPLICABLE)</Text>
                        <ChooseAppliance parentCallBack={this.getFormAppliance} applianceType={serviceCategory} appliances={appliances} />
                    </> : <></>
                }
                {applianceState ?
                    <>
                        <Text style={styles.formTitle}>SERVICE PROVIDER</Text>
                        <ChooseServiceProvider serviceProviders={serviceProviders} parentCallBack={this.getFormServiceProvider} />
                    </> : <></>


                }
                {providerState ?
                    <>
                        <Text style={styles.formTitle}>SERVICE TYPE</Text>
                        <ServiceTypePanel parentCallBack={this.getFormServiceType} />
                    </> : <></>

                }
                {serviceTypeState ?
                    <>
                        <View style={{ marginBottom: '-7.5%' }}>
                            <Text style={styles.formTitle}>WHAT HAPPENED?</Text>
                            <InputForm
                                parentCallBack={this.getFormDescription}
                                numberOfLines={this.formProps.numberOfLines}
                                inputStyle={this.formProps.inputStyle}
                                multiline={this.formProps.multiline}
                                maxLength={this.formProps.maxLength}
                            />
                        </View>
                    </> : <></>
                }
                {detailsState ?
                    <>
                        <Text style={styles.formTitle}>WHEN DO YOU WANT IT TO BE FIXED?</Text>
                        <DatePicker serviceDate={serviceDate} getFormDate={this.getFormDate}/> 
                        
                    </> : <></>
                }
                {dateState ? 
                <>
                    <Text style={styles.formTitle}>WHO SHOULD THEY ASK FOR?</Text>
                    <InputForm 
                        ref={this.pocNameRef}
                        parentCallBack={this.getPOCName}
                        inputStyle={styles.input}
                        errorMessage="Name cannot be empty"
                    />
                </> : <></>}
                {pocNameState ? 
                <>
                    <Text style={styles.formTitle}>WHAT&apos;S THEIR PHONE NUMBER?</Text>
                    <InputForm 
                        ref={this.pocRef}
                        parentCallBack={this.getPOC}
                        inputStyle={styles.input}
                        errorMessage="Must be valid, non-empty phone number"
                    />
                </> : <></>}
                {pocState ? 
                <>
                    {this.renderError()}
                    <ThinButton 
                        name={this.buttonProps.name}
                        onClick={async () => {await this.clickSubmitButton();}}
                        containerStyle={this.buttonProps.containerStyle}
                        buttonStyle={this.buttonProps.buttonStyle}
                        buttonTextStyle={this.buttonProps.buttonTextStyle}
                    />
                </> : <></>}
            </View>
        );
    }
}