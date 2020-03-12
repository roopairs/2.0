import { AppState, MainAppStackType, ServiceRequest, PropertyManagerAccount } from 'homepairs-types';
import { connect } from 'react-redux';
import { withSceneHeader} from 'homepairs-components';
import { ServiceActions } from 'homepairs-redux-actions';
import { prepareNavigationHandlerComponent, NavigationRouteHandler } from 'homepairs-utilities';
import NewRequestScreenBase, {NewRequestDispatchProps} from './NewRequestScreenBase';

// const serviceRequestStrings = strings.serviceRequestPage;
const sceneParam: MainAppStackType = {
    title: 'New Service Request',
    navigate: 'NewRequest',
    key: 'NewRequest',
};

const mapDispatchToProps : (dispatch: any) => NewRequestDispatchProps = (dispatch: any) => ({
    onCreateServiceRequest: (newServReq: ServiceRequest, setInitialState: () => void, 
         displayError: (msg: string) => void, navigation: NavigationRouteHandler) => 
    {
        dispatch(ServiceActions.postNewServiceRequest(newServReq, setInitialState, displayError, navigation));
    },
});

function mapStateToProps(state: AppState) : any {
    return {
        properties: state.properties.properties,
        pmId: (state.accountProfile as (PropertyManagerAccount)).pmId,
    };
}

const ServiceRequestScreen = connect(
    mapStateToProps,
    mapDispatchToProps,
)(NewRequestScreenBase);


// Make sure the base also has Navigation Props, this is not passed down in withSceneHeader
const ServiceRequestScreenWithNavigation = prepareNavigationHandlerComponent(ServiceRequestScreen);

// Now render the component with the SceneHeader. This way, if the child needs to the use the 
// navigator, it is not reliant on the parent. 
export default prepareNavigationHandlerComponent(withSceneHeader(ServiceRequestScreenWithNavigation, sceneParam));
