import React from 'react';
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import { NavigationStackScreenProps } from 'react-navigation-stack';
import { navigationPages } from 'src/Routes/RouteConstants';
import { ServiceRequestButton } from 'homepairs-elements';
import {
    HomePairsDimensions,
    Appliance,
    ApplianceType,
    ServiceRequest,
    ServiceState,
    HeaderState,
    ServiceRequestStatus,
    ServiceRequestCompletionStatus,
    ServiceRequestStatusEnums,
} from 'homepairs-types';
import * as BaseStyles from 'homepairs-base-styles';
// import { ServiceState, HeaderState } from 'homepairs-types';
import strings from 'homepairs-strings';
import { SceneInjectedProps } from 'homepairs-components';
import { NavigationRouteScreenProps } from 'homepairs-utilities';

export type ServiceRequestScreenStateProps = {
    serviceRequestsState: ServiceState;
    // tabServiceRequestCompletionSelected: ServiceRequestCompletionStatus;
    header: HeaderState;
};

export type ServiceRequestsScreenDispatchProps = {
    onRevealGoBack: (showGoBack: boolean) => any;
    onSelectServiceRequest: (index: number) => any;
};

type ServiceRequestRadioState = {
    currentRequestsSelected: boolean,
    requestSelected: ServiceRequestStatus,
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
        borderWidth: 1,
        borderColor: colors.lightGray,
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
});

const serviceRequestStrings = strings.serviceRequestPage;

const fakeApp: Appliance = {
    applianceId: "1",
    category: ApplianceType.Plumbing,
    appName: 'Oven',
    manufacturer: 'Vulcan Equipment',
    modelNum: 123,
    serialNum: 432,
    location: 'Bathroom',
};

const fakeApp2: Appliance = {
    applianceId: "2",
    category: ApplianceType.LightingAndElectric,
    appName: 'Microwave',
    manufacturer: 'Hamilton Beach',
    modelNum: 78236,
    serialNum: 324235,
    location: 'Bathroom',
};

const fakeSR: ServiceRequest = {
    address: '001 Service Request, Fremont, CA',
    technician: 'Johnny White',
    startDate: new Date().toString(),
    poc: '(805)-123-4321',
    pocName: 'Sally Jones',
    companyName: 'Fix N Fix',
    details: 'The oven is not heating properly. It was working fine last week, but we have not been able to get it to light since then.',
    appliance: fakeApp,
    status: ServiceRequestStatusEnums.Completed,
};

const fakeSR2: ServiceRequest = {
    address: '002 Service Request, Fremont, CA',
    technician: 'Johnny White',
    startDate: new Date().toString(),
    poc: '(805)-123-4321',
    pocName: 'Sally Jones',
    companyName: 'Fix N Fix',
    details: 'The oven is not heating properly. It was working fine last week, but we have not been able to get it to light since then.',
    appliance: fakeApp,
    status: ServiceRequestStatusEnums.Pending,
};

const fakeSR3: ServiceRequest = {
    address: '003 Service Request, Fremont, CA',
    technician: 'Johnny White',
    startDate: new Date().toString(),
    poc: '(805)-123-4321',
    pocName: 'Sally Jones',
    companyName: 'Fix N Fix',
    details: 'The oven is not heating properly. It was working fine last week, but we have not been able to get it to light since then.',
    appliance: fakeApp,
    status: ServiceRequestStatusEnums.Scheduled,
};

const fakeSR4: ServiceRequest = {
    address: '004 Service Request, Fremont, CA',
    technician: 'Jimmy Green',
    startDate: new Date().toString(),
    poc: '(805)-123-4321',
    pocName: 'Sally Jones',
    companyName: 'Fix N Fix',
    details: 'Microwave caught on Fire',
    appliance: fakeApp2,
    status: ServiceRequestStatusEnums.Pending,
};

const fakeSR5: ServiceRequest = {
    address: '005 Service Request, Fremont, CA',
    technician: 'Jimmy Green',
    startDate: new Date().toString(),
    poc: '(805)-123-4321',
    pocName: 'Sally Jones',
    companyName: 'Fix N Fix',
    details: 'Microwave caught on Fire',
    appliance: fakeApp2,
    status: ServiceRequestStatusEnums.Canceled,
};

const fakeSR6: ServiceRequest = {
    address: '006 Service Request, Fremont, CA',
    technician: 'Jimmy Green',
    startDate: new Date().toString(),
    poc: '(805)-123-4321',
    pocName: 'Sally Jones',
    companyName: 'Fix N Fix',
    details: 'Microwave caught on Fire',
    appliance: fakeApp2,
    status: ServiceRequestStatusEnums.Declined,
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

export default class ServiceRequestScreenBase extends React.Component<ServiceRequestScreenProps, ServiceRequestRadioState>{
    tabs = ["PENDING", "SCHEDULED", "IN_PROGRESS"];

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

        this.state = { currentRequestsSelected: true, requestSelected: ServiceRequestStatusEnums.Pending };
        props.parentCallBack(ServiceRequestCompletionStatus.Current);
        props.parentCallBack2(ServiceRequestStatusEnums.Pending);

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
        const { currentRequestsSelected, requestSelected } = this.state;
        /*
         TO DO: actually implement serviceRequestsState so we get a list of real requests
        */
        const serviceRequests = [fakeSR, fakeSR2, fakeSR3, fakeSR4, fakeSR5, fakeSR6];

        return (
            <div className="card-container" aria-label="Card Container Test">
                <ul className="card-tab-switcher completion-status" aria-label="Card Tab Switcher Completion">
                    {this.renderCompletionStatusRadioButton(currentRequestsSelected)}
                </ul>
                <div className="full-width-bar">
                    <ul className="card-tab-switcher active-status" aria-label="Card Tab Switcher Active">
                        {currentRequestsSelected ? this.renderActive(requestSelected) : this.renderInactive(requestSelected)}
                    </ul>
                </div>
                <div className="card-list" aria-label="Card List Test">
                    <div className="card-category-container" aria-label="Category Container">
                        {this.renderFilteredServiceRequests(serviceRequests)}
                    </div>
                </div>
            </div>
        );
    }

    renderActive(requestSelected: ServiceRequestStatus) {
        return (<>{this.renderActiveStatusRadioButton(requestSelected)}</>);
    }

    renderInactive(requestSelected: ServiceRequestStatus) {
        return (<>{this.renderInactiveStatusRadioButton(requestSelected)}</>);
    }

    renderFilteredServiceRequests(serviceRequests: ServiceRequest[]) {
        const { requestSelected } = this.state;
        const filteredServiceRequests: ServiceRequest[] = filterTabbedObjects(serviceRequests, requestSelected);

        return (
            filteredServiceRequests.map(
                serviceRequest => {
                    return (<ServiceRequestButton onClick={this.openServiceRequestModal} serviceRequest={serviceRequest} />);
                }));
    }

    render() {
        return (
            <ScrollView style={{ flexGrow: 1 }}>
                <View style={styles.addBottomMargin}>
                    <div className="tabbed-container">
                        <div className="full-width-bar"> </div>

                        {this.renderServiceRequests()}
                    </div>
                </View>
            </ScrollView>
        );
    }
}