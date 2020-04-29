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
        postPreferredProvider(pmId, phoneNum, displayError).then(response => {
            setInitialState();
            navigation.resolveModalReplaceNavigation(SERVICE_REQUEST);
            dispatch(fetchPreferredProviders(String(pmId)));
        }).catch(error => {

            .0.
            console.log(error);
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