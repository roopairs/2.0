import React, { useEffect, useState } from 'react'; //* *For every file that uses jsx, YOU MUST IMPORT REACT  */
import {
    View,
    Platform,
    SafeAreaView,
    ScrollView,
    Image,
    StyleSheet,
    ImageProps,
} from 'react-native';
import { ServiceRequestButton } from 'homepairs-elements';
import { defaultProperty } from 'homepairs-images';
import {
    GeneralHomeInfo,
    AddressSticker,
    CurrentTenantCard,
    ApplianceInfo,
    ServiceRequestCount,
} from 'homepairs-components';
import {
    HomepairsPropertyAttributes,
    Property,
    HomePairsDimensions,
    AccountTypes,
    TenantAccount,
    Appliance, 
    ApplianceType,
    TenantInfo,
    ServiceRequest,
} from 'homepairs-types';
import { NavigationStackScreenProps } from 'react-navigation-stack';
import * as BaseStyles from 'homepairs-base-styles';
import { stringToCategory } from 'homepairs-utilities';
import { navigationPages } from 'src/Routes/RouteConstants';
import { withNavigation } from 'react-navigation';
import axios from 'axios';

export type DetailedPropertyStateProps = {
    property: Property;
};

type Props = NavigationStackScreenProps & DetailedPropertyStateProps;
const CurrentTenants = withNavigation(CurrentTenantCard);

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

const fakeApp: Appliance = {
    applianceId: 1, 
    category: ApplianceType.Plumbing, 
    appName: 'Oven', 
    manufacturer: 'Vulcan Equipment', 
    modelNum: 123, 
    serialNum: 432, 
    location: 'Bathroom',
};

const fakeSR : ServiceRequest = {
    address: '123 Service Request', 
    technician: 'Johnny White', 
    startDate: new Date().toString(),
    poc: '(805)-123-4321', 
    pocName: 'Sally Jones', 
    companyName: 'Fix N Fix', 
    details: 'The oven is not heating properly. It was working fine last week, but we have not been able to get it to light since then.', 
    appliance: fakeApp,
};

export default function DetailedPropertyScreenBase(props: Props) {
    const { property, navigation } = props;
    const {address, bedrooms, bathrooms} = property;
    const [tenantInfoState, setTenantInfo] = useState([]);
    const [applianceInfoState, setApplianceInfo] = useState([]);

    useEffect(() => {
        const fetchTenantsAndAppliances = async () => {
            const result = await axios.get(`https://homepairs-alpha.herokuapp.com/property/${property.propId}/`);
            const {tenants, appliances} = result.data;
            const tenantInfo: TenantInfo[] = [];
            const applianceInfo: Appliance[] = [];

            tenants.forEach(tenant => {
                const {firstName, lastName, email} = tenant;
                tenantInfo.push({
                    firstName,
                    lastName,
                    email,
                    phoneNumber: '888-999-3030',
                });
            });

            appliances.forEach(appliance => {
                const {applianceId, category, name, manufacturer, modelNum, serialNum, location} = appliance;
                applianceInfo.push({
                    applianceId,
                    category: stringToCategory(category), 
                    appName: name, manufacturer, modelNum, serialNum, location,
                });
            });

            setApplianceInfo(applianceInfo);
            setTenantInfo(tenantInfo);
        };
        fetchTenantsAndAppliances();
      }, []);
     
    

    const imageProps: ImageProps = {
        source: defaultProperty,
        style:
            Platform.OS === 'web'
                ? styles.homePairsPropertiesImageWeb
                : styles.homePairsPropertiesImage,
        resizeMode: 'cover',
    };

    function navigateModal() {
        const {tenants} = property;
        const oldProp = {
            address,
            bedrooms,
            bathrooms,
            tenants, 
        };
        navigation.navigate(navigationPages.EditPropertyModal, {oldProp});
    }

    function openAddApplianceModal() {
        navigation.push(navigationPages.AddApplianceModal);
    }

    function openServiceRequestModal(serviceRequest: ServiceRequest) {
        navigation.navigate(navigationPages.ServiceRequestModal, {serviceRequest});
    }

    function openEditApplianceModal(appliance: Appliance) {
        navigation.navigate(navigationPages.EditApplianceModal, {appliance});
    }

    function renderImage() {
        const { source, style, resizeMode } = imageProps;
        return <Image source={source} style={style} resizeMode={resizeMode} />;
    }

    function renderContents() {
        return (
            <ScrollView style={{ flexGrow: 1 }}>
                <View style={styles.addBottomMargin}>
                    <AddressSticker
                        address={address}
                    />
                    <View style={styles.imageWrapper}>
                        <View style={styles.imageContainer}>
                            {renderImage()}
                        </View>
                    </View>
                    <ServiceRequestButton onClick={openServiceRequestModal} serviceRequest={fakeSR} />
                    <GeneralHomeInfo
                        property={property}
                        onClick={navigateModal}/>
                    <ApplianceInfo 
                        onAddApplianceModal={openAddApplianceModal} 
                        onEditApplianceModal={openEditApplianceModal}
                        appliances={applianceInfoState}/>
                    <CurrentTenants 
                    propertyId={1 /** TODO: get property id from key when backend has support this */} 
                    tenants={tenantInfoState}/>
                    <ServiceRequestCount property={property}/>
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

DetailedPropertyScreenBase.defaultProps = {
    primaryColorTheme: BaseStyles.LightColorTheme,
};
