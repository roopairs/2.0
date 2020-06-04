import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import { ServiceRequestButton, ServiceRequestAddressPanel, SearchForm } from 'src/elements';
import {
    ServiceRequest,
    ServiceState,
    HeaderState,
    ServiceRequestStatus,
    ServiceRequestCompletionStatus,
    ServiceRequestStatusEnums,
    Property,
    MainAppStackType,
    AccountTypes,
    Contact,
    HomePairsDimensions,
} from 'homepairs-types';
import * as BaseStyles from 'homepairs-base-styles';
import strings from 'homepairs-strings';
import { NavigationRouteScreenProps, navigationPages, MainAppStack } from 'src/routes';
import { fetchServiceRequests } from 'homepairs-endpoints';
import { stringToCategory } from 'src/utility';
import { SceneInjectedProps } from '../../components';


export type ServiceRequestScreenStateProps = {
    pmInfo?: Contact;
    serviceRequestsState: ServiceState;
    header: HeaderState;
    properties: Property[];
    accountType: AccountTypes;
    token?: string,
};

export type ServiceRequestsScreenDispatchProps = {
    onUpdateHeader: (selected: MainAppStackType) => any;
};

type ServiceRequestRadioState = {
    currentRequestsSelected: boolean,
    requestSelected: ServiceRequestStatus,
    waitingApproval: number,
    pending: number;
    scheduled: number;
    inProgress: number;
    completed: number;
    canceled: number;
    declined: number;
}

type ServiceRequestState = ServiceRequestRadioState & {
    serviceRequests: ServiceRequest[],
    originalList: ServiceRequest[],
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
        padding: BaseStyles.MarginPadding.mediumConst,
        width: BaseStyles.ContentWidth.reg,
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
    currentArchivedButtonText: {
        color: colors.darkGray,
        fontSize: BaseStyles.FontTheme.reg,
        textDecorationLine: 'underline',
        alignSelf: 'center',
    },
    currentButtonStyle: {
        justifyContent: 'center',
        backgroundColor: colors.transparent,
        width: BaseStyles.ContentWidth.half,
        borderColor: colors.darkGray,
        height: 40,
    },
    archivedButtonStyle: {
        justifyContent: 'center',
        backgroundColor: colors.transparent,
        width: BaseStyles.ContentWidth.half,
        borderColor: colors.darkGray,
        height: 40,
    },
    selectedLeftThirdButton: {
        alignItems: 'flex-start',
        justifyContent: 'center',
        width: BaseStyles.ContentWidth.almostThird,
        borderBottomWidth: 1,
        borderColor: colors.primary,
        height: 30,
    },
    selectedMiddleThirdButton: {
        alignItems: 'center',
        justifyContent: 'center',
        width: BaseStyles.ContentWidth.almostThird,
        borderBottomWidth: 1,
        borderColor: colors.primary,
        height: 30,
        marginHorizontal: BaseStyles.MarginPadding.statusButton,
    },
    selectedRightThirdButton: {
        alignItems: 'flex-end',
        justifyContent: 'center',
        width: BaseStyles.ContentWidth.almostThird,
        borderBottomWidth: 1,
        borderColor: colors.primary,
        height: 30,
    },
    selectedText: {
        color: colors.shadow,
        fontSize: BaseStyles.FontTheme.small,
        fontFamily: BaseStyles.FontTheme.secondary,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
    },
    unselectedLeftThirdButton: {
        alignItems: 'flex-start',
        justifyContent: 'center',
        backgroundColor: colors.transparent,
        width: BaseStyles.ContentWidth.almostThird,
        borderBottomWidth: 1,
        borderColor: colors.lightGray,
        height: 30,
    },
    unselectedMiddleThirdButton: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.transparent,
        width: BaseStyles.ContentWidth.almostThird,
        borderBottomWidth: 1,
        borderColor: colors.lightGray,
        height: 30,
        marginHorizontal: BaseStyles.MarginPadding.statusButton,
    },
    unselectedRightThirdButton: {
        alignItems: 'flex-end',
        justifyContent: 'center',
        backgroundColor: colors.transparent,
        width: BaseStyles.ContentWidth.almostThird,
        borderBottomWidth: 1,
        borderColor: colors.lightGray,
        height: 30,
    },
    unselectedText: {
        color: colors.darkGray,
        fontSize: BaseStyles.FontTheme.small - 1,
        alignSelf: 'center',
    },
    underline: {
        borderBottomWidth: 2,
    },
    formTitle: {
        alignSelf: 'center',
        fontFamily: BaseStyles.FontTheme.primary,
        fontSize: BaseStyles.FontTheme.xsmal,
        color: '#AFB3B5',
        paddingTop: BaseStyles.MarginPadding.statusTitle,
        paddingBottom: BaseStyles.MarginPadding.xsmall,
    },
});

const serviceRequestStrings = strings.serviceRequestPage;

const initialRadioState: ServiceRequestState = {
    currentRequestsSelected: true,
    requestSelected: ServiceRequestStatusEnums.Pending,
    serviceRequests: [],
    waitingApproval: 0,
    pending: 0,
    scheduled: 0,
    inProgress: 0,
    completed: 0,
    canceled: 0,
    declined: 0,
};

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

    currentServiceRequests;

    // eslint-disable-next-line react/static-property-placement
    static defaultProps: ServiceRequestRadioProps = {
        parentCallBack: (childData: ServiceRequestCompletionStatus) => { return childData; },
        parentCallBack2: (childData2: ServiceRequestStatus) => { return childData2; },
    };

    constructor(props: Readonly<ServiceRequestScreenProps>) {
        super(props);
        this.state = initialRadioState;

        this.onPressInactiveRequests = this.onPressInactiveRequests.bind(this);
        this.onPressActiveRequests = this.onPressActiveRequests.bind(this);
        this.onPressPendingRequests = this.onPressPendingRequests.bind(this);
        this.onPressScheduledRequests = this.onPressScheduledRequests.bind(this);
        this.onPressInProgressRequests = this.onPressInProgressRequests.bind(this);
        this.onPressCompletedRequests = this.onPressCompletedRequests.bind(this);
        this.onPressCanceledRequests = this.onPressCanceledRequests.bind(this);
        this.onPressDeclinedRequests = this.onPressDeclinedRequests.bind(this);
        this.openServiceRequestModal = this.openServiceRequestModal.bind(this);
        this.callFetchServiceRequests = this.callFetchServiceRequests.bind(this);
        this.populateServiceRequests = this.populateServiceRequests.bind(this);
        this.countServiceRequestStatus = this.countServiceRequestStatus.bind(this);
        this.renderCompletionStatusRadioButton = this.renderCompletionStatusRadioButton.bind(this);
        this.renderActiveStatusRadioButton = this.renderActiveStatusRadioButton.bind(this);
        this.renderInactiveStatusRadioButton = this.renderInactiveStatusRadioButton.bind(this);
        this.renderServiceRequests = this.renderServiceRequests.bind(this);
        this.renderFilteredServiceRequests = this.renderFilteredServiceRequests.bind(this);
        this.renderFilteredServiceRequestsWaitingApproval = this.renderFilteredServiceRequestsWaitingApproval.bind(this);
        this.renderFilteredServiceRequestsSubtitles = this.renderFilteredServiceRequestsSubtitles.bind(this);
        this.render = this.render.bind(this);
        this.populateServiceRequests = this.populateServiceRequests.bind(this);
        this.countServiceRequestStatus = this.countServiceRequestStatus.bind(this);

        props.parentCallBack(ServiceRequestCompletionStatus.Current);
        props.parentCallBack2(ServiceRequestStatusEnums.Pending);

    }

    async componentDidMount() {
        const { onUpdateHeader, accountType, properties, token } = this.props;

        // Fetch the service requests if the account Type is a Tenant or if the Account only has one property 
        if (accountType === AccountTypes.Tenant || properties.length === 1) {
            await this.callFetchServiceRequests(properties[0].propId, token);
        }

        // When the component is mounted, update the header. This component can be navigated from a different stack so 
        // we need to make sure the header remains updated in the case this happens
        onUpdateHeader(MainAppStack[1]);
    }

    componentWillUnmount() {
        this.setState({
            serviceRequests: [],
            originalList: [],
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

    async callFetchServiceRequests(propId: string, token: string) {
        await fetchServiceRequests(propId, token).then(response => {
            const { data } = response;
            const { reqs } = data;

            this.populateServiceRequests(reqs);
            const { serviceRequests } = this.state;
            this.countServiceRequestStatus(serviceRequests);

        }).catch(error => {
            console.log(error);
        });
    }

    populateServiceRequests(reqs) {
        const serviceRequests: ServiceRequest[] = [];
        // explicitly set initial state- guarantees that the state gets updated even if given property has no requests
        this.setState({ serviceRequests: [] });

        reqs.forEach(req => {
            const { appFixed, location, serviceDate, status, serviceCompany, details, id } = req;
            const appliance = {
                applianceId: appFixed.appId,
                category: appFixed.category && stringToCategory(appFixed.category),
                appName: appFixed.name,
                manufacturer: appFixed.manufacturer,
                modelNum: appFixed.modelNum,
                serialNum: appFixed.serialNum,
                location: appFixed.location,
            };
            const serviceRequest: ServiceRequest = {
                reqId: id,
                address: location,
                startDate: serviceDate,
                companyName: serviceCompany,
                details,
                appliance,
                status: ServiceRequestStatusEnums[status],
            };
            serviceRequests.push(serviceRequest);
        });

        this.setState({ serviceRequests: serviceRequests, originalList: serviceRequests });
    }

    countServiceRequestStatus(serviceRequests:ServiceRequests[]) {
        let waitingApproval: number = 0;
        let pending: number = 0;
        let scheduled: number = 0;
        let inProgress: number = 0;
        let completed: number = 0;
        let canceled: number = 0;
        let declined: number = 0;

        // explicitly set initial state- guarantees that the state gets updated even if given property has no requests
        this.setState({ waitingApproval: 0, pending: 0, scheduled: 0, inProgress: 0, completed: 0, canceled: 0, declined: 0 });

        serviceRequests.forEach(sr => {
            const { status } = sr;
            switch (ServiceRequestStatusEnums[status]) {
                case ServiceRequestStatusEnums.WaitingApproval:
                    waitingApproval += 1;
                    break;
                case ServiceRequestStatusEnums.Pending:
                    pending += 1;
                    break;
                case ServiceRequestStatusEnums.InProgress:
                    inProgress += 1;
                    break;
                case ServiceRequestStatusEnums.Scheduled:
                    scheduled += 1;
                    break;
                case ServiceRequestStatusEnums.Completed:
                    completed += 1;
                    break;
                case ServiceRequestStatusEnums.Canceled:
                    canceled += 1;
                    break;
                case ServiceRequestStatusEnums.Declined:
                    declined += 1;
                    break;
                default:
                    break;
            }
        });

        this.setState({ waitingApproval, pending, scheduled, inProgress, completed, canceled, declined });
    }

    renderCompletionStatusRadioButton(currentRequestsSelected: boolean) {
        return (
            currentRequestsSelected ?
                <>
                    <View style={{ alignItems: 'center' }}>
                        <TouchableOpacity
                            testID='service-radio-completed'
                            style={styles.archivedButtonStyle}
                            onPress={this.onPressInactiveRequests}>
                            <Text style={styles.currentArchivedButtonText}>
                                {serviceRequestStrings.tabB}

                            </Text>
                        </TouchableOpacity>
                    </View>
                </>
                :
                <>
                    <View style={{ alignItems: 'center' }}>
                        <TouchableOpacity
                            testID='service-radio-current'
                            style={styles.currentButtonStyle}
                            onPress={this.onPressActiveRequests}>
                            <Text style={styles.currentArchivedButtonText}>
                                {serviceRequestStrings.tabA}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </>
        );
    }

    renderActiveStatusRadioButton(requestsSelected: ServiceRequestStatus) {
        const leftThirdButtonStyle = (requestsSelected === ServiceRequestStatusEnums.Pending) ? styles.selectedLeftThirdButton : styles.unselectedLeftThirdButton;
        const middleThirdButtonStyle = (requestsSelected === ServiceRequestStatusEnums.Scheduled) ? styles.selectedMiddleThirdButton : styles.unselectedMiddleThirdButton;
        const rightThirdButtonStyle = (requestsSelected === ServiceRequestStatusEnums.InProgress) ? styles.selectedRightThirdButton : styles.unselectedRightThirdButton;
        const { waitingApproval, pending, scheduled, inProgress } = this.state;

        return (
            <>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        testID='service-radio-pending'
                        style={leftThirdButtonStyle}
                        onPress={this.onPressPendingRequests}>
                        <Text style={(requestsSelected === ServiceRequestStatusEnums.Pending) ?
                            styles.selectedText : styles.unselectedText}>
                            {`${serviceRequestStrings.tabA1}(${waitingApproval + pending})`}
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        testID='service-radio-scheduled'
                        style={middleThirdButtonStyle}
                        onPress={this.onPressScheduledRequests}>
                        <Text style={(requestsSelected === ServiceRequestStatusEnums.Scheduled) ?
                            styles.selectedText : styles.unselectedText}>
                            {`${serviceRequestStrings.tabA2}(${scheduled})`}
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        testID='service-radio-inprogress'
                        style={rightThirdButtonStyle}
                        onPress={this.onPressInProgressRequests}>
                        <Text style={(requestsSelected === ServiceRequestStatusEnums.InProgress) ?
                            styles.selectedText : styles.unselectedText}>
                            {`${serviceRequestStrings.tabA3}(${inProgress})`}

                        </Text>
                    </TouchableOpacity>
                </View>
            </>
        );
    }

    renderInactiveStatusRadioButton(requestsSelected: ServiceRequestStatus) {
        const leftThirdButtonStyle = (requestsSelected === ServiceRequestStatusEnums.Completed) ? styles.selectedLeftThirdButton : styles.unselectedLeftThirdButton;
        const middleThirdButtonStyle = (requestsSelected === ServiceRequestStatusEnums.Canceled) ? styles.selectedMiddleThirdButton : styles.unselectedMiddleThirdButton;
        const rightThirdButtonStyle = (requestsSelected === ServiceRequestStatusEnums.Declined) ? styles.selectedRightThirdButton : styles.unselectedRightThirdButton;
        const { completed, canceled, declined } = this.state;

        return (
            <>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        testID='service-radio-completed'
                        style={leftThirdButtonStyle}
                        onPress={this.onPressCompletedRequests}>
                        <Text style={(requestsSelected === ServiceRequestStatusEnums.Completed) ?
                            styles.selectedText : styles.unselectedText}>
                            {`${serviceRequestStrings.tabB1}(${completed})`}
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        testID='service-radio-canceled'
                        style={middleThirdButtonStyle}
                        onPress={this.onPressCanceledRequests}>
                        <Text style={(requestsSelected === ServiceRequestStatusEnums.Canceled) ?
                            styles.selectedText : styles.unselectedText}>
                            {`${serviceRequestStrings.tabB2}(${canceled})`}

                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        testID='service-radio-declined'
                        style={rightThirdButtonStyle}
                        onPress={this.onPressDeclinedRequests}>
                        <Text style={(requestsSelected === ServiceRequestStatusEnums.Declined) ?
                            styles.selectedText : styles.unselectedText}>
                            {`${serviceRequestStrings.tabB3}(${declined})`}

                        </Text>
                    </TouchableOpacity>
                </View>
            </>
        );
    }

    renderServiceRequests() {
        const { properties, accountType, token } = this.props;
        const { currentRequestsSelected, requestSelected, serviceRequests, originalList } = this.state;

        return (
            <View>
                {
                    accountType === AccountTypes.Tenant ?
                        <></> :
                        <View style={{ marginTop: 30, width: BaseStyles.ContentWidth.reg, alignSelf: 'center', paddingHorizontal: 3 } /* Styled to be the same width as the SearchForm */}>
                            <ServiceRequestAddressPanel properties={properties} parentCallBack={async (propId: string) => { await this.callFetchServiceRequests(propId, token); }} />
                        </View>
                }
                <View style={{ width: BaseStyles.ContentWidth.reg, alignSelf: 'center', marginTop: 10, height: 50 } /* TODO: Update these styles so it renders properly on all devices */}>
                    <SearchForm<ServiceRequest>
                        objects={originalList}
                        filter={(filtered: ServiceRequest[]) => { this.setState({ serviceRequests: filtered }); this.countServiceRequestStatus(filtered); } /* TODO: Insert Your Service Requests Set State Function Here!!! */}
                        placeholder="Search requests..."
                        trim />
                    {/** TODO: Add Panel Here. */}
                </View>
                {this.renderCompletionStatusRadioButton(currentRequestsSelected)}
                <View style={{ width: '100%', alignSelf: 'center', justifyContent: 'center', alignItems: 'center', paddingTop: BaseStyles.MarginPadding.medium }}>
                    {currentRequestsSelected ? this.renderActive(requestSelected) : this.renderInactive(requestSelected)}
                </View>
                <View style={{ justifyContent: 'center' }}>
                    {this.renderFilteredServiceRequests()}
                </View>
            </View>
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
                {this.renderFilteredServiceRequestsWaitingApproval()}
                <>
                    {this.renderFilteredServiceRequestsSubtitles()}
                    {filteredServiceRequests.map(
                        serviceRequest => {
                            const { reqId, status } = serviceRequest;
                            const active = serviceRequest.status === "Pending" || serviceRequest.status === "Scheduled" || serviceRequest.status === "InProgress";
                            return (<ServiceRequestButton key={`${reqId}_${status}`} onClick={this.openServiceRequestModal} serviceRequest={serviceRequest} active={active} />);
                        })}
                </>
            </>
        );
    }

    renderFilteredServiceRequestsWaitingApproval() {
        const { requestSelected, serviceRequests, waitingApproval } = this.state;

        return (
            <>
                {requestSelected === ServiceRequestStatusEnums.Pending && waitingApproval > 0
                    ? <>
                        <Text style={styles.formTitle}>WAITING APPROVAL</Text>
                        {filterTabbedObjects(serviceRequests, ServiceRequestStatusEnums.WaitingApproval).map(
                            serviceRequest => {
                                const { reqId, status } = serviceRequest;
                                return (<ServiceRequestButton key={`${reqId}_${status}`} onClick={this.openServiceRequestModal} serviceRequest={serviceRequest} />);
                            })}
                    </>
                    : <></>}
            </>
        );
    }

    renderFilteredServiceRequestsSubtitles() {
        const { requestSelected, pending, scheduled, inProgress, completed, canceled, declined } = this.state;
        let printActive: boolean = false;
        let printInactive: boolean = false;

        switch (ServiceRequestStatusEnums[requestSelected]) {
            case ServiceRequestStatusEnums.Pending:
                if (pending > 0) { printActive = true; }
                break;
            case ServiceRequestStatusEnums.Scheduled:
                if (scheduled > 0) { printActive = true; }
                break;
            case ServiceRequestStatusEnums.InProgress:
                if (inProgress > 0) { printActive = true; }
                break;
            case ServiceRequestStatusEnums.Completed:
                if (completed > 0) { printInactive = true; }
                break;
            case ServiceRequestStatusEnums.Canceled:
                if (canceled > 0) { printInactive = true; }
                break;
            case ServiceRequestStatusEnums.Declined:
                if (declined > 0) { printInactive = true; }
                break;
            default:
                break;
        }
        if (printActive) {
            return (<>< Text style={styles.formTitle} >ACTIVE</Text></>);
        }

        if (printInactive) {
            return (<><Text style={styles.formTitle}>INACTIVE</Text></>);
        }

        return (<></>);
    }


    render() {
        return (
            <View style={styles.addBottomMargin}>
                {this.renderServiceRequests()}
            </View>
        );
    }
}