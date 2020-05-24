import { AppState } from "homepairs-types";
import { connect } from "react-redux";
import { prepareNavigationHandlerComponent, HOME_INDEX } from 'homepairs-routes';
import { TenantPropertyScreenBase, TenantPropertyStateProps} from './TenantPropertyScreenBase';
import { withHeaderUpdate } from '../../components';
import { withSinglePropertyConnect } from "../components";


function mapStateToProps(state: AppState) : TenantPropertyStateProps {
    return { 
      propertyManager: state.properties.propertyManager, 
      apiKey: state.settings.apiKey,
    };
};

const TenantPropertyScreen = connect(
  mapStateToProps,
)(TenantPropertyScreenBase);

export default withHeaderUpdate(prepareNavigationHandlerComponent(withSinglePropertyConnect(TenantPropertyScreen)), HOME_INDEX);

