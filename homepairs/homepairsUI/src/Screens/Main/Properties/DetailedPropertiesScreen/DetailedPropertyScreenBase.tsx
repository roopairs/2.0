import React from 'react'; //* *For every file that uses jsx, YOU MUST IMPORT REACT  */
import {
    View,
    Platform,
    SafeAreaView,
    ScrollView,
    Image,
    StyleSheet,
} from 'react-native';
import { defaultProperty } from 'homepairs-images';
import {
    GeneralHomeInfo,
    AddressSticker,
    CurrentTenantCard,
    ApplianceInfo,
    ServiceRequestCount,
} from 'homepairs-components';
import {
    Property,
    HomePairsDimensions,
    Appliance, 
    TenantInfo,
} from 'homepairs-types';
import * as BaseStyles from 'homepairs-base-styles';
import { navigationPages, Endpoints } from 'src/Routes/RouteConstants';
import axios from 'axios';
import {NavigationRouteScreenProps, stringToCategory, hasPageBeenReloaded} from 'homepairs-utilities';


const {HOMEPAIRS_PROPERTY_ENDPOINT} = Endpoints;

export type DetailedPropertyStateProps = {
    property: Property;
    properties: Property[];
    token: string,
};

type Props = NavigationRouteScreenProps & DetailedPropertyStateProps;
type State = {
    tenantInfo: TenantInfo[],
    applianceInfo: Appliance[],
    pathname: string,
    key: string,
};

const colors = BaseStyles.LightColorTheme;
const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        backgroundColor: colors.primary,
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
    imageStyle: {
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
    },
});

/**
 * Helper function to recieve propId and property from passed in props 
 * @param props 
 */
function getPropIdAndProperty(props:any){
    const {property} = props;
    const {propId} = property;
    return [propId, property];
}

export default class DetailedPropertyScreenBase extends React.Component<Props, State> {

    apiKey = 'AIzaSyAtsrGDC2Hye4LUh8jFjw71jita84wVckg';

    navigation;

    token;

    constructor(props: Readonly<Props>){
        super(props);
        const [pathname, key] = props.navigation.getLocationPathnameAndKey();
        this.state = {
            tenantInfo: [],
            applianceInfo: [],
            pathname,
            key,
        };
        this.navigation = props.navigation;
        this.token = props.token;
        this.openEditPropertyModal = this.openEditPropertyModal.bind(this);
        this.openEditApplianceModal = this.openEditApplianceModal.bind(this);
        this.openAddApplianceModal = this.openAddApplianceModal.bind(this);
        this.openEditApplianceModal = this.openEditApplianceModal.bind(this);
        this.fetchTenantsAndAppliances = this.fetchTenantsAndAppliances.bind(this);
    };

    async componentDidMount(){
        await this.fetchTenantsAndAppliances();
    }

    componentDidUpdate() {
        if(hasPageBeenReloaded(this.props, this.state)){
            const {navigation} = this.props;
            const [newPath, newKey] = navigation.getLocationPathnameAndKey();
            this.fetchTenantsAndAppliances();
            this.setState({pathname: newPath, key: newKey});
        }
    };
    

    // TODO: Cancel all async requests that are still occurring. Will focus on this next quarter!!!
    componentWillUnmount(){}

    fetchTenantsAndAppliances = async () => {
        const [propId] = getPropIdAndProperty(this.props);

        await axios.get(`${HOMEPAIRS_PROPERTY_ENDPOINT}${propId}`).then((result) =>{
            const {tenants, appliances} = result.data;
            const tenantInfo: TenantInfo[] = [];
            const applianceInfo: Appliance[] = [];

            tenants.forEach(tenant => {
                const {firstName, lastName, email, phoneNumber} = tenant;
                tenantInfo.push({
                    firstName,
                    lastName,
                    email,
                    phoneNumber,
                });
            });

            appliances.forEach(appliance => {
                const {appId, category, name, manufacturer, modelNum, serialNum, location} = appliance;

                applianceInfo.push({
                    applianceId: appId,
                    category: stringToCategory(category), 
                    appName: name, manufacturer, modelNum, serialNum, location,
                });
            });

            console.log(applianceInfo);

            this.setState({
                tenantInfo,
                applianceInfo,
            });
        });  
    };
       
    openEditPropertyModal() {
        const [propId] = getPropIdAndProperty(this.props);
        this.navigation.replace(navigationPages.EditPropertyModal, {propId}, true);
    }

    openAddApplianceModal() {
        const [,property] = getPropIdAndProperty(this.props);
        this.navigation.replace(navigationPages.AddApplianceModal, {property, token: this.token}, true);
    }

    openEditApplianceModal(appliance: Appliance) {
        const [propId] = getPropIdAndProperty(this.props);
        this.navigation.replace(navigationPages.EditApplianceModal, {appliance, propId}, true);
    }


    renderContents() {
        const [propId, property] = getPropIdAndProperty(this.props);
        const {address} = property;
        const {applianceInfo, tenantInfo} = this.state;

        return (
            <ScrollView style={{ flexGrow: 1 }}>
                <View style={styles.addBottomMargin}>
                    <AddressSticker
                        address={address}
                    />
                    <View style={styles.imageWrapper}>
                        <View style={styles.imageContainer}>
                            <Image 
                                source={defaultProperty} 
                                style={Platform.OS === 'web'
                                ? styles.homePairsPropertiesImageWeb
                                : styles.homePairsPropertiesImage} 
                                resizeMode='cover'/>
                        </View>
                    </View>
                    <GeneralHomeInfo
                        property={property}
                        onClick={this.openEditPropertyModal}/>
                    <ApplianceInfo 
                        appliances={applianceInfo} 
                        propId={propId}
                        onAddApplianceModal={this.openAddApplianceModal} 
                        onEditApplianceModal={this.openEditApplianceModal}/>
                    <CurrentTenantCard
                        navigation={this.navigation}
                        propId={propId}
                        tenants={tenantInfo}/>
                    <ServiceRequestCount property={property}/>
                </View>
            </ScrollView>
        );
    }

    render(){
        return !(Platform.OS === 'ios') ? (
            <View style={styles.container}>
                <View style={styles.pallet}>{this.renderContents()}</View>
            </View>
        ) : (
            <View style={styles.container}>
                <SafeAreaView style={styles.pallet}>
                    {this.renderContents()}
                </SafeAreaView>
            </View>
        );
    }
}