import React from 'react';
import { NavigationStackScreenProps } from 'react-navigation-stack';
import { ServiceState, HeaderState } from 'homepair-types';
import strings from 'homepair-strings';

export type ServiceRequestScreenStateProps = {
    serviceRequests: ServiceState;
    header: HeaderState;
};
type Props = NavigationStackScreenProps & ServiceRequestScreenStateProps;

const serviceRequestStrings = strings.serviceRequestPage;
export default function ServiceRequestScreenBase(props: Props) {
    // TODO: Insert Business/Non-View related logic here

    return <></>;
}
