import React from 'react'; //**For every file that uses jsx, YOU MUST IMPORT REACT  */
import { NavigationStackScreenProps } from 'react-navigation-stack'
import { ServiceState, HeaderState } from 'homepair-types';
import strings from 'homepair-strings'

export type ServiceRequestScreenProps = {
  serviceRequests: ServiceState,
  header: HeaderState
}
type Props = NavigationStackScreenProps & ServiceRequestScreenProps

const serviceRequestStrings = strings.serviceRequestPage
export default class ServiceRequestScreenBase extends React.Component<Props> {
  //TODO: Insert Business/Non-View related logic here
  render(){
    return <></>
  }
}