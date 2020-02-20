import { AppState } from 'homepairs-types';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';
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

const DetailedPropertyScreenWithNavigation = withNavigation(DetailedPropertyScreen);
export default DetailedPropertyScreenWithNavigation;
