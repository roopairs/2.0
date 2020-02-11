import React from 'react';
import { NavigationStackScreenProps } from 'react-navigation-stack';
import { ServiceState, HeaderState } from 'homepairs-types';
import strings from 'homepairs-strings';
import { SceneInjectedProps } from 'homepairs-components';

export type ServiceRequestScreenStateProps = {
    serviceRequests: ServiceState;
    header: HeaderState;
};

export type ServiceRequestScreenProps = NavigationStackScreenProps & ServiceRequestScreenStateProps & SceneInjectedProps;

const serviceRequestStrings = strings.serviceRequestPage;
export default function ServiceRequestScreenBase(props: ServiceRequestScreenProps) {
    // TODO: Insert Business/Non-View related logic here

    return <></>;
}
