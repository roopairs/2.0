import { AppState } from "homepairs-types";
import { connect } from "react-redux";
import { prepareNavigationHandlerComponent } from 'homepairs-routes';
import { TenantPropertyScreenBase, TenantPropertyStateProps} from './TenantPropertyScreenBase';

function mapStateToProps(state: AppState) : TenantPropertyStateProps {
    return { 
      propertyState: state.properties, 
      apiKey: state.settings.apiKey,
    };
};

const TenantPropertyScreen = connect(
  mapStateToProps,
)(TenantPropertyScreenBase);

export default prepareNavigationHandlerComponent(TenantPropertyScreen);

