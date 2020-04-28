import { connect } from "react-redux";
import { AppState, PropertyManagerAccount } from 'homepairs-types';
import { prepareNavigationHandlerComponent, NavigationRouteHandler } from 'homepairs-routes';
import { postPreferredProvider } from 'homepairs-endpoints';
import  {AddServiceProviderModalBase, AddServiceProviderDispatchProps} from './AddServiceProviderModalBase';

const mapDispatchToProps : (dispatch: any) => AddServiceProviderDispatchProps = (dispatch: any) => ({
    onAddServiceProvider: (
        pmId: number,
        phoneNum: string,
        setInitialState: () => void, 
        displayError: (msg: string) => void, 
        navigation: NavigationRouteHandler) => 
    {
        dispatch(postPreferredProvider(pmId, phoneNum, setInitialState, displayError, navigation));
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