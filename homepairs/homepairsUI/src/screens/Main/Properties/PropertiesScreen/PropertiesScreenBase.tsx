import React from 'react';
import { PropertyListState, HeaderState, Property} from 'homepairs-types';
import { navigationPages } from 'homepairs-routes';
import { Platform, FlatList} from 'react-native';
import { SceneInjectedProps } from '../../components/index';
import ViewPropertyCard from './ViewPropertyCard/ViewPropertyCard';


export type PropertiesScreenStateProps = {
    propertyState: PropertyListState;
    header: HeaderState;
    apiKey: string,
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
        const {apiKey} = this.props;
        const uri = `https://maps.googleapis.com/maps/api/streetview?size=600x300&location=${address}&pitch=-0.76&key=${apiKey}`;
        return Platform.OS === 'web' ? uri : {uri} ;
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
        return (
            <FlatList
                initialNumToRender={3}
                style={{flex:1, marginTop: 5, marginBottom: 5}}
                contentContainerStyle={{flexGrow: 1, justifyContent: 'center', alignContent: 'center'}}
                data={Object.entries(properties)}
                renderItem={({item}) => this.renderViewPropertyCard(item)}
                keyExtractor={(item) => item[0].toString()}
                />

        );
    }
}
