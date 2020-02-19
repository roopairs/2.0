import { AppState } from "homepairs-types";
import { PropertyListActions , HeaderActions } from "homepairs-redux-actions";
import { connect } from "react-redux";
import { withNavigation } from "react-navigation";
import { withDarkMode } from 'homepairs-components';
import TenantPropertyScreenBase, { TenantPropertyStateProps, TenantPropertyDispatchProps} from './TenantPropertyScreenBase';


function mapStateToProps(state: AppState) : TenantPropertyStateProps {
    return { propertyState: state.properties};
};

const mapDispatchToProps: (
    dispatch: any
  ) => TenantPropertyDispatchProps = dispatch => ({
    onRevealGoBack: (showBackButton: boolean) => {
      dispatch(HeaderActions.showGoBackButton(showBackButton));
    },
  });

const TenantPropertyScreen = connect(
  mapStateToProps,
  // mapDispatchToProps,
)(TenantPropertyScreenBase);

export default withDarkMode(withNavigation(TenantPropertyScreen));