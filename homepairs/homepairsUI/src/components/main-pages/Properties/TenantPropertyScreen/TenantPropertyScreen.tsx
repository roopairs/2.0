import { AppState } from "homepairs-types";
import { connect } from "react-redux";
import { TenantPropertyScreenBase, TenantPropertyStateProps} from './TenantPropertyScreenBase';
import { withSinglePropertyConnect } from "../components";

function mapStateToProps(state: AppState) : TenantPropertyStateProps {
    return { 
      propertyManager: state.properties.propertyManager, 
      apiKey: state.settings.apiKey,
    };
};

export default connect(mapStateToProps)(withSinglePropertyConnect(TenantPropertyScreenBase));
