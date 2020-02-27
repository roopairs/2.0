import React from 'react'; //* *For every file that uses jsx, YOU MUST IMPORT REACT  */
import { HeaderState } from 'homepairs-types';
import strings from 'homepairs-strings';
import { Text } from 'react-native';
import { NavigationRouteScreenProps } from 'homepairs-utilities';

export type NewRequestScreenProps = {
    header: HeaderState;
};
type Props = NavigationRouteScreenProps & NewRequestScreenProps;

const serviceRequestStrings = strings.serviceRequestPage;

export default function NewRequestScreenBase(props: Props) {
    // TODO: Insert Business/Non-View related logic here
    return <Text>Hello World</Text>;
}
