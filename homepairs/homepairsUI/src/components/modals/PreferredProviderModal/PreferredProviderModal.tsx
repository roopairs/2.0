import { connect } from "react-redux";
import {prepareNavigationHandlerComponent, NavigationRouteHandler} from 'src/routes';
import {deletePreferredProvider} from 'homepairs-endpoints';
import {ServiceProvider, AppState, PreferredServiceProviderState, PropertyManagerAccount} from 'homepairs-types';
import { PreferredProvidertModalBase, PreferredProviderModalDispatchProps, PreferredProviderStateProps } from './PreferredProviderModalBase';

function mapStateToProps(state: AppState) : PreferredProviderStateProps {
    return {
        token: (state.accountProfile as (PropertyManagerAccount)).roopairsToken,
        preferredProvider: (state.preferredProviders as (PreferredServiceProviderState)).serviceProviders,
    };
}

const mapDispatchToProps : (dispatch: any) => PreferredProviderModalDispatchProps= (dispatch: any) => ({
    onRemoveServiceProvider: (
        token: string,
        serviceProvider: ServiceProvider, 
        displayError: (error:string) => void,
        navigation: NavigationRouteHandler) => 
    {
        dispatch(deletePreferredProvider(token, serviceProvider, displayError, navigation));
    },
});


const ConnectedComponent = connect(
  mapStateToProps, 
  mapDispatchToProps,
)(PreferredProvidertModalBase);

  export default prepareNavigationHandlerComponent(ConnectedComponent);
