import { AppState, MainAppStackType } from 'homepair-types';
import { connect } from "react-redux";
import { withScene, PresentNewRequestModal, withDarkMode } from 'homepair-components';
import ServiceRequestScreenBase, { ServiceRequestScreenProps } from './ServiceRequestScreenBase';
import { ServiceActions } from 'homepair-redux-actions';

const sceneParam : MainAppStackType = { 
  title: 'Service Request', 
  navigate: 'ServiceRequest',
  key: 'ServiceRequest',
  button: 'Request Service',
  buttonAction: PresentNewRequestModal
}
function mapStateToProps(state: AppState) : ServiceRequestScreenProps { 
  return {
    //TODO: Add pass favorite Service Providers into props 
    serviceRequests: state.serviceRequests,
    header: state.header
  }
};
  
const mapDispatchToProps = dispatch => ({
  //TODO: map proper methods into Service Requests page 
});

const ServiceRequestScreen = connect(
  mapStateToProps,
  mapDispatchToProps
)(ServiceRequestScreenBase);

export default withDarkMode(withScene(ServiceRequestScreen, sceneParam));