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
import { navigationPages } from 'src/Routes/RouteConstants';
import axios from 'axios';
<<<<<<< HEAD
import {prepareNavigationHandlerComponent, NavigationRouteScreenProps, stringToCategory} from 'homepairs-utilities';
=======
import strings from 'homepairs-strings';
import {NavigationRouteScreenProps, stringToCategory} from 'homepairs-utilities';
>>>>>>> e7966a4d3c40285bfd5f984c3efd2d070bc2f1ab

export type DetailedPropertyStateProps = {
    property: Property;
};

type Props = NavigationRouteScreenProps & DetailedPropertyStateProps;
<<<<<<< HEAD

const CurrentTenants = prepareNavigationHandlerComponent(CurrentTenantCard);
const ApplianceInfo = prepareNavigationHandlerComponent(ApplianceInfoBase);
=======
type State = {
    tenantInfo: TenantInfo[],
    appliances: Appliance[],
    modalOpen: boolean,
}
const propertyKeys = HomepairsPropertyAttributes;
const categoryStrings = strings.applianceInfo.categories;
>>>>>>> e7966a4d3c40285bfd5f984c3efd2d070bc2f1ab

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

<<<<<<< HEAD
export default function DetailedPropertyScreenBase(props: Props) {
    const { property, navigation } = props;
    const { propId, address } = property;
    const [tenantInfoState, setTenantInfo] = useState([]);
    const [applianceInfoState, setApplianceInfo] = useState([]);
=======
const fakeApp: Appliance = {
    applianceId: '1', 
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

function renderImage() {
    return <Image 
            source={defaultProperty} 
            style={Platform.OS === 'web'
            ? styles.homePairsPropertiesImageWeb
            : styles.homePairsPropertiesImage} 
            resizeMode='cover'/>;
}

export default class DetailedPropertyScreenBase extends React.Component<Props, State> {

    property

    navigation

    propId

    constructor(props: Readonly<Props>){
        super(props);
        this.state = {
            tenantInfo: [],
            appliances: [],
            modalOpen: false,
        };
        this.property = props.property; 
        this.navigation = props.navigation;
        this.propId = this.property.propId;
        this.openEditPropertyModal = this.openEditPropertyModal.bind(this);
    }

    async componentDidMount(){
        await this.fetchTenantsAndAppliances();
    }

    async componentDidUpdate(){
        await this.fetchTenantsAndAppliances();
    }
>>>>>>> e7966a4d3c40285bfd5f984c3efd2d070bc2f1ab

    fetchTenantsAndAppliances = async () => {
        await axios.get(`https://homepairs-alpha.herokuapp.com/property/${this.propId}`).then((result) =>{
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
                const {applianceId, category, name, manufacturer, modelNum, serialNum, location} = appliance;
                applianceInfo.push({
                    applianceId,
                    category: stringToCategory(category), 
                    appName: name, manufacturer, modelNum, serialNum, location,
                });
            });

            this.setState({
                tenantInfo,
                appliances: applianceInfo,
            });
        });  
    };
       
    openEditPropertyModal() {
        this.navigation.navigate(navigationPages.EditPropertyModal, {propId: this.propId}, true);
        this.setState({modalOpen: true});
    }

    openAddApplianceModal() {
        this.navigation.push(navigationPages.AddApplianceModal, {property: this.property, propdId: this.propId}, true);
    }


    openEditApplianceModal(appliance: Appliance) {
        this.navigation.navigate(navigationPages.EditApplianceModal, {appliance, propId: this.propId}, true);
    }

    renderContents() {
        const {address} = this.property;
        const {appliances, tenantInfo} = this.state;
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
                        property={this.property}
                        onClick={this.openEditPropertyModal}/>
                    <ApplianceInfo 
                        navigation={this.navigation} 
                        appliances={appliances} 
                        propId={this.propId}
                        onAddApplianceModal={this.openAddApplianceModal} 
                        onEditApplianceModal={this.openEditApplianceModal}/>
                    <CurrentTenantCard
                        navigation={this.navigation}
                        propId={this.propId}
                        tenants={tenantInfo}/>
                    <ServiceRequestCount property={this.property}/>
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
<<<<<<< HEAD
=======

>>>>>>> e7966a4d3c40285bfd5f984c3efd2d070bc2f1ab
