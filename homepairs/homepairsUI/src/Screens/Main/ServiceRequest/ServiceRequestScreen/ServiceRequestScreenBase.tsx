import React from 'react';
import { ServiceState, HeaderState } from 'homepairs-types';
import strings from 'homepairs-strings';
import { SceneInjectedProps } from 'homepairs-components';
import { NavigationRouteScreenProps } from 'homepairs-utilities';

export type ServiceRequestScreenStateProps = {
    serviceRequests: ServiceState;
    header: HeaderState;
};

export type ServiceRequestScreenProps = NavigationRouteScreenProps & ServiceRequestScreenStateProps & SceneInjectedProps;

const serviceRequestStrings = strings.serviceRequestPage;
export default function ServiceRequestScreenBase(props: ServiceRequestScreenProps) {
    // TODO: Insert Business/Non-View related logic here

    return <></>;
}
