import { connect } from "react-redux";
import { AppState, PropertyManagerAccount } from 'homepairs-types';
import { prepareNavigationHandlerComponent, NavigationRouteHandler, SERVICE_REQUEST } from 'src/routes';
import { postPreferredProvider, fetchPreferredProviders } from 'homepairs-endpoints';
import { AddServiceProviderModalBase, AddServiceProviderDispatchProps} from './AddServiceProviderModalBase';


const DefaultMessage: string = "No service provider with this phone number was found in our system.";

const mapDispatchToProps : (dispatch: any) => AddServiceProviderDispatchProps = (dispatch: any) => ({
    onAddServiceProvider: (
        token: string,
        phoneNum: string,
        setInitialState: () => void, 
        displayError: (check: boolean, message?: string) => void, 
        navigation: NavigationRouteHandler) => 
    {
        // The api request takes care of itself. It will return a response that we can use. 
        postPreferredProvider(token, phoneNum).then(() => {
            dispatch(fetchPreferredProviders(token));
            setInitialState();
            navigation.resolveModalReplaceNavigation(SERVICE_REQUEST);
        }).catch((error: Error) => {
            if(error.message.includes('500')){
                console.log('if'); 
                console.log(error.message);
                displayError(true, DefaultMessage);
            }
            else{
                console.log('else'); 
                console.log(error.message);
                displayError(true, error.message);
            }
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