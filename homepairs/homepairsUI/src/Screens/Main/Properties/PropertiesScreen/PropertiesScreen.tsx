import { AppState } from "../../../../state/types";
import { connect } from "react-redux";
import PropertiesScreenBase from './PropertiesScreenBase';
import { showGoBackButton } from '../../../../state/header/actions';

function mapStateToProps(state: AppState){ 
  return {
    properties: state.propertyList,
    header: state.header
  }
};
  
const mapDispatchToProps = dispatch => ({
  onSetHeaderGoBackButton: (isSet:boolean) => {
      dispatch(showGoBackButton(isSet));
  },
});

const PropertiesScreen = connect(
  mapStateToProps,
  mapDispatchToProps
)(PropertiesScreenBase);
export default PropertiesScreen;