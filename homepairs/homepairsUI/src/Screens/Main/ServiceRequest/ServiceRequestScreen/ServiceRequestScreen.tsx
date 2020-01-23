import React from "react";
import { AppState, MainAppStackType } from "homepair-types";
import { connect } from "react-redux";
import {
  withSceneHeader,
  PrefferedProviderModal,
  withDarkMode
} from "homepair-components";
import ServiceRequestScreenBase, {
  ServiceRequestScreenProps
} from "./ServiceRequestScreenBase";
import { ServiceActions } from "homepair-redux-actions";
import strings from "homepair-strings";
import { NavigationRoute, NavigationParams, withNavigation } from "react-navigation";
import { StackNavigationProp } from "react-navigation-stack/lib/typescript/src/vendor/types";

const serviceRequestStrings = strings.serviceRequestPage;
const sceneParam: MainAppStackType = {
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

export default withDarkMode(withNavigation(withSceneHeader(ServiceRequestScreen, sceneParam)));
