import { AppState } from "homepairs-types";
import { PropertyListActions } from "homepairs-redux-actions";
import { connect } from "react-redux";
import TenantPropertyScreenBase, { TenantPropertyStateProps, TenantPropertyDispatchProps} from './TenantPropertyScreenBase';
import { withNavigation } from "react-navigation";
import { withDarkMode } from 'homepairs-components';
import { HeaderActions } from "homepairs-redux-actions";

function mapStateToProps(state: AppState) : TenantPropertyStateProps {
    return { properties: state.properties,}
};
  
const mapDispatchToProps: (
    dispatch: any
  ) => TenantPropertyDispatchProps = dispatch => ({
    onRevealGoBack: (showBackButton: boolean) => {
      dispatch(HeaderActions.showGoBackButton(showBackButton));
    }
  });

const DetailedPropertyScreen = connect(
  mapStateToProps,
  //mapDispatchToProps,
)(TenantPropertyScreenBase);

export default withDarkMode(withNavigation(DetailedPropertyScreen));