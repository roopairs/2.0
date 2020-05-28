import React from 'react'; //* *For every file that uses jsx, YOU MUST IMPORT REACT  */
import {
    View,
    Platform,
    SafeAreaView,
    ScrollView,
    Image,
    StyleSheet,
} from 'react-native';
import { Property, HomePairsDimensions, Contact } from 'homepairs-types';
import * as BaseStyles from 'homepairs-base-styles';
import { navigationPages, NavigationRouteHandler } from 'src/routes';
import { CurrentTenantCard, WithSinglePropertyDispatchProps, WithSinglePropertyStateProps, ApplianceInfo, ServiceRequestCount, GeneralHomeInfo,
    AddressSticker } from '../components';
import { PrimaryContactInfo } from './PrimaryContactInfo';

/* tenants cannot edit properties */
const canEditProps = false;

export type TenantPropertyStateProps = {
  propertyManager: Contact,
  apiKey: string,
}

export type TenantPropertyDispatchProps = {
    onRevealGoBack?: (showGoBack:boolean) => any;
}


type Props = {navigation: NavigationRouteHandler} 
& WithSinglePropertyDispatchProps
& WithSinglePropertyStateProps
& TenantPropertyStateProps;

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


export class TenantPropertyScreenBase extends React.Component<Props>{

    /* BEWARE: styles.addBottomMargin doesn't always work, had to add it manually 
        / overlapping styles aen't currently supported by react
        see ref: https://github.com/facebook/react/issues/2231 */


    componentDidMount(){
        // TODO: Call the HOC componentDidMount function to do this logic and and pass the state 
        // to the children components where most relevant. This will be for the hardening. 
        const {setAppliancesAndTenants, properties} = this.props;
        const [property] = Object.entries(properties);
        const [propId] = property;
        setAppliancesAndTenants(propId);
    }

    renderProperty(pair: [string, Property]) {
        const [propId, property] = pair;
        const { address } = property;
        const {propertyManager, navigation, apiKey, tenantInfo, applianceInfo} = this.props;
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
                    <GeneralHomeInfo property={property} hasEdit={canEditProps} />
                    <PrimaryContactInfo propertyManager={propertyManager} />
                    <ApplianceInfo 
                        appliances={applianceInfo} 
                        propId={propId}
                        hasEdit={false}/>
                    <CurrentTenantCard 
                        propId={propId}
                        tenants={tenantInfo}
                        navigation={navigation}
                        hasEdit={false}/>
                    <ServiceRequestCount 
                        onClick={() => navigation.navigate(navigationPages.ServiceRequestScreen)}
                        propId={propId}
                    />
                </View>
            </ScrollView>
        );
    }

    render() {
        const {properties} = this.props;
        const property = Object.entries(properties)[0];

        return (
        !(Platform.OS === 'ios') ?
            (
                <View style={styles.container}>
                    <View style={styles.pallet}>
                        {this.renderProperty(property)}
                    </View>
                </View>
            ) : (
                <View style={styles.container}>
                    <SafeAreaView style={styles.pallet}>
                        {this.renderProperty(property)}
                    </SafeAreaView>
                </View>
            ));
    }
    
    
}
