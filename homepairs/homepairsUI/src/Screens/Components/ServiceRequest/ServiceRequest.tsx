import { connect } from "react-redux";
import { ServiceActions} from 'homepairs-redux-actions';
import { ServiceRequest, AppState } from 'homepairs-types';
import { prepareNavigationHandlerComponent, NavigationRouteHandler } from 'homepairs-utilities';
import  ServiceRequestBase, { ServiceRequestDispatchProps} from './ServiceRequestBase';

const mapDispatchToProps : (dispatch: any) => ServiceRequestDispatchProps = (dispatch: any) => ({
    onCreateServiceRequest: (newServReq: ServiceRequest, setInitialState: () => void, 
         displayError: (msg: string) => void, navigation: NavigationRouteHandler) => 
    {
        dispatch(ServiceActions.postNewServiceRequest(newServReq, setInitialState, displayError, navigation));
    },
});

function mapStateToProps(state: AppState) : any {
    return {
        properties: state.properties.properties,
    };
}


const ConnectedComponent = connect(
  mapStateToProps, 
  mapDispatchToProps,
  )(ServiceRequestBase);

export default prepareNavigationHandlerComponent(ConnectedComponent);