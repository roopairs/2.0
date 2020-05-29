import React from 'react';
import {View, StyleSheet, FlatList, TouchableOpacity, Platform} from 'react-native';
import {ImageTile, TextTile} from 'src/elements';
import { AppState, ProviderDictionary, ServiceProvider, PropertyManagerAccount, AccountTypes } from 'homepairs-types';
import * as BaseStyles from 'homepairs-base-styles';
import { connect } from 'react-redux';
import { NavigationRouteScreenProps, NavigationRouteHandler, prepareNavigationHandlerComponent, navigationPages, MainAppStack} from 'src/routes';
import { isNullOrUndefined } from 'src/utility';

const {AddServiceProviderModal, PreferredProviderModal} = navigationPages;

const styles = StyleSheet.create({
    container: {
        maxWidth: '100%',
        width: BaseStyles.ContentWidth.max,
        paddingVertical: Platform.OS === 'web' ? 0 : 12.5,
        backgroundColor: "#374245",
        maxHeight: 100,
        minHeight: 80,
        justifyContent: 'center',
        alignSelf:'center', 
        borderColor: 'white',
    },
    flatListTileContainer: {
        flex: 1,
        justifyContent: 'center',
        marginHorizontal: 11, 
        marginBottom: Platform.OS === 'web' ? 5 : undefined,
    },
});

export type PreferredProviderFlatListStateProps = {
    pmId: number,
    serviceProviders: ProviderDictionary,
    shouldRender: boolean,
}

export type PreferredProviderFlatListProps = 
    & PreferredProviderFlatListStateProps
    & NavigationRouteScreenProps


/* * Helper types for the renderComponent used for the flatList * */
type TypeGuardTile = {
    type: 'add' | 'provider'
    tile: ServiceProvider,
    pmId: number,
    phoneNum: string,
};
type RenderProviderTilesItem = NavigationRouteScreenProps & TypeGuardTile;
/* * Helper types for the renderComponent used for the flatList * */

/**
 * A Render Component that is passed into the Flatlist of Base Component: 
 * PreferredProviderFlatListBase. This Component handles the individual tile 
 * and allows to the the detailed information modal of the selected service 
 * provider or to the AddPreferredProviderModal in the case of the last 
 * tile selected.
 * @param {RenderProviderTilesItem} props 
 */
function renderProviderTiles(props: RenderProviderTilesItem){
    const {type, tile, pmId, navigation} = props;
    async function onClickProvider(){
        navigation.navigate(PreferredProviderModal, {serviceProvider: tile.phoneNum}, true);
    }

    async function onClickAdd(){
        navigation.navigate(AddServiceProviderModal, {}, true);
    }

    // Helper function that that renders a Text tile for logos without images and 
    // Image tiles for those with images. This function assumes that tile is defined.
    function renderProperTile() {
        const {logo, name} = tile;

        // Render remote images. Need to format in {uri: string} to work on iOS
        const image = Platform.OS === 'web' ? logo : {uri: logo} ;
        return isNullOrUndefined(logo) ? 
            <TextTile text={name} fontSize={16}/>
            :
            <ImageTile image={image}/>;     
    }

    return type === 'add' ? 
    (
        <TouchableOpacity style={styles.flatListTileContainer} onPress={onClickAdd}>
            <TextTile text="+" adjustFontSizeToFit/>
        </TouchableOpacity>
    ) : (
        <TouchableOpacity style={styles.flatListTileContainer} onPress={onClickProvider}>
            {renderProperTile()}
        </TouchableOpacity>
    );
}

/**
 * A helper function that converts the state representation of preferred service providers into 
 * the format needed to render for the Flatlist. 
 * @param {ProviderDictionary} serviceProviders -The Service Provider Information recieved from 
 * the redux state
 * @param {NavigationRouteHandler} navigation -The parents navigation handler. We the parents 
 * instead of the prepare function to reduce the amount of computations needed.
 */
function prepareRenderTiles(serviceProviders: ProviderDictionary, navigation: NavigationRouteHandler) : RenderProviderTilesItem[]{
    let tiles: RenderProviderTilesItem[] = [];

    Object.entries(serviceProviders).forEach(([, serviceProvider]) => {
        tiles.push({ type: 'provider', tile: serviceProvider, navigation});
    });
    tiles.push({type: 'add', tile: null, navigation});
    return tiles;
}

/**
 * ---------------------------------------------------
 * Preferred Provider FlatList
 * ---------------------------------------------------
 * Component that whom intially is intended to rendered within the Service Requests 
 * page. It has a scrollable set of preffered service providers that is recieved from 
 * the redux store. It also holds a navigator that navigates to a Preffered Provider 
 * modal (based on the service provider selected) or an add Service Provider modal. 
 * This component reads from the Redux Store to check if it should render itself, please
 * refer to mapStateWithProps to adjust the conditions in which this component will 
 * render. 
 * 
 * @param {PreferredProviderFlatListProps} props -Base component that will be contained 
 */
export function PreferredProviderFlatListBase(props: PreferredProviderFlatListProps){
    const {serviceProviders, navigation, pmId, shouldRender} = props;
    const renderTiles = prepareRenderTiles(serviceProviders, navigation);
    if(!shouldRender){
        return <></>;
    }
    return (
        <View style={styles.container}>
            {/* * TODO: To rerender a FlatList, you must use the extraData prop * */}
            <FlatList
                initialNumToRender={3}
                style={{flex:1, marginTop: 5}}
                contentContainerStyle={{flexGrow: 1, justifyContent: 'center', alignContent: 'center'}}
                data={renderTiles}
                renderItem={({item}) => renderProviderTiles({...item, pmId})}
                keyExtractor={(item, index) => index.toString()}
                horizontal/>
        </View>);
} 


/* * Converting the Base into a Smart Component  * */ 
function mapStateToProps(state: AppState): PreferredProviderFlatListStateProps{  
    const {preferredProviders, accountProfile, header} = state;
    const {pmId, accountType} = accountProfile;
    const {serviceProviders} = preferredProviders;
    const {currentPage} = header;

    const ServiceRequestNavigation: string = MainAppStack[1].navigate;

    // This component should only render itself if the current page is the service 
    // request page and if the account is for a Property Manager
    const shouldRender: boolean = (
        accountType === AccountTypes.PropertyManager 
        && currentPage.navigate === ServiceRequestNavigation);

    return {
        shouldRender,
        pmId,
        serviceProviders,
    };
};


const PreferredProviderFlatList = connect(mapStateToProps)(
    prepareNavigationHandlerComponent(PreferredProviderFlatListBase));
/* * Converting the Base into a Smart Component  * */ 

export default PreferredProviderFlatList;
