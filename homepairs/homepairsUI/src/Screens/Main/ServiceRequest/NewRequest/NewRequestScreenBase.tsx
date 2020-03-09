import React from 'react'; //* *For every file that uses jsx, YOU MUST IMPORT REACT  */
import { HeaderState } from 'homepairs-types';
import strings from 'homepairs-strings';
import { View, Text } from 'react-native';
import { NavigationRouteScreenProps } from 'homepairs-utilities';
import {ButtonWithBitmap} from 'homepairs-elements';
import {bolt, defaultProperty} from 'homepairs-images';
import {ChooseServiceCategory} from 'homepairs-components';
import { ApplianceType } from 'src/state/types';

export type NewRequestScreenProps = {
    header: HeaderState;
};
type Props = NavigationRouteScreenProps & NewRequestScreenProps;

const serviceRequestStrings = strings.serviceRequestPage;

export default function NewRequestScreenBase(props: Props) {

    function getServiceRequestCategory(applianceType: ApplianceType){
        return applianceType;
    }
    // TODO: Insert Business/Non-View related logic here
    return <><ChooseServiceCategory onPress={getServiceRequestCategory}/></>;
}
