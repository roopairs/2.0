import { AppState } from 'homepairs-types';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';
import {withModal} from 'homepairs-components';
import EditPropertyModal from 'src/Screens/Components/Modals/EditPropertyModal/EditPropertyModal';
import DetailedPropertyScreenBase, {
    DetailedPropertyStateProps,
} from './DetailedPropertyScreenBase';

function mapStateToProps(state: AppState): DetailedPropertyStateProps {
    const {properties} = state;
    return { 
        property: properties.properties[properties.selectedPropertyIndex],
    };
}

const DetailedPropertyScreen = connect(
    mapStateToProps,
)(DetailedPropertyScreenBase);

export default withModal(withNavigation(DetailedPropertyScreen), EditPropertyModal);
