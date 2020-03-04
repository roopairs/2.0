import React, { Component } from 'react';
import {View, Dimensions} from 'react-native';
import {ServiceRequest, Property} from 'homepairs-types';
import * as BaseStyles from 'homepairs-base-styles';
import strings from 'homepairs-strings';
import {isNullOrUndefined, NavigationRouteHandler} from 'homepairs-utilities';
import { HomePairsDimensions } from 'homepairs-types';

export type ServiceRequestDispatchProps = {
    onCreateServiceRequest: (newServReq: ServiceRequestBase, setInitialState: () => void, 
        displayError: (msg: string) => void, navigation: NavigationRouteHandler) => void
};

export type ServiceRequestState = {
    properties: Property[], 
};

type Props = ServiceRequestDispatchProps;

const serviceRequestStrings = strings.serviceRequests;

function setInputStyles(colorTheme?: BaseStyles.ColorTheme){
    const {width} = Dimensions.get('window');
    const colors = isNullOrUndefined(colorTheme) ? BaseStyles.LightColorTheme : colorTheme;
    return ();
}

export default class ServiceRequestBase extends Component<Props> {

    constructor(props: Readonly<Props>) {
        super(props);

    }


    render() {
        return (

        );
    }
}