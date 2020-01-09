import { AppState } from "homepair-types";
import { connect } from "react-redux";
import PropertiesScreenBase, {PropertiesScreenStateProps} from './PropertiesScreenBase'
import { withScene, AddNewPropertyModal, withDarkMode } from 'homepair-components'
import { MainAppStackType } from 'homepair-types';

const sceneParams : MainAppStackType = { 
  title: 'Properties', 
  navigate: 'AccountProperties',
  key: 'Properties',
  button: 'Add Property',
  buttonAction: AddNewPropertyModal
}

function mapStateToProps(state: AppState) : PropertiesScreenStateProps { 
  return {
    properties: state.propertyList,
    header: state.header
  }
};
  
const PropertiesScreen = connect(
  mapStateToProps
)(PropertiesScreenBase);

export default withDarkMode(withScene(PropertiesScreen, sceneParams));