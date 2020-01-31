import { AppState, MainAppStackType } from 'homepairs-types';
import { connect } from 'react-redux';
import { withSceneHeader, withDarkMode, SceneInjectedProps } from 'homepairs-components';
import strings from 'homepairs-strings';
import { withNavigation } from 'react-navigation';
import ServiceRequestScreenBase, {
    ServiceRequestScreenStateProps,
} from './ServiceRequestScreenBase';

const serviceRequestStrings = strings.serviceRequestPage;
const sceneParam: MainAppStackType = {
    title: serviceRequestStrings.title,
    navigate: 'ServiceRequest',
    key: 'ServiceRequest',
    button: serviceRequestStrings.button,
    onButtonClick: (props: SceneInjectedProps) => {
        props.navigation.push('NewRequest');
        props.onSetHeaderGoBackButton(true);
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

export default withDarkMode(withNavigation(withSceneHeader(ServiceRequestScreen, sceneParam)));
