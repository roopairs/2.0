import { AppState, MainAppStackType } from 'homepairs-types';
import { connect } from 'react-redux';
import { withSceneHeader} from 'homepairs-components';
import strings from 'homepairs-strings';
import { withNavigation } from 'react-navigation';
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
        props.navigation.push('NewRequest');
        props.onSetNavHeaderGoBackButton(true);
    },
    doesButtonUseNavigate: true,
};

function mapStateToProps(state: AppState): ServiceRequestScreenStateProps {
    return {
        // TODO: Add pass favorite Service Providers into props
        serviceRequests: state.serviceRequests,
        header: state.header,
    };
}

const mapDispatchToProps = dispatch => ({
    // TODO: map proper methods into Service Requests page
});

const ServiceRequestScreen = connect(
    mapStateToProps,
    mapDispatchToProps,
)(ServiceRequestScreenBase);


// Make sure the base also has Navigation Props, this is not passed down in withSceneHeader
const ServiceRequestScreenWithNavigation = withNavigation(ServiceRequestScreen);

// Now render the component with the SceneHeader. This way, if the child needs to the use the 
// navigator, it is not reliant on the parent. 
export default withNavigation(withSceneHeader(ServiceRequestScreenWithNavigation, sceneParam));
