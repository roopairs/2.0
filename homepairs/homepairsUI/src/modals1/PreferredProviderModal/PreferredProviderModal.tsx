import { connect } from "react-redux";
import {prepareNavigationHandlerComponent, NavigationRouteHandler} from 'homepairs-routes';
import {deletePreferredProvider} from 'homepairs-endpoints';
import {ServiceProvider, AppState, PreferredServiceProviderState} from 'homepairs-types';
import { PreferredProvidertModalBase, PreferredProviderModalDispatchProps, PreferredProviderStateProps } from './PreferredProviderModalBase';

function mapStateToProps(state: AppState) : PreferredProviderStateProps {
    return {
        preferredProvider: (state.preferredProviders as (PreferredServiceProviderState)).serviceProviders,
    };
}

const mapDispatchToProps : (dispatch: any) => PreferredProviderModalDispatchProps= (dispatch: any) => ({
    onRemoveServiceProvider: (
        serviceProvider: ServiceProvider, 
        displayError: (error:string) => void,
        navigation: NavigationRouteHandler) => 
    {
        dispatch(deletePreferredProvider(serviceProvider, displayError, navigation));
    },
});


const ConnectedComponent = connect(
  mapStateToProps, 
  mapDispatchToProps,
)(PreferredProvidertModalBase);

  export default prepareNavigationHandlerComponent(ConnectedComponent);
