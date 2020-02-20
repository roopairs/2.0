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
<<<<<<< HEAD
    ApplianceInfo,
    
=======
    ServiceRequestCount,
>>>>>>> 4272c80229cba19f11e9ab1f81ef01c95cbed99d
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
} from 'homepairs-types';
import { NavigationStackScreenProps } from 'react-navigation-stack';
import * as BaseStyles from 'homepairs-base-styles';
import { isNullOrUndefined } from 'src/utility/ParameterChecker';
import { navigationKeys, navigationPages } from 'src/Routes/RouteConstants';
import { withNavigation } from 'react-navigation';
import axios from 'axios';
import strings from 'homepairs-strings';


export type DetailedPropertyStateProps = {
    property: Property;
};

type Props = NavigationStackScreenProps & DetailedPropertyStateProps;
const CurrentTenants = withNavigation(CurrentTenantCard);
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

/*
async function getTenantInfo(propId: number){
    await axios.get('https://homepairs-alpha.herokuapp.com/API/property/list/').then((response)=>{
        console.log(response)
        const {data} = response;
        const {tenants} = data;
        tenantInfo = [];

        tenants.forEach(tenant => {
            const {firstName, lastName, email} = tenant;
            tenantInfo.push({
                firstName,
                lastName,
                email,
                phoneNumber: '888-999-3030',
            });
        });
    });
}
*/

export default function DetailedPropertyScreenBase(props: Props) {
    const { property, navigation } = props;
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
            const result = await axios.get('https://homepairs-alpha.herokuapp.com/API/property/list/');
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
        }
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
                    propertyId={1 /**TODO: get property id from key when backend has support this */} 
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