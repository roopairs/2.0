import { AppState } from 'homepairs-types';
import { connect } from 'react-redux';
import { prepareNavigationHandlerComponent } from 'homepairs-routes';
import {
    DetailedPropertyScreenBase,
    DetailedPropertyStateProps,
} from './DetailedPropertyScreenBase';

function mapStateToProps(state: AppState): DetailedPropertyStateProps {
    const {properties} = state;
    return { 
        properties: properties.properties,
        token: state.accountProfile.roopairsToken,
        apiKey: state.settings.apiKey,
    };
}


const DetailedPropertyScreen = connect(
    mapStateToProps,
)(DetailedPropertyScreenBase);
export default prepareNavigationHandlerComponent(DetailedPropertyScreen);
