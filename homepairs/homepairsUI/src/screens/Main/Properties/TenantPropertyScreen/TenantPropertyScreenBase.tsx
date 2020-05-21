import React from 'react'; //* *For every file that uses jsx, YOU MUST IMPORT REACT  */
import {
    View,
    Platform,
    SafeAreaView,
    ScrollView,
    Image,
    StyleSheet,
    FlatList,
    AsyncStorage,
} from 'react-native';
import { defaultProperty } from 'homepairs-images';
import { GeneralHomeInfo, AddressSticker, PrimaryContactInfo, ServiceRequestCount } from 'homepairs-components';
import { PropertyListState, Property, HomePairsDimensions as HomepairsDimensions } from 'homepairs-types';
import { NavigationStackScreenProps } from 'react-navigation-stack';
import * as BaseStyles from 'homepairs-base-styles';
import { navigationPages } from 'homepairs-routes';

/* tenants cannot edit properties */
const canEditProps = false;
    
export type TenantPropertyStateProps = {
  propertyState: PropertyListState,
  apiKey: string,
}

export type TenantPropertyDispatchProps = {
    onRevealGoBack: (showGoBack:boolean) => any;
  }


type Props = NavigationStackScreenProps & TenantPropertyStateProps
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
        maxWidth: HomepairsDimensions.MAX_CONTENT_SIZE,
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
        maxWidth: HomepairsDimensions.MAX_CONTENT_SIZE,
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


    renderProperty(pair: [string, Property]) {
        const [propId, property] = pair;
        const { address } = property;
        const {propertyState, navigation, apiKey} = this.props;
        const {propertyManager} = propertyState;
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
                    <ServiceRequestCount 
                        onClick={() => navigation.navigate(navigationPages.ServiceRequestScreen)}
                        propId={propId}
                    />
                </View>
            </ScrollView>
        );
    }

    renderContents() {
        const {propertyState} = this.props;
        const {properties} = propertyState;
        return (
            <FlatList
                initialNumToRender={1}
                style={{ flex: 1, marginTop: 5, marginBottom: 5 }}
                contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', alignContent: 'center' }}
                data={Object.entries(properties)}
                renderItem={({ item }) => this.renderProperty(item)}
                keyExtractor={(item) => item[0].toString()}
            />

        );
    }

    render() {
        return (
        !(Platform.OS === 'ios') ?
            (
                <View style={styles.container}>
                    <View style={styles.pallet}>
                        {this.renderContents()}
                    </View>
                </View>
            ) : (
                <View style={styles.container}>
                    <SafeAreaView style={styles.pallet}>
                        {this.renderContents()}
                    </SafeAreaView>
                </View>
            ));
    }
    
    
}
