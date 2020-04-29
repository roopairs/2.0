import { connect } from "react-redux";
import { AppState, PropertyManagerAccount } from 'homepairs-types';
import { prepareNavigationHandlerComponent, NavigationRouteHandler, SERVICE_REQUEST } from 'homepairs-routes';
import { postPreferredProvider, fetchPreferredProviders } from 'homepairs-endpoints';
import { AddServiceProviderModalBase, AddServiceProviderDispatchProps} from './AddServiceProviderModalBase';

const mapDispatchToProps : (dispatch: any) => AddServiceProviderDispatchProps = (dispatch: any) => ({
    onAddServiceProvider: (
        pmId: number,
        phoneNum: string,
        setInitialState: () => void, 
        displayError: (msg: string) => void, 
        navigation: NavigationRouteHandler) => 
    {
        // The api request takes care of itself. It will return a response that we can use.
        postPreferredProvider(pmId, phoneNum).then(() => {
            dispatch(fetchPreferredProviders(String(pmId)));
            setInitialState();
            navigation.resolveModalReplaceNavigation(SERVICE_REQUEST);
        }).catch((error: Error) => {
            displayError(error.message);
            setInitialState();
        });
    },
});

function mapStateToProps(state: AppState) : any {
    return {
        pmId: (state.accountProfile as (PropertyManagerAccount)).pmId,
    };
}


const ConnectedComponent = connect(
  mapStateToProps, 
  mapDispatchToProps,
  )(AddServiceProviderModalBase);

export default prepareNavigationHandlerComponent(ConnectedComponent);