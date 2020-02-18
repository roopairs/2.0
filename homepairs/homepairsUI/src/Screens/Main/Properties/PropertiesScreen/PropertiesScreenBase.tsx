import React from 'react';
import { PropertyListState, HeaderState } from 'homepairs-types';
import { NavigationStackScreenProps } from 'react-navigation-stack';
import { navigationPages } from 'src/Routes/RouteConstants';
import {
    ViewPropertyCard,
    SceneInjectedProps,
} from 'homepairs-components';

export type PropertiesScreenStateProps = {
    propertyState: PropertyListState;
    header: HeaderState;
};

export type PropertiesScreenDispatchProps = {
    onRevealGoBack: (showGoBack: boolean) => any;
    onSelectProperty: (index: number) => any;
};

export type PropertiesScreenProps = SceneInjectedProps & NavigationStackScreenProps &
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
    constructor(props: Readonly<PropertiesScreenProps>) {
        super(props);
        this.navigateToDetailedProperty = this.navigateToDetailedProperty.bind(this);
    }

    static path = "properties"

    navigateToDetailedProperty(index: number) {
        const {navigation, onSelectProperty, onRevealGoBack} = this.props;
        onSelectProperty(index);
        onRevealGoBack(true);
        navigation.push(navigationPages.SingleProperty);
    }

    render() {
        const { propertyState} = this.props;
        const {properties} = propertyState;
        let nextIndex = 0;
        return properties.map(property => {
            const curIndex = nextIndex;
            nextIndex += 1;
            return (
                <ViewPropertyCard
                    key={curIndex}
                    viewButtonSelectedCallBack={this.navigateToDetailedProperty}
                    property={property}
                    propertyIndex={curIndex}
                />
            );
        });
    }
}
