import { AppState } from "homepairs-types";
import { connect } from "react-redux";
import { withNavigation } from "react-navigation";
import TenantPropertyScreenBase, { TenantPropertyStateProps} from './TenantPropertyScreenBase';


function mapStateToProps(state: AppState) : TenantPropertyStateProps {
    return { propertyState: state.properties };
};

const TenantPropertyScreen = connect(
  mapStateToProps,
)(TenantPropertyScreenBase);

export default withNavigation(TenantPropertyScreen);