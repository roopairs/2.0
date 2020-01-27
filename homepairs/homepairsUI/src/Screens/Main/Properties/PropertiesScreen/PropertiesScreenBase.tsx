import React from 'react';
import { PropertyListState, Property, HeaderState } from 'homepairs-types';
import {
    ViewPropertyCard,
    SceneInjectedProps,
    DarkModeInjectedProps,
} from 'homepairs-components';

export type PropertiesScreenStateProps = {
    properties: PropertyListState;
    header: HeaderState;
};

export type PropertiesScreenDispatchProps = {
    onRevealGoBack: (showGoBack: boolean) => any;
};

export type PropertiesScreenProps = SceneInjectedProps &
    PropertiesScreenStateProps &
    PropertiesScreenDispatchProps &
    DarkModeInjectedProps & { store: any };

export default class PropertiesScreenBase extends React.Component<
    PropertiesScreenProps
> {
    constructor(props: Readonly<PropertiesScreenProps>) {
        super(props);
        this.navigateToDetiailedProperty = this.navigateToDetiailedProperty.bind(
            this,
        );
    }

    navigateToDetiailedProperty(index: number) {
        const { properties, onRevealGoBack, navigation } = this.props;
        const property: Property = properties[index];
        const navParams = { propertyIndex: index, selectedProperty: property };
        onRevealGoBack(true);
        navigation.push('DetailedProperty', navParams);
    }

    render() {
        const { properties } = this.props;
        let nextIndex = 0;
        return properties.map(property => {
            const curIndex = nextIndex;
            nextIndex += 1;
            return (
                <ViewPropertyCard
                    key={curIndex}
                    viewButtonSelectedCallBack={
                        this.navigateToDetiailedProperty
                    }
                    propertyAddress={property.address}
                    propertyIndex={curIndex}
                />
            );
        });
    }
}
