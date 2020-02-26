import { AppState } from 'homepairs-types';
import { connect } from 'react-redux';
import { prepareNavigationHandlerComponent } from 'src/utility/NavigationRouterHandler';
import DetailedPropertyScreenBase, {
    DetailedPropertyStateProps,
} from './DetailedPropertyScreenBase';

function mapStateToProps(state: AppState): DetailedPropertyStateProps {
    const {properties} = state;
    console.log(properties);
    return { 
        property: properties.properties[properties.selectedPropertyIndex],
    };
}

const DetailedPropertyScreen = connect(
    mapStateToProps,
)(DetailedPropertyScreenBase);


const DetailedPropertyScreenWithNavigation = prepareNavigationHandlerComponent(DetailedPropertyScreen);
export default DetailedPropertyScreenWithNavigation;
