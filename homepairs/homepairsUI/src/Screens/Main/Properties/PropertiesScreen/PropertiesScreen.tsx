import { AppState } from "homepair-types";
import { connect } from "react-redux";
import React, { Component } from "react"
import PropertiesScreenBase, {PropertiesScreenStateProps, PropertiesScreenDispatchProps} from './PropertiesScreenBase'
import { withScene, AddNewPropertyModal, withDarkMode } from 'homepair-components'
import { MainAppStackType } from 'homepair-types';
import { HeaderActions } from 'homepair-redux-actions';
const sceneParams : MainAppStackType = { 
  title: 'Properties', 
  navigate: 'AccountProperties',
  key: 'Properties',
  button: 'Add Property',
  buttonAction: (visible: boolean) => {return visible},
}

function mapStateToProps(state: AppState) : PropertiesScreenStateProps { 
  return {
    properties: state.propertyList,
    header: state.header
  }
};
const mapDispatchToProps: (dispatch:any) => PropertiesScreenDispatchProps = dispatch => ({
  onRevealGoBack: (showBackButton:boolean) => {
      dispatch(HeaderActions.showGoBackButton(showBackButton));
  },
});

const PropertiesScreen = connect(
  mapStateToProps,
  mapDispatchToProps
)(PropertiesScreenBase);

export default withDarkMode(withScene(PropertiesScreen, sceneParams));