import { AppState } from 'homepairs-types';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';
import {withModal} from 'homepairs-components';
import EditPropertyModal from 'src/Screens/Components/Modals/EditPropertyModal/EditPropertyModal';
import DetailedPropertyScreenBase, {
    DetailedPropertyStateProps,
} from './DetailedPropertyScreenBase';

function mapStateToProps(state: AppState): DetailedPropertyStateProps {
    return { 
        property: state.propertyList.properties[state.propertyList.selectedPropertyIndex],
    };
}

const DetailedPropertyScreen = connect(
    mapStateToProps,
)(DetailedPropertyScreenBase);

export default withModal(withNavigation(DetailedPropertyScreen), EditPropertyModal);
