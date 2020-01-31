import React from 'react';
import { PropertyListState, HeaderState } from 'homepairs-types';
import {
    ViewPropertyCard,
    SceneInjectedProps,
    DarkModeInjectedProps,
} from 'homepairs-components';

export type PropertiesScreenStateProps = {
    propertyState: PropertyListState;
    header: HeaderState;
};

export type PropertiesScreenDispatchProps = {
    onRevealGoBack: (showGoBack: boolean) => any;
    onSelectProperty: (index: number) => any;
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
        const {navigation, onSelectProperty, onRevealGoBack} = this.props;
        onSelectProperty(index);
        onRevealGoBack(true);
        navigation.push('DetailedProperty');
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
                    viewButtonSelectedCallBack={
                        this.navigateToDetiailedProperty
                    }
                    property={property}
                    propertyIndex={curIndex}
                />
            );
        });
    }
}
