import { connect } from "react-redux";
import { AppState, PropertyManagerAccount } from 'homepairs-types';
import { prepareNavigationHandlerComponent, NavigationRouteHandler, SERVICE_REQUEST } from 'homepairs-routes';
import { postPreferredProvider, fetchPreferredProviders } from 'homepairs-endpoints';
import { AddServiceProviderModalBase, AddServiceProviderDispatchProps} from './AddServiceProviderModalBase';

const PSP_NOT_FOUND = `No service provider with this phone number was found in our system.`;
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
            // These are the two error messages we can present. The fact that there was an 
            // invalid phone number sent to the backend or there was another issue. Feel 
            // free to change this up. 
            if(error.message.includes('500')) 
                displayError(PSP_NOT_FOUND);
            else
                displayError(error.message);
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