import { AppState, MainAppStackType } from 'homepair-types';
import { connect } from 'react-redux';
import { withSceneHeader, withDarkMode } from 'homepair-components';
import { ServiceActions } from 'homepair-redux-actions';
import NewRequestScreenBase, {
    NewRequestScreenProps,
} from './NewRequestScreenBase';
import { withNavigation } from 'react-navigation';

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
