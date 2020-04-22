import { AppState } from 'homepairs-types';
import { connect } from 'react-redux';
import { prepareNavigationHandlerComponent } from 'homepairs-routes';
import DetailedPropertyScreenBase, {
    DetailedPropertyStateProps,
} from './DetailedPropertyScreenBase';

function mapStateToProps(state: AppState): DetailedPropertyStateProps {
    const {properties} = state;
    return { 
        property: {...properties.properties[properties.selectedPropertyIndex]},
        properties: properties.properties,
        token: state.accountProfile.roopairsToken,
    };
}


const DetailedPropertyScreen = connect(
    mapStateToProps,
)(DetailedPropertyScreenBase);


const DetailedPropertyScreenWithNavigation = prepareNavigationHandlerComponent(DetailedPropertyScreen);
export default DetailedPropertyScreenWithNavigation;
