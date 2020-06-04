import React from 'react'; //* *For every file that uses jsx, YOU MUST IMPORT REACT  */
import {
    View,
    Platform,
    SafeAreaView,
    ScrollView,
    Image,
    StyleSheet,
} from 'react-native';
import {
    HomePairsDimensions,
    Appliance, 
    Property,
} from 'homepairs-types';
import * as BaseStyles from 'homepairs-base-styles';
import { NavigationRouteScreenProps, navigationPages } from 'src/routes';
import {CurrentTenantCard, WithSinglePropertyDispatchProps, WithSinglePropertyStateProps, ApplianceInfo, ServiceRequestCount,
    GeneralHomeInfo,
    AddressSticker} from '../components';


export type DetailedPropertyProps = NavigationRouteScreenProps 
    & WithSinglePropertyDispatchProps
    & WithSinglePropertyStateProps;

const colors = BaseStyles.LightColorTheme;
const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        backgroundColor: colors.secondary,
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
        flex: 1,
        overflow: 'hidden',
        borderRadius: BaseStyles.BorderRadius.large,
    },
    imageWrapper: {
        width: BaseStyles.ContentWidth.thin,
        height: 200,
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
function getPropIdAndProperty(props:any): [string, Property]{
    const {properties, navigation} = props;
    const propId = navigation.getParam('propId');
    return [propId, properties[propId]];
}

export class DetailedPropertyScreenBase extends React.Component<DetailedPropertyProps> {

    navigation;

    token;

    constructor(props: Readonly<DetailedPropertyProps>){
        super(props);
        this.navigation = props.navigation;
        this.token = props.token;
        this.openEditPropertyModal = this.openEditPropertyModal.bind(this);
        this.openEditApplianceModal = this.openEditApplianceModal.bind(this);
        this.openAddApplianceModal = this.openAddApplianceModal.bind(this);
        this.openEditApplianceModal = this.openEditApplianceModal.bind(this);
    };

    componentDidMount() {
        const {onUpdateHeader, setAppliancesAndTenants} = this.props;
        onUpdateHeader();
        const [propId] = getPropIdAndProperty(this.props);
        setAppliancesAndTenants(propId, this.token);
    }
    
    openEditPropertyModal() {
        const [propId] = getPropIdAndProperty(this.props);
        this.navigation.navigate(navigationPages.EditPropertyModal, {propId}, true);
    }

    openAddApplianceModal() {
        const [propId] = getPropIdAndProperty(this.props);
        this.navigation.navigate(navigationPages.AddApplianceModal, {propId, token: this.token}, true);
    }

    openEditApplianceModal(appliance: Appliance) {
        const [propId] = getPropIdAndProperty(this.props);
        this.navigation.navigate(navigationPages.EditApplianceModal, {appliance, propId, token: this.token}, true);
    }

    renderContents() {
        const [propId, property] = getPropIdAndProperty(this.props);
        const {address} = property;
        const {navigation, applianceInfo, tenantInfo, apiKey} = this.props;

        return (
            <ScrollView 
                contentContainerStyle={{}}
                style={{flexGrow: 1}}>
                <View style={styles.addBottomMargin}>
                    <AddressSticker address={address}/>
                    <View style={styles.imageWrapper}>
                        <View style={styles.imageContainer}>
                            <Image 
                                source={{uri: `https://maps.googleapis.com/maps/api/streetview?size=600x300&location=${address}&pitch=-0.76&key=${apiKey}`}} 
                                style={Platform.OS === 'web'
                                ? styles.homePairsPropertiesImageWeb
                                : styles.homePairsPropertiesImage} 
                                resizeMode='cover'/>
                        </View>
                    </View>
                    <>
                        <GeneralHomeInfo
                            property={property}
                            onClick={this.openEditPropertyModal}/>
                    </>
                    <ApplianceInfo 
                        appliances={applianceInfo} 
                        propId={propId}
                        onAddApplianceModal={this.openAddApplianceModal} 
                        onEditApplianceModal={this.openEditApplianceModal}/>
                    <>
                        <CurrentTenantCard
                            navigation={this.navigation}
                            propId={propId}
                            tenants={tenantInfo}
                            token={this.token}
                            />
                            
                    </>
                    <ServiceRequestCount 
                        onClick={() => navigation.navigate(navigationPages.ServiceRequestScreen)}
                        propId={propId}
                        token={this.token}
                    />
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