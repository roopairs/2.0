import { AppState } from "homepairs-types";
import { connect } from "react-redux";
import { TenantPropertyScreenBase, TenantPropertyStateProps} from './TenantPropertyScreenBase';

function mapStateToProps(state: AppState) : TenantPropertyStateProps {
    return { 
      propertyManager: state.properties.propertyManager, 
      apiKey: state.settings.apiKey,
    };
};

export default connect(
  mapStateToProps,
)(TenantPropertyScreenBase);

// export default withHeaderUpdate(prepareNavigationHandlerComponent(withSinglePropertyConnect(TenantPropertyScreen)), HOME_INDEX);

