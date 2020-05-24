import React from 'react';
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import { ServiceRequestButton, ServiceRequestAddressPanel, SearchForm} from 'homepairs-elements';
import {
    HomePairsDimensions,
    ServiceRequest,
    ServiceState,
    HeaderState,
    ServiceRequestStatus,
    ServiceRequestCompletionStatus,
    ServiceRequestStatusEnums,
    Property,
    MainAppStackType,
    AccountTypes,
} from 'homepairs-types';
import * as BaseStyles from 'homepairs-base-styles';
import strings from 'homepairs-strings';
import { SceneInjectedProps } from 'homepairs-components';
import { NavigationRouteScreenProps, navigationPages, MainAppStack } from 'homepairs-routes';
import { fetchServiceRequests } from 'homepairs-endpoints';
import { stringToCategory } from 'homepairs-utilities';


export type ServiceRequestScreenStateProps = {
    serviceRequestsState: ServiceState;
    header: HeaderState;
    properties: Property[];
    accountType: AccountTypes;
};

export type ServiceRequestsScreenDispatchProps = {
    onUpdateHeader: (selected: MainAppStackType) => any;
};

type ServiceRequestRadioState = {
    currentRequestsSelected: boolean,
    requestSelected: ServiceRequestStatus,
}

type ServiceRequestState = ServiceRequestRadioState & {
    serviceRequests: ServiceRequest[]
}

export type ServiceRequestRadioProps = {
    parentCallBack?: (childData: ServiceRequestCompletionStatus) => any;
    parentCallBack2?: (childData2: ServiceRequestStatus) => any;
}

export type ServiceRequestScreenProps = NavigationRouteScreenProps &
    SceneInjectedProps &
    ServiceRequestScreenStateProps &
    ServiceRequestsScreenDispatchProps &
    ServiceRequestRadioProps

const colors = BaseStyles.LightColorTheme;
const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingRight: BaseStyles.MarginPadding.xxlargConst,
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
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        paddingTop: BaseStyles.MarginPadding.xsmallConst,
        width: BaseStyles.ContentWidth.max,
    },
    titleContainer: {
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
        width: BaseStyles.ContentWidth.almostHalf,
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
        width: BaseStyles.ContentWidth.almostHalf,
        borderTopRightRadius: BaseStyles.BorderRadius.small,
        borderBottomRightRadius: BaseStyles.BorderRadius.small,
        borderWidth: 1,
        borderColor: colors.lightGray,
        height: 40,
    },
    selectedLeftThirdButton: {
        alignItems: 'flex-start',
        justifyContent: 'center',
        backgroundColor: colors.primary,
        padding: BaseStyles.MarginPadding.mediumConst,
        width: BaseStyles.ContentWidth.almostThird,
        borderTopLeftRadius: BaseStyles.BorderRadius.small,
        borderBottomLeftRadius: BaseStyles.BorderRadius.small,
        borderBottomWidth: 1,
        height: 40,
    },
    selectedMiddleThirdButton: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.primary,
        padding: BaseStyles.MarginPadding.mediumConst,
        width: BaseStyles.ContentWidth.almostThird,
        borderWidth: 1,
        borderColor: colors.lightGray,
        height: 40,
    },
    selectedRightThirdButton: {
        alignItems: 'flex-end',
        justifyContent: 'center',
        backgroundColor: colors.primary,
        padding: BaseStyles.MarginPadding.mediumConst,
        width: BaseStyles.ContentWidth.almostThird,
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
        width: BaseStyles.ContentWidth.almostHalf,
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
        width: BaseStyles.ContentWidth.almostHalf,
        borderTopRightRadius: BaseStyles.BorderRadius.small,
        borderBottomRightRadius: BaseStyles.BorderRadius.small,
        borderWidth: 1,
        borderColor: colors.lightGray,
        height: 40,
    },
    unselectedLeftThirdButton: {
        alignItems: 'flex-start',
        justifyContent: 'center',
        backgroundColor: colors.transparent,
        padding: BaseStyles.MarginPadding.mediumConst,
        width: BaseStyles.ContentWidth.almostThird,
        borderTopLeftRadius: BaseStyles.BorderRadius.small,
        borderBottomLeftRadius: BaseStyles.BorderRadius.small,
        borderWidth: 1,
        borderColor: colors.lightGray,
        height: 40,
    },
    unselectedMiddleThirdButton: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.transparent,
        padding: BaseStyles.MarginPadding.mediumConst,
        width: BaseStyles.ContentWidth.almostThird,
        borderWidth: 1,
        borderColor: colors.lightGray,
        height: 40,
    },
    unselectedRightThirdButton: {
        alignItems: 'flex-end',
        justifyContent: 'center',
        backgroundColor: colors.transparent,
        padding: BaseStyles.MarginPadding.mediumConst,
        width: BaseStyles.ContentWidth.almostThird,
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
    underline: {
        borderBottomWidth: 2, 
    },
});

const serviceRequestStrings = strings.serviceRequestPage;

function filterTabbedObjects(unfilteredServiceRequests: ServiceRequest[], requestStatus: ServiceRequestStatus) {
    const filteredServiceRequests: ServiceRequest[] = unfilteredServiceRequests.filter(sr => sr.status === requestStatus);
    return filteredServiceRequests;
}

/**
 * ---------------------------------------------------
 * Service Request Screen Base
 * ---------------------------------------------------
 */

export class ServiceRequestScreenBase extends React.Component<ServiceRequestScreenProps, ServiceRequestState>{
    tabs = ["PENDING", "SCHEDULED", "IN_PROGRESS"];

    currentServiceRequests;

    // eslint-disable-next-line react/static-property-placement
    static defaultProps: ServiceRequestRadioProps = {
        parentCallBack: (childData: ServiceRequestCompletionStatus) => { return childData; },
        parentCallBack2: (childData2: ServiceRequestStatus) => { return childData2; },
    };

    constructor(props: Readonly<ServiceRequestScreenProps>) {
        super(props);

        this.onPressInactiveRequests = this.onPressInactiveRequests.bind(this);
        this.onPressActiveRequests = this.onPressActiveRequests.bind(this);
        this.onPressPendingRequests = this.onPressPendingRequests.bind(this);
        this.onPressScheduledRequests = this.onPressScheduledRequests.bind(this);
        this.onPressInProgressRequests = this.onPressInProgressRequests.bind(this);
        this.onPressCompletedRequests = this.onPressCompletedRequests.bind(this);
        this.onPressCanceledRequests = this.onPressCanceledRequests.bind(this);
        this.onPressDeclinedRequests = this.onPressDeclinedRequests.bind(this);
        this.openServiceRequestModal = this.openServiceRequestModal.bind(this);
        this.renderCard = this.renderCard.bind(this);
        this.renderCompletionStatusRadioButton = this.renderCompletionStatusRadioButton.bind(this);
        this.renderActiveStatusRadioButton = this.renderActiveStatusRadioButton.bind(this);
        this.renderInactiveStatusRadioButton = this.renderInactiveStatusRadioButton.bind(this);
        this.renderServiceRequests = this.renderServiceRequests.bind(this);
        this.renderFilteredServiceRequests = this.renderFilteredServiceRequests.bind(this);
        this.render = this.render.bind(this);

        this.state = { currentRequestsSelected: true, requestSelected: ServiceRequestStatusEnums.Pending, serviceRequests: [] };
        props.parentCallBack(ServiceRequestCompletionStatus.Current);
        props.parentCallBack2(ServiceRequestStatusEnums.Pending);

    }

    async componentDidMount(){
        
        const {onUpdateHeader, accountType, properties } = this.props;

        // Fetch the service requests if the account Type is a Tenant or if the Account only has one property 
        if(accountType === AccountTypes.Tenant || properties.length === 1){
            console.log(properties[0].propId)
            // await this.callFetchServiceRequests(properties[0].propId);
            console.log(properties[0].propId)

        }

        // When the component is mounted, update the header. This component can be navigated from a different stack so 
        // we need to make sure the header remains updated in the case this happens
        onUpdateHeader(MainAppStack[1]);
    }

    componentWillUnmount(){
        this.setState({
            serviceRequests: [],
        });
    }

    onPressInactiveRequests() {
        const { parentCallBack, parentCallBack2 } = this.props;
        this.setState({ currentRequestsSelected: false });
        parentCallBack(ServiceRequestCompletionStatus.Archived);
        this.setState({ requestSelected: ServiceRequestStatusEnums.Completed });
        parentCallBack2(ServiceRequestStatusEnums.Completed);
    }

    onPressActiveRequests() {
        const { parentCallBack, parentCallBack2 } = this.props;
        this.setState({ currentRequestsSelected: true });
        parentCallBack(ServiceRequestCompletionStatus.Current);
        this.setState({ requestSelected: ServiceRequestStatusEnums.Pending });
        parentCallBack2(ServiceRequestStatusEnums.Pending);
    }

    onPressPendingRequests() {
        const { parentCallBack2 } = this.props;
        this.setState({ requestSelected: ServiceRequestStatusEnums.Pending });
        parentCallBack2(ServiceRequestStatusEnums.Pending);
    }

    onPressScheduledRequests() {
        const { parentCallBack2 } = this.props;
        this.setState({ requestSelected: ServiceRequestStatusEnums.Scheduled });
        parentCallBack2(ServiceRequestStatusEnums.Scheduled);
    }

    onPressInProgressRequests() {
        const { parentCallBack2 } = this.props;
        this.setState({ requestSelected: ServiceRequestStatusEnums.InProgress });
        parentCallBack2(ServiceRequestStatusEnums.InProgress);
    }

    onPressCompletedRequests() {
        const { parentCallBack2 } = this.props;
        this.setState({ requestSelected: ServiceRequestStatusEnums.Completed });
        parentCallBack2(ServiceRequestStatusEnums.Completed);
    }

    onPressCanceledRequests() {
        const { parentCallBack2 } = this.props;
        this.setState({ requestSelected: ServiceRequestStatusEnums.Canceled });
        parentCallBack2(ServiceRequestStatusEnums.Canceled);
    }

    onPressDeclinedRequests() {
        const { parentCallBack2 } = this.props;
        this.setState({ requestSelected: ServiceRequestStatusEnums.Declined });
        parentCallBack2(ServiceRequestStatusEnums.Declined);
    }

    openServiceRequestModal(serviceRequest: ServiceRequest) {
        const { navigation } = this.props;
        navigation.navigate(navigationPages.ServiceRequestModal, { serviceRequest }, true);
    }

    async callFetchServiceRequests(propId: string){
        await fetchServiceRequests(propId).then(response =>{
            const {data} = response;
            const {reqs} = data;

            let serviceRequests : ServiceRequest[] = [];

            reqs.forEach(req => {
                const {appFixed, location, serviceDate, status, client, serviceCompany, serviceCategory, details } = req;
                const appliance = {
                    applianceId: appFixed.appId,
                    category: stringToCategory(appFixed.category),
                    appName: appFixed.name,
                    manufacturer: appFixed.manufacturer,
                    modelNum: appFixed.modelNum,
                    serialNum: appFixed.serialNum,
                    location: appFixed.location,
                };

                const serviceRequest: ServiceRequest = {
                    address: location,
                    startDate: serviceDate,
                    companyName: serviceCompany,
                    details,
                    appliance,
                    status : ServiceRequestStatusEnums[status],
                };

                serviceRequests.push(serviceRequest);
            });
            this.setState({serviceRequests});  
        }).catch(error => {
            console.log(error);
        });
    }


    renderServiceRequestButtons(){
        const {serviceRequests} = this.state;
        return (
            <>
            {serviceRequests.forEach(request => {
                return (<ServiceRequestButton serviceRequest={request} />);
            })}
            </>
        );
    }

    renderCard(serviceRequest: ServiceRequest) {
        return (
            <ServiceRequestButton onClick={this.openServiceRequestModal} serviceRequest={serviceRequest} />
        );
    }

    renderCompletionStatusRadioButton(currentRequestsSelected: boolean) {
        const leftButtonStyle = currentRequestsSelected ? styles.selectedLeftButton : styles.unselectedLeftButton;
        const rightButtonStyle = currentRequestsSelected ? styles.unselectedRightButton : styles.selectedRightButton;
        return (
            <>
                <View style={styles.container}>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            testID='service-radio-current'
                            style={leftButtonStyle}
                            onPress={this.onPressActiveRequests}>
                            <Text style={currentRequestsSelected ?
                                styles.selectedText : styles.unselectedText}>
                                {serviceRequestStrings.tabA}
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            testID='service-radio-completed'
                            style={rightButtonStyle}
                            onPress={this.onPressInactiveRequests}>
                            <Text style={currentRequestsSelected ?
                                styles.unselectedText : styles.selectedText}>
                                {serviceRequestStrings.tabB}

                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </>
        );
    }

    renderActiveStatusRadioButton(requestsSelected: ServiceRequestStatus) {
        const leftThirdButtonStyle = (requestsSelected === ServiceRequestStatusEnums.Pending) ? styles.selectedLeftThirdButton : styles.unselectedLeftThirdButton;
        const middleThirdButtonStyle = (requestsSelected === ServiceRequestStatusEnums.Scheduled) ? styles.selectedMiddleThirdButton : styles.unselectedMiddleThirdButton;
        const rightThirdButtonStyle = (requestsSelected === ServiceRequestStatusEnums.InProgress) ? styles.selectedRightThirdButton : styles.unselectedRightThirdButton;
        return (
            <>
                <View style={styles.container}>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            testID='service-radio-pending'
                            style={leftThirdButtonStyle}
                            onPress={this.onPressPendingRequests}>
                            <Text style={(requestsSelected === ServiceRequestStatusEnums.Pending) ?
                                styles.selectedText : styles.unselectedText}>
                                {serviceRequestStrings.tabA1}
                            </Text>
                            <View style={styles.underline}/>
                        </TouchableOpacity>
                        <TouchableOpacity
                            testID='service-radio-scheduled'
                            style={middleThirdButtonStyle}
                            onPress={this.onPressScheduledRequests}>
                            <Text style={(requestsSelected === ServiceRequestStatusEnums.Scheduled) ?
                                styles.selectedText : styles.unselectedText}>
                                {serviceRequestStrings.tabA2}
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            testID='service-radio-inprogress'
                            style={rightThirdButtonStyle}
                            onPress={this.onPressInProgressRequests}>
                            <Text style={(requestsSelected === ServiceRequestStatusEnums.InProgress) ?
                                styles.selectedText : styles.unselectedText}>
                                {serviceRequestStrings.tabA3}

                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </>
        );
    }

    renderInactiveStatusRadioButton(requestsSelected: ServiceRequestStatus) {
        const leftThirdButtonStyle = (requestsSelected === ServiceRequestStatusEnums.Completed) ? styles.selectedLeftThirdButton : styles.unselectedLeftThirdButton;
        const middleThirdButtonStyle = (requestsSelected === ServiceRequestStatusEnums.Canceled) ? styles.selectedMiddleThirdButton : styles.unselectedMiddleThirdButton;
        const rightThirdButtonStyle = (requestsSelected === ServiceRequestStatusEnums.Declined) ? styles.selectedRightThirdButton : styles.unselectedRightThirdButton;
        
        return (
            <>
                <View style={styles.container}>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            testID='service-radio-completed'
                            style={leftThirdButtonStyle}
                            onPress={this.onPressCompletedRequests}>
                            <Text style={(requestsSelected === ServiceRequestStatusEnums.Completed) ?
                                styles.selectedText : styles.unselectedText}>
                                {serviceRequestStrings.tabB1}
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            testID='service-radio-canceled'
                            style={middleThirdButtonStyle}
                            onPress={this.onPressCanceledRequests}>
                            <Text style={(requestsSelected === ServiceRequestStatusEnums.Canceled) ?
                                styles.selectedText : styles.unselectedText}>
                                {serviceRequestStrings.tabB2}

                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            testID='service-radio-declined'
                            style={rightThirdButtonStyle}
                            onPress={this.onPressDeclinedRequests}>
                            <Text style={(requestsSelected === ServiceRequestStatusEnums.Declined) ?
                                styles.selectedText : styles.unselectedText}>
                                {serviceRequestStrings.tabB3}

                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </>
        );
    }

    renderServiceRequests() {
        const {properties, accountType} = this.props;
        const { currentRequestsSelected, requestSelected, serviceRequests } = this.state;

        return (
            <>
                
                { // Render the Dropdown menu if the account is a Property Manager
                  // Otherwise, the state will be set with the tenant property 
                accountType === AccountTypes.Tenant ? 
                    <></>
                    :
                    <ServiceRequestAddressPanel 
                        properties={properties} 
                        parentCallBack={async (propId: string)  => {await this.callFetchServiceRequests(propId);}}/>
                    }
                <View style ={{maxWidth: 458, width: '95%', alignSelf: 'center', marginTop: 10} /** TODO: Update these styles so it renders properly on all devices*/}>
                    <SearchForm<ServiceRequest>  
                        objects={serviceRequests} 
                        parentCallBack={() => {} /**TODO: Insert Your Service Requests Set State Function Here!!! */} 
                        placeholder="Search requests..." 
                        trim/>
                    {/** TODO: Add Panel Here. */}
                </View>

                <>
                    {this.renderCompletionStatusRadioButton(currentRequestsSelected)}
                </>
                <>
                    <>
                        {currentRequestsSelected ? this.renderActive(requestSelected) : this.renderInactive(requestSelected)}
                    </>
                </>
                <>
                    <>
                        { this.renderFilteredServiceRequests() }
                    </>
                </>
            </>
        );
    }

    renderActive(requestSelected: ServiceRequestStatus) {
        return (<>{this.renderActiveStatusRadioButton(requestSelected)}</>);
    }

    renderInactive(requestSelected: ServiceRequestStatus) {
        return (<>{this.renderInactiveStatusRadioButton(requestSelected)}</>);
    }

    renderFilteredServiceRequests() {
        const { requestSelected, serviceRequests } = this.state;
        const filteredServiceRequests: ServiceRequest[] = filterTabbedObjects(serviceRequests, requestSelected);

        return (
            <>
            {filteredServiceRequests.map(
                serviceRequest => {
                    const {appliance} = serviceRequest;
                    const {applianceId} = appliance;
                    return (<ServiceRequestButton key={applianceId} onClick={this.openServiceRequestModal} serviceRequest={serviceRequest} />);
                })}
            </>
            );
    }

    render() {
        return (
            <ScrollView style={{ flexGrow: 1 }}>
                <View style={styles.addBottomMargin}>
                    {this.renderServiceRequests()}
                </View>
            </ScrollView>
        );
    }
}