import { AppState } from 'homepairs-types';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';
import { withRouter } from 'react-router-dom';
import DetailedPropertyScreenBase, {
    DetailedPropertyStateProps,
} from './DetailedPropertyScreenBase';
import { Platform } from 'react-native';
import { withNavigationRouteHandler } from 'src/utility/NavigationRouterHandler';

function mapStateToProps(state: AppState): DetailedPropertyStateProps {
    const {properties} = state;
    return { 
        property: properties.properties[properties.selectedPropertyIndex],
    };
}

const DetailedPropertyScreen = connect(
    mapStateToProps,
)(DetailedPropertyScreenBase);

const NavigableDetailedPropertyScreen = withNavigationRouteHandler(DetailedPropertyScreen);
const DetailedPropertyScreenWithNavigation = Platform.OS === 'web' ? withRouter(NavigableDetailedPropertyScreen) : withNavigation(NavigableDetailedPropertyScreen);
export default DetailedPropertyScreenWithNavigation;
