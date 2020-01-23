import React from "react";
import { AppState, MainNavigationStackProps } from "homepair-types";
import { connect } from "react-redux";
import {
  withSceneHeader,
  withDarkMode
} from "homepair-components";
import ServiceRequestScreenBase, {
  ServiceRequestScreenProps
} from "./ServiceRequestScreenBase";
import { ServiceActions } from "homepair-redux-actions";
import strings from "homepair-strings";

const serviceRequestStrings = strings.serviceRequestPage;
const sceneParam: MainNavigationStackProps = {
  title: serviceRequestStrings.title,
  navigate: "ServiceRequest",
  key: "ServiceRequest",
  button: serviceRequestStrings.button,
  _onButtonClick: (props:any) => {
    props.navigation.push('NewRequest');
  },
  doesButtonUseNavigate: true
};

function mapStateToProps(state: AppState): ServiceRequestScreenProps {
  return {
    //TODO: Add pass favorite Service Providers into props
    serviceRequests: state.serviceRequests,
    header: state.header
  };
}

const mapDispatchToProps = dispatch => ({
  //TODO: map proper methods into Service Requests page
});

const ServiceRequestScreen = connect(
  mapStateToProps,
  mapDispatchToProps
)(ServiceRequestScreenBase);

export default withDarkMode(withSceneHeader(ServiceRequestScreen, sceneParam));
