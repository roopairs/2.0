import React from 'react';
import { PropertyListState, HeaderState, Property, PropertyDict } from 'homepairs-types';
import { navigationPages } from 'homepairs-routes';
import { ViewPropertyCard, SceneInjectedProps } from 'homepairs-components';
import { View, Platform, FlatList} from 'react-native';

export type PropertiesScreenStateProps = {
    propertyState: PropertyListState;
    header: HeaderState;
};

export type PropertiesScreenDispatchProps = {
    onRevealGoBack: (showGoBack: boolean) => any;

    // TODO: Change to propId when backend is ready. Also, store the selected property/index in async storage
    onSelectProperty: (propId: string) => any;
};

export type PropertiesScreenProps = SceneInjectedProps &
    PropertiesScreenStateProps &
    PropertiesScreenDispatchProps 

/**
 * ---------------------------------------------------
 * Properties Screen Base
 * ---------------------------------------------------
 * A component that renders a list of selectable cards that will navigate the user to 
 * details about a specified property. This component is intended to be connected with 
 * the Navigator, Homepairs Redux Store, and is intended to be wrapped with a withSceneHeader
 * High Order Component.
 * Child Components: 
 *  -ViewPropertyCard
 */
export class PropertiesScreenBase extends React.Component<PropertiesScreenProps> {

    apiKey = 'AIzaSyAtsrGDC2Hye4LUh8jFjw71jita84wVckg';

    constructor(props: Readonly<PropertiesScreenProps>) {
        super(props);
        this.navigateToDetailedProperty = this.navigateToDetailedProperty.bind(this);
    }

    navigateToDetailedProperty(propId: string) {
        const {navigation, onSelectProperty, onRevealGoBack} = this.props;

        onSelectProperty(propId);
        onRevealGoBack(true);
        navigation.navigate(navigationPages.SingleProperty, {propId});
    }

    fetchPropertyImage(address: string) {
        const uri = `https://maps.googleapis.com/maps/api/streetview?size=600x300&location=${address}&pitch=-0.76&key=${this.apiKey}`;
        //TODO: Fix this for android 
        return Platform.OS === 'ios' ? {uri} : uri ;
    }

    renderViewPropertyCard(pair: [string, Property]){
        const [propId, property] = pair;
        const propImage = this.fetchPropertyImage(property.address);
        return (
            <ViewPropertyCard
                key={propId}
                image={propImage}
                viewButtonSelectedCallBack={this.navigateToDetailedProperty}
                property={property}
                propId={propId}
            />
        );
    }

    render() {
        const { propertyState} = this.props;
        const { properties } = propertyState;
        console.log(properties);
        return (
            <FlatList
                initialNumToRender={3}
                style={{flex:1, marginTop: 5, marginBottom: 5}}
                contentContainerStyle={{flexGrow: 1, justifyContent: 'center', alignContent: 'center'}}
                data={Object.entries(properties)}
                renderItem={({item}) => this.renderViewPropertyCard(item)}/>
        );
    }
}
