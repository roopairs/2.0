import React from 'react';
import { NavigationStackScreenProps } from 'react-navigation-stack';
import { ServiceState, HeaderState } from 'homepairs-types';
import strings from 'homepairs-strings';

export type ServiceRequestScreenStateProps = {
    serviceRequests: ServiceState;
    header: HeaderState;
};
type ServiceRequestScreenProps = NavigationStackScreenProps & ServiceRequestScreenStateProps;

const serviceRequestStrings = strings.serviceRequestPage;
export default function ServiceRequestScreenBase(props: ServiceRequestScreenProps) {
    // TODO: Insert Business/Non-View related logic here

    return <></>;
}
