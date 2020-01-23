import { AppState } from "homepair-types";
import { connect } from "react-redux";
import PropertiesScreenBase, {
  PropertiesScreenStateProps,
  PropertiesScreenDispatchProps
} from "./PropertiesScreenBase";
import {
  withSceneHeader,
  AddNewPropertyModal,
  withDarkMode,
  withModal,
} from "homepair-components";
import { MainNavigationStackProps } from "homepair-types";
import { HeaderActions } from "homepair-redux-actions";

const sceneParams: MainNavigationStackProps = {
  title: "Properties",
  navigate: "AccountProperties",
  key: "Properties",
  button: "Add Property",
  doesButtonUseNavigate: false,
};

function mapStateToProps(state: AppState): PropertiesScreenStateProps {
  return {
    properties: state.propertyList,
    header: state.header
  };
}
const mapDispatchToProps: (
  dispatch: any
) => PropertiesScreenDispatchProps = dispatch => ({
  onRevealGoBack: (showBackButton: boolean) => {
    dispatch(HeaderActions.showGoBackButton(showBackButton));
  }
});

const PropertiesScreen = connect(
  mapStateToProps,
  mapDispatchToProps
)(PropertiesScreenBase);
withModal(PropertiesScreen, AddNewPropertyModal)
export default withDarkMode(withModal(withSceneHeader(PropertiesScreen, sceneParams), AddNewPropertyModal));
