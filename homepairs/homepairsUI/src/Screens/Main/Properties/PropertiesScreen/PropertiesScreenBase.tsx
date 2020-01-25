import React from 'react';
import {
    PropertyListState,
    Property,
    HeaderState,
    HomepairsPropertyAttributes,
} from 'homepair-types';
import { ViewPropertyCard, SceneInjectedProps, DarkModeInjectedProps } from 'homepair-components';

export type PropertiesScreenStateProps = {
    properties: PropertyListState;
    header: HeaderState;
};

export type PropertiesScreenDispatchProps = {
    onRevealGoBack: (showGoBack: boolean) => any;
};

export type PropertiesScreenProps = SceneInjectedProps &
    PropertiesScreenStateProps &
    PropertiesScreenDispatchProps & DarkModeInjectedProps & { store: any };

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
        const propertyList = [];
        for (let i = 0; i < properties.length; i += 1) {
            propertyList.push(
                <ViewPropertyCard
                    key={i}
                    viewButtonSelectedCallBack={
                        this.navigateToDetiailedProperty
                    }
                    propertyAddress={
                        properties[i][HomepairsPropertyAttributes.ADDRESS]
                    }
                    propertyIndex={i}
                />,
            );
        }
        return propertyList;
    }
}
