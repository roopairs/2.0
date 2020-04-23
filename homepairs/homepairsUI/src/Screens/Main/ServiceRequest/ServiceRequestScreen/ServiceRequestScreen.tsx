import { AppState, MainAppStackType } from 'homepairs-types';
import { connect } from 'react-redux';
import { withSceneHeader } from 'homepairs-components';
import strings from 'homepairs-strings';
import { navigationPages } from 'src/routes/RouteConstants';
import { prepareNavigationHandlerComponent } from 'homepairs-routes';
import ServiceRequestScreenBase, {
    ServiceRequestScreenStateProps,
    ServiceRequestScreenProps,
} from './ServiceRequestScreenBase';

const serviceRequestStrings = strings.serviceRequestPage;
const sceneParam: MainAppStackType = {
    title: serviceRequestStrings.title,
    navigate: 'ServiceRequest',
    key: 'ServiceRequest',
    button: serviceRequestStrings.button,
    onNavButtonClick: (props: ServiceRequestScreenProps) => {
        props.navigation.navigate(navigationPages.NewRequest);
        props.onSetNavHeaderGoBackButton(true);
    },
    doesButtonUseNavigate: true,
};

function mapStateToProps(state: AppState): ServiceRequestScreenStateProps {
    const {header, serviceRequests, properties} = state;
    const propertyList = properties.properties;
    return {
        // TODO: Add pass favorite Service Providers into props
        serviceRequestsState: serviceRequests,
        header,
        properties: propertyList,
    };
}

const mapDispatchToProps = dispatch => ({
    // TODO: map proper methods into Service Requests page
});

const ServiceRequestScreen = connect(
    mapStateToProps,
    mapDispatchToProps,
)(ServiceRequestScreenBase);

/**
 * ---------------------------------------------------
 * ServiceRequestScreen
 * ---------------------------------------------------
 * This is intended to be used in the Main Navigation Stack. This component is connected to the 
 * HomePairs redux store, the react-native Navigator, and our very own withSceneHeader HOC. It also 
 * can be injected with a Modal; this gives this component the capability to reveal a smaller page 
 * that allows the user to add a new service request to their account. 
 */

export default prepareNavigationHandlerComponent(withSceneHeader(ServiceRequestScreen, sceneParam));
