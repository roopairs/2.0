import { AppState } from "homepair-types";
import { PropertyListActions } from "homepair-redux-actions";
import { connect } from "react-redux";
import TenantPropertyScreenBase, { TenantPropertyStateProps, TenantPropertyDispatchProps} from './TenantPropertyScreenBase';
import { withNavigation } from "react-navigation";
import { withDarkMode } from 'homepair-components';
import { HeaderActions } from "homepair-redux-actions";

function mapStateToProps(state: AppState) : TenantPropertyStateProps {
    return { properties: state.propertyList,}
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