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
    ServiceRequestActiveStatus,
} from 'homepairs-types';
import * as BaseStyles from 'homepairs-base-styles';
import strings from 'homepairs-strings';
import { SceneInjectedProps} from 'homepairs-components';

export type ServiceRequestScreenStateProps = {
    serviceRequestsState: ServiceState;
    tabServiceRequestCompletionSelected: ServiceRequestCompletionStatus;
    header: HeaderState;
};

export type ServiceRequestsScreenDispatchProps = {
    onRevealGoBack: (showGoBack: boolean) => any;
    onSelectServiceRequest: (index: number) => any;
};

type ServiceRequestRadioState = {
    currentRequestsSelected : boolean
}

export type ServiceRequestRadioProps = {
    parentCallBack?: (childData: ServiceRequestCompletionStatus) => any;
}

export type ServiceRequestScreenProps = NavigationStackScreenProps &
    SceneInjectedProps &
    ServiceRequestScreenStateProps &
    ServiceRequestsScreenDispatchProps & 
    ServiceRequestRadioProps 

const colors = BaseStyles.LightColorTheme;
const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        backgroundColor: colors.space,
        width: BaseStyles.ContentWidth.max,
        flex: 1,
    },
    pallet: {
        backgroundColor: colors.secondary,
        width: BaseStyles.ContentWidth.max,
        flex: 1,
        maxWidth: HomePairsDimensions.MAX_CONTENT_SIZE,
        alignSelf: 'center',
    },
    imageContainer: {
        width: BaseStyles.ContentWidth.max,
        height: '100%',
        overflow: 'hidden',
        borderRadius: BaseStyles.BorderRadius.large,
    },
    imageWrapper: {
        width: BaseStyles.ContentWidth.thin,
        height: '50%',
        maxHeight: 200,
        borderRadius: BaseStyles.BorderRadius.large,
        backgroundColor: 'white',
        alignSelf: 'center',
        alignContent: 'center',
        shadowColor: colors.shadow,
        shadowRadius: 10,
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.25,
        elevation: 9,
    },
    scrollViewContentContainer: {
        maxWidth: HomePairsDimensions.MAX_CONTENT_SIZE,
        backgroundColor: colors.secondary,
        alignSelf: 'center',
        width: BaseStyles.ContentWidth.max,
        flexGrow: 1,
    },
    addBottomMargin: {
        flex: 1,
        marginBottom: BaseStyles.MarginPadding.largeConst,
    },
    homePairsPropertiesImage: {
        flex: 1,
        alignSelf: 'center',
        width: BaseStyles.ContentWidth.max,
        height: '100%',
        overflow: 'hidden',
    },
    homePairsPropertiesImageWeb: {
        alignSelf: 'center',
        width: BaseStyles.ContentWidth.max,
        height: '100%',
        overflow: 'hidden',
    },
    buttonContainer: {
        flexDirection: 'row',
        marginBottom: BaseStyles.MarginPadding.inputForm,
        paddingTop: BaseStyles.MarginPadding.xsmallConst,
        paddingHorizontal: BaseStyles.MarginPadding.xsmallConst,
        width: BaseStyles.ContentWidth.max,
    },
    title: {
        marginVertical: BaseStyles.MarginPadding.inputForm,
        fontFamily: BaseStyles.FontTheme.primary,
        color: colors.lightGray,
    },
    titleContainer: {
        width: BaseStyles.ContentWidth.max,
    },
    selectedLeftButton: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.primary,
        padding: BaseStyles.MarginPadding.mediumConst,
        width: BaseStyles.ContentWidth.half,
        borderTopLeftRadius: BaseStyles.BorderRadius.small,
        borderBottomLeftRadius: BaseStyles.BorderRadius.small,
        borderWidth: 1,
        borderColor: colors.space,
        height: 40,
    },
    selectedRightButton: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.primary,
        padding: BaseStyles.MarginPadding.mediumConst,
        width: BaseStyles.ContentWidth.half,
        borderTopRightRadius: BaseStyles.BorderRadius.small,
        borderBottomRightRadius: BaseStyles.BorderRadius.small,
        borderWidth: 1,
        borderColor: colors.space,
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
        alignItems: 'center',
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
        alignItems: 'center',
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

const serviceRequestStrings = strings.serviceRequestPage;

/*
type ServiceRequestsTabState = {
    serviceRequestType: ServiceRequestCompletionStatus
}

const initalState: ServiceRequestsTabState = {
    serviceRequestType: ServiceRequestCompletionStatus.Current,
};
*/

const fakeApp: Appliance = {
    applianceId: 1,
    category: ApplianceType.Plumbing,
    appName: 'Oven',
    manufacturer: 'Vulcan Equipment',
    modelNum: 123,
    serialNum: 432,
    location: 'Bathroom',
};

const fakeApp2: Appliance = {
    applianceId: 2,
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
    status: ServiceRequestActiveStatus.Pending,
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
    status: ServiceRequestActiveStatus.Pending,
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
    status: ServiceRequestActiveStatus.Scheduled,
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
    status: ServiceRequestActiveStatus.Pending,
};

/**
 * ---------------------------------------------------
 * Service Request Screen Base
 * ---------------------------------------------------
 */

function filteredTabbedObjects(unfilteredServiceRequests: ServiceRequest[], activeStatus: ServiceRequestStatus) {
    return unfilteredServiceRequests.filter(sr => sr.status === activeStatus);
}

export default class ServiceRequestScreenBase extends React.Component<ServiceRequestScreenProps, ServiceRequestRadioState>{
    tabs = ["PENDING", "SCHEDULED", "IN_PROGRESS"];

    // eslint-disable-next-line react/static-property-placement
    static defaultProps: ServiceRequestRadioProps = {
        parentCallBack: (childData : ServiceRequestCompletionStatus) => {return childData;},
    };

    constructor(props: Readonly<ServiceRequestScreenProps>) {
        super(props);
        
        this.openServiceRequestModal = this.openServiceRequestModal.bind(this);
        this.onPressCompletedRequests = this.onPressCompletedRequests.bind(this);
        this.onPressCurrentRequests = this.onPressCurrentRequests.bind(this);
        this.openServiceRequestModal = this.openServiceRequestModal.bind(this);
        this.renderCard = this.renderCard.bind(this);
        this.renderRadioButton = this.renderRadioButton.bind(this);
        this.renderServiceRequests = this.renderServiceRequests.bind(this);
        this.render = this.render.bind(this);

        this.state = {currentRequestsSelected : false };
        props.parentCallBack(ServiceRequestCompletionStatus.Current);
    }

    onPressCompletedRequests() {
        const { parentCallBack } = this.props;
        this.setState({ currentRequestsSelected: true });
        parentCallBack(ServiceRequestCompletionStatus.Completed);
    }

    onPressCurrentRequests() {
        const { parentCallBack } = this.props;
        this.setState({ currentRequestsSelected: false });
        parentCallBack(ServiceRequestCompletionStatus.Current);
    }

    /* 
    TO DO: for sub tabs
    getServiceRequestType(childData: ServiceRequestCompletionStatus) {
        this.setState({ serviceRequestType: childData });
    }
    */

    openServiceRequestModal(serviceRequest: ServiceRequest) {
        const { navigation } = this.props;
        navigation.navigate(navigationPages.ServiceRequestModal, { serviceRequest });
    }

    renderCard(serviceRequest: ServiceRequest) {
        return (
            <ServiceRequestButton onClick={this.openServiceRequestModal} serviceRequest={serviceRequest} />
        );
    }

    renderRadioButton(currentRequestsSelected: boolean) {
        const leftButtonStyle = currentRequestsSelected ? styles.unselectedLeftButton : styles.selectedLeftButton;
        const rightButtonStyle = currentRequestsSelected ? styles.selectedRightButton : styles.unselectedRightButton;
        return (
            <>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>
                        VIEW SERVICE REQUESTS
             </Text>
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        testID='service-radio-current'
                        style={leftButtonStyle}
                        onPress={this.onPressCurrentRequests}>
                        <Text style={currentRequestsSelected ?
                            styles.unselectedText : styles.selectedText}>
                            {serviceRequestStrings.tabA}
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        testID='service-radio-completed'
                        style={rightButtonStyle}
                        onPress={this.onPressCompletedRequests}>
                        <Text style={currentRequestsSelected ?
                            styles.selectedText : styles.unselectedText}>
                            {serviceRequestStrings.tabB}

                        </Text>
                    </TouchableOpacity>
                </View>
            </>
        );
    }

    renderServiceRequests() {
        const activeTab = ServiceRequestActiveStatus.Pending;
        /*
         TO DO: actually implement serviceRequestsState
        const { serviceRequestsState } = this.props;
        const{serviceRequests} = serviceRequestsState;
        */
        const { currentRequestsSelected } = this.state;
        // const subTabSelected = ServiceRequestActiveStatus.Pending;
        const serviceRequests = [fakeSR2, fakeSR3, fakeSR4];
        const filteredServiceRequests: ServiceRequest[] = filteredTabbedObjects(serviceRequests, activeTab);
        const objectName = serviceRequestStrings.tabA;
        return (
            <div className="card-container" aria-label="Card Container Test">
                <div className="full-width-bar">
                    <ul className={"card-tab-switcher card-tab-switcher--" + objectName.toLowerCase() + "s"} aria-label="Card Tab Switcher">
                       {this.renderRadioButton(currentRequestsSelected)}
                    </ul>
                </div>
                <div className="card-list" aria-label="Card List Test">
                    <div className="card-category-container" aria-label="Category Container">
                        {filteredServiceRequests.map(serviceRequest => {
                            return (
                                <ServiceRequestButton onClick={this.openServiceRequestModal} serviceRequest={serviceRequest} />
                            );
                        })}
                    </div>
                </div>
            </div>
        );
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