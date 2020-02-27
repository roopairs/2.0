import React from 'react';
import {
    View,
    ScrollView,
    StyleSheet,
    Platform,
    SafeAreaView,
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
} from 'homepairs-types';
import * as BaseStyles from 'homepairs-base-styles';
import strings from 'homepairs-strings';
import { SceneInjectedProps } from 'homepairs-components';

export type ServiceRequestScreenStateProps = {
    serviceRequests: ServiceState;
    header: HeaderState;
};

export type ServiceRequestsScreenDispatchProps = {
    onRevealGoBack: (showGoBack: boolean) => any;
    onSelectServiceRequest: (index: number) => any;
};

type Props = NavigationStackScreenProps & ServiceRequestScreenStateProps & ServiceRequestsScreenDispatchProps & SceneInjectedProps;

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
});

const serviceRequestStrings = strings.serviceRequestPage;

const fakeApp: Appliance = {
    applianceId: 1,
    category: ApplianceType.Plumbing,
    appName: 'Oven',
    manufacturer: 'Vulcan Equipment',
    modelNum: 123,
    serialNum: 432,
    location: 'Bathroom',
};

const fakeSR: ServiceRequest = {
    address: '123 Service Request',
    city: 'Service',
    state: 'SR',
    technician: 'Johnny White',
    startDate: new Date().toString(),
    poc: '(805)-123-4321',
    pocName: 'Sally Jones',
    companyName: 'Fix N Fix',
    details: 'The oven is not heating properly. It was working fine last week, but we have not been able to get it to light since then.',
    appliance: fakeApp,
};

export default function ServiceRequestScreenBase(props: Props) {
    const { serviceRequests, navigation } = props;

    function openServiceRequestModal(serviceRequest: ServiceRequest) {
        navigation.navigate(navigationPages.ServiceRequestModal, { serviceRequest });
    }

    function renderContents() {
        return (
            <ScrollView style={{ flexGrow: 1 }}>
                <View style={styles.addBottomMargin}>
                    <ServiceRequestButton onClick={openServiceRequestModal} serviceRequest={fakeSR} />
                </View>
            </ScrollView>
        );
    }

    return !(Platform.OS === 'ios') ? (
        <View style={styles.container}>
            <View style={styles.pallet}>{renderContents()}</View>
        </View>
    ) : (
            <View style={styles.container}>
                <SafeAreaView style={styles.pallet}>
                    {renderContents()}
                </SafeAreaView>
            </View>
        );
}
