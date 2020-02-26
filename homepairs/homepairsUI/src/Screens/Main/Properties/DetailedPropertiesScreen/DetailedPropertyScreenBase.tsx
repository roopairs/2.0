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
    HomepairsPropertyAttributes,
    Property,
    HomePairsDimensions,
    Appliance, 
    ApplianceType,
    TenantInfo,
} from 'homepairs-types';
import { NavigationStackScreenProps } from 'react-navigation-stack';
import * as BaseStyles from 'homepairs-base-styles';
import { navigationPages } from 'src/Routes/RouteConstants';
import axios from 'axios';
import strings from 'homepairs-strings';
import {prepareNavigationHandlerComponent } from 'src/utility/NavigationRouterHandler';


export type DetailedPropertyStateProps = {
    property: Property;
};

type Props = NavigationStackScreenProps & DetailedPropertyStateProps;

const CurrentTenants = prepareNavigationHandlerComponent(CurrentTenantCard);
const ApplianceInfo = prepareNavigationHandlerComponent(ApplianceInfoBase);


const propertyKeys = HomepairsPropertyAttributes;
const categoryStrings = strings.applianceInfo.categories;

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
    console.log(props);
    const { property, navigation } = props;
    const { propId } = property;
    const [tenantInfoState, setTenantInfo] = useState([]);
    const [applianceInfoState, setApplianceInfo] = useState([]);
    
    function selectCategory(selected: string) {
        let appType = ApplianceType.None;
        if (selected === categoryStrings.PLUMBING) {
            appType = ApplianceType.Plumbing;
        } else if (selected === categoryStrings.GA) {
            appType = ApplianceType.GeneralAppliance;
        } else if (selected === categoryStrings.HVAC) {
            appType = ApplianceType.HVAC;
        } else if (selected === categoryStrings.LE) {
            appType = ApplianceType.LightingAndElectric;
        }
        return appType;
    }

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
                const {category, name, manufacturer, modelNum, serialNum, location} = appliance;
                applianceInfo.push({
                    applianceId: serialNum, 
                    category: selectCategory(category), 
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
        const {streetAddress, city, state, bedrooms, bathrooms, tenants} = property;
        const oldProp = {
            address: streetAddress,
            city,
            state,
            bedrooms,
            bathrooms,
            tenants, 
        };
        navigation.navigate(navigationPages.EditPropertyModal, {oldProp});
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
                        address={property[propertyKeys.ADDRESS]}
                        city={property[propertyKeys.CITY]}
                        state={property[propertyKeys.STATE]}
                    />
                    <View style={styles.imageWrapper}>
                        <View style={styles.imageContainer}>
                            {renderImage()}
                        </View>
                    </View>
                    <GeneralHomeInfo
                        property={property}
                        onClick={navigateModal}/>
                    <ApplianceInfo navigation={navigation} appliances={applianceInfoState}/>
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

DetailedPropertyScreenBase.defaultProps = {
    primaryColorTheme: BaseStyles.LightColorTheme,
};

DetailedPropertyScreenBase.navigationOptions = screenProps => ({
    title: screenProps.navigation.getParam('selectedProperty'),
    path: screenProps.navigation.getParam('selectedProperty'),
});