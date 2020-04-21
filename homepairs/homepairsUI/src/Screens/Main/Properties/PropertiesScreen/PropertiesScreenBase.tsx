import React from 'react';
import { PropertyListState, HeaderState } from 'homepairs-types';
import { navigationPages } from 'homepairs-routes';
import { ViewPropertyCard, SceneInjectedProps } from 'homepairs-components';
import { View } from 'react-native';

export type PropertiesScreenStateProps = {
    propertyState: PropertyListState;
    header: HeaderState;
};

export type PropertiesScreenDispatchProps = {
    onRevealGoBack: (showGoBack: boolean) => any;

    // TODO: Change to propId when backend is ready. Also, store the selected property/index in async storage
    onSelectProperty: (index: number) => any;
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

    navigateToDetailedProperty(index: number) {
        const {navigation, onSelectProperty, onRevealGoBack, propertyState} = this.props;
        const {properties} = propertyState;

        onSelectProperty(index);
        onRevealGoBack(true);
        navigation.navigate(navigationPages.SingleProperty, {propId: properties[index].propId});
    }

    fetchPropertyImage(address: string) {
        return `https://maps.googleapis.com/maps/api/streetview?size=600x300&location=${address}&pitch=-0.76&key=${this.apiKey}`;
    }

    render() {
        const { propertyState} = this.props;
        const {properties} = propertyState;
        let nextIndex = 0;
        const PropertyCards = properties.map(property => {
            const propImage = this.fetchPropertyImage(property.address);
            const curIndex = nextIndex;
            nextIndex += 1;
            return (
                <ViewPropertyCard
                    key={curIndex}
                    image={propImage}
                    viewButtonSelectedCallBack={this.navigateToDetailedProperty}
                    property={property}
                    propertyIndex={curIndex}
                />
            );
        });

        return (
            <View style={{marginBottom: 75}}>{PropertyCards}</View>
        );
    }
}
