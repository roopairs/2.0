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
import { defaultProperty } from 'homepairs-images';
import {
    GeneralHomeInfo,
    AddressSticker,
    CurrentTenantCard,
    ApplianceInfo as ApplianceInfoBase,
    ServiceRequestCount,
} from 'homepairs-components';
import {
    Property,
    HomePairsDimensions,
    Appliance, 
    TenantInfo,
} from 'homepairs-types';
import * as BaseStyles from 'homepairs-base-styles';
import { navigationPages } from 'src/Routes/RouteConstants';
import axios from 'axios';
import {prepareNavigationHandlerComponent, NavigationRouteScreenProps, stringToCategory} from 'homepairs-utilities';

export type DetailedPropertyStateProps = {
    property: Property;
};

type Props = NavigationRouteScreenProps & DetailedPropertyStateProps;

const CurrentTenants = prepareNavigationHandlerComponent(CurrentTenantCard);
const ApplianceInfo = prepareNavigationHandlerComponent(ApplianceInfoBase);

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

export default function DetailedPropertyScreenBase(props: Props) {
    const { property, navigation } = props;
    const { propId, address } = property;
    const [tenantInfoState, setTenantInfo] = useState([]);
    const [applianceInfoState, setApplianceInfo] = useState([]);

    useEffect(() => {
        const fetchTenantsAndAppliances = async () => {
            const result = await axios.get(`https://homepairs-alpha.herokuapp.com/property/${propId}`);
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
        navigation.navigate(navigationPages.EditPropertyModal, {propId}, true);
    }

    function openAddApplianceModal() {
        navigation.push(navigationPages.AddApplianceModal, {property, propId}, true);
    }


    function openEditApplianceModal(appliance: Appliance) {
        navigation.navigate(navigationPages.EditApplianceModal, {appliance, propId}, true);
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
                    <GeneralHomeInfo
                        property={property}
                        onClick={navigateModal}/>
                    <ApplianceInfo 
                        navigation={navigation} 
                        appliances={applianceInfoState} 
                        propId={propId}
                        onAddApplianceModal={openAddApplianceModal} 
                        onEditApplianceModal={openEditApplianceModal}/>
                    <CurrentTenants 
                        propId={propId}
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
