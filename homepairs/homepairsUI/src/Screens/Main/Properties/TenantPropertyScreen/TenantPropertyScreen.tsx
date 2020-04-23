import { AppState } from "homepairs-types";
import { connect } from "react-redux";
import { withNavigation } from "react-navigation";
import { withNavigationRouteHandler } from 'homepairs-routes';
import { Platform } from "react-native";
import { withRouter } from 'react-router-dom';
import TenantPropertyScreenBase, { TenantPropertyStateProps} from './TenantPropertyScreenBase';

function mapStateToProps(state: AppState) : TenantPropertyStateProps {
    return { propertyState: state.properties };
};

const TenantPropertyScreen = connect(
  mapStateToProps,
)(TenantPropertyScreenBase);
const NavigableTenantPropertyScreen = withNavigationRouteHandler(TenantPropertyScreen);
export default Platform.OS === 'web' ? withRouter(NavigableTenantPropertyScreen) : withNavigation(TenantPropertyScreen);

