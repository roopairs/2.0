import { AppState, MainAppStackType } from 'homepairs-types';
import { connect } from 'react-redux';
import { withSceneHeader, withDarkMode } from 'homepairs-components';
import { ServiceActions } from 'homepairs-redux-actions';
import { withNavigation } from 'react-navigation';
import NewRequestScreenBase, {
    NewRequestScreenProps,
} from './NewRequestScreenBase';

// const serviceRequestStrings = strings.serviceRequestPage;
const sceneParam: MainAppStackType = {
    title: 'New Service Request',
    navigate: 'NewRequest',
    key: 'NewRequest',
};

function mapStateToProps(state: AppState): NewRequestScreenProps {
    return {
        // TODO: Add pass favorite Service Providers into props
        header: state.header,
    };
}

const mapDispatchToProps = dispatch => ({
    // TODO: map proper methods into Service Requests page
});

const ServiceRequestScreen = connect(
    mapStateToProps,
    mapDispatchToProps,
)(NewRequestScreenBase);

export default withDarkMode(withNavigation(withSceneHeader(ServiceRequestScreen, sceneParam)));
