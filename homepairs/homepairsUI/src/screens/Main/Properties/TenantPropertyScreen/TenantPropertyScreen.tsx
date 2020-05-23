import { AppState } from "homepairs-types";
import { connect } from "react-redux";
import { prepareNavigationHandlerComponent, MainAppStackTenant as MainAppStack, HOME_INDEX } from 'homepairs-routes';
import { TenantPropertyScreenBase, TenantPropertyStateProps} from './TenantPropertyScreenBase';
import withHeaderUpdate from '../../withHeaderUpdate';

function mapStateToProps(state: AppState) : TenantPropertyStateProps {
    return { 
      propertyState: state.properties, 
      apiKey: state.settings.apiKey,
    };
};


const TenantPropertyScreen = connect(
  mapStateToProps,
)(TenantPropertyScreenBase);

export default withHeaderUpdate(prepareNavigationHandlerComponent(TenantPropertyScreen), HOME_INDEX);

