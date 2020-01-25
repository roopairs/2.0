import { AppState, MainAppStackType } from 'homepair-types';
import { connect } from 'react-redux';
import { withSceneHeader, withDarkMode } from 'homepair-components';
import strings from 'homepair-strings';
import ServiceRequestScreenBase, {
    ServiceRequestScreenStateProps,
} from './ServiceRequestScreenBase';
import { withNavigation } from 'react-navigation';

const serviceRequestStrings = strings.serviceRequestPage;
const sceneParam: MainAppStackType = {
    title: serviceRequestStrings.title,
    navigate: 'ServiceRequest',
    key: 'ServiceRequest',
    button: serviceRequestStrings.button,
    onButtonClick: (props: any) => {
        props.navigation.push('NewRequest');
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
