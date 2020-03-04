import React from 'react';
import { PropertyListState, HeaderState } from 'homepairs-types';
import { navigationPages } from 'src/Routes/RouteConstants';
import { NavigationRouteScreenProps } from 'homepairs-utilities';
import {
    ViewPropertyCard,
    SceneInjectedProps,
} from 'homepairs-components';
import axios from 'axios';

export type PropertiesScreenStateProps = {
    propertyState: PropertyListState;
    header: HeaderState;
};

export type PropertiesScreenDispatchProps = {
    onRevealGoBack: (showGoBack: boolean) => any;

    // TODO: Change to propId when backend is ready. Also, store the selected property/index in async storage
    onSelectProperty: (index: number) => any;
};

export type PropertiesScreenProps = SceneInjectedProps & NavigationRouteScreenProps &
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
export default class PropertiesScreenBase extends React.Component<PropertiesScreenProps> {

    apiKey = process.env.GOOGLE_APIKEY;

    constructor(props: Readonly<PropertiesScreenProps>) {
        super(props);
        this.navigateToDetailedProperty = this.navigateToDetailedProperty.bind(this);
    }

    navigateToDetailedProperty(index: number) {
        const {navigation, onSelectProperty, onRevealGoBack, propertyState} = this.props;
        const {properties} = propertyState;

        onSelectProperty(index);
        onRevealGoBack(true);
        console.log(`Navigation to Detailed Property: ${properties[index].propId}`);
        navigation.push(navigationPages.SingleProperty, {propId: properties[index].propId});
    }

    async fetchPropertyImage(address: string) {
        const result = await axios.get(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=${address}&key=${this.apiKey}`);
        console.log(result);
        // const photoRef = result['candidates'][0]['photos'][0]['photo_reference'];
        // console.log(photoRef);
        // const propImage = await axios.get(`https://maps.googleapis.com/maps/api/place/photo?photoreference=${photoRef}`);
        // console.log(photoRef);
        // return propImage;
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
            <>{PropertyCards}</>
        );
    }
}
