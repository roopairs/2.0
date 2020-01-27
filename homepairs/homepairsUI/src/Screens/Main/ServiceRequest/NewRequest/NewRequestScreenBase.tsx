import React from 'react'; //* *For every file that uses jsx, YOU MUST IMPORT REACT  */
import { NavigationStackScreenProps } from 'react-navigation-stack';
import { HeaderState } from 'homepairs-types';
import strings from 'homepairs-strings';
import { Text } from 'react-native';

export type NewRequestScreenProps = {
    header: HeaderState;
};
type Props = NavigationStackScreenProps & NewRequestScreenProps;

const serviceRequestStrings = strings.serviceRequestPage;

export default function NewRequestScreenBase(props: Props) {
    // TODO: Insert Business/Non-View related logic here
    return <Text>Hello World</Text>;
}
