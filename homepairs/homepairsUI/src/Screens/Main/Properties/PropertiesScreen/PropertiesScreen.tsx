import { AppState } from "homepair-types";
import { connect } from "react-redux";
import PropertiesScreenBase, {
  PropertiesScreenStateProps,
  PropertiesScreenDispatchProps
} from "./PropertiesScreenBase";
import {
  withSceneHeader,
  //AddNewPropertyModal,
  withDarkMode,
  withModal
} from "homepair-components";
import { MainAppStackType } from "homepair-types";
import { HeaderActions } from "homepair-redux-actions";
import { View } from "react-native";
import { AddNewPropertyModal } from '../../../Components/Modals/AddNewPropertyModal/AddNewPropertyModal';
import { withNavigation } from "react-navigation";

const sceneParams: MainAppStackType = {
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

export default withDarkMode(withModal(withNavigation(withSceneHeader(PropertiesScreen, sceneParams)), AddNewPropertyModal));
