import React from "react";
import { AppState, MainNavigationStackProps } from "homepair-types";
import { connect } from "react-redux";
import {
  withSceneHeader,
  withDarkMode
} from "homepair-components";
import NewRequestScreenBase, {
  NewRequestScreenProps
} from "./NewRequestScreenBase";
import { ServiceActions } from "homepair-redux-actions";


//const serviceRequestStrings = strings.serviceRequestPage;
const sceneParam: MainNavigationStackProps = {
  title: "New Service Request",
  navigate: "NewRequest",
  key: "NewRequest",
};

function mapStateToProps(state: AppState): NewRequestScreenProps {
  return {
    //TODO: Add pass favorite Service Providers into props
    header: state.header
  };
}

const mapDispatchToProps = dispatch => ({
  //TODO: map proper methods into Service Requests page
});

const ServiceRequestScreen = connect(
  mapStateToProps,
  mapDispatchToProps
)(NewRequestScreenBase);

export default withDarkMode(withSceneHeader(ServiceRequestScreen, sceneParam));