import { AppState, MainAppStackType } from 'homepairs-types';
import { connect } from 'react-redux';
import { updateSelectedPage } from 'homepairs-redux-actions';
import strings from 'homepairs-strings';
import { convertObjectValuesToArray } from 'homepairs-utilities';
import { prepareNavigationHandlerComponent, navigationPages, SERVICE_REQUEST} from 'homepairs-routes';
import {
    ServiceRequestScreenBase,
    ServiceRequestScreenStateProps,
    ServiceRequestScreenProps,
    ServiceRequestsScreenDispatchProps,
} from './ServiceRequestScreenBase';
import {withSceneHeader, withHeaderUpdate} from '../../components';

const serviceRequestStrings = strings.serviceRequestPage;
const sceneParam: MainAppStackType = {
    title: serviceRequestStrings.title,
    navigate: SERVICE_REQUEST,
    button: serviceRequestStrings.button,
    onNavButtonClick: (props: ServiceRequestScreenProps) => {
        props.navigation.navigate(navigationPages.NewRequest);
        props.onSetNavHeaderGoBackButton(true);
    },
    doesButtonUseNavigate: true,
};

function mapStateToProps(state: AppState): ServiceRequestScreenStateProps {
    const {header, serviceRequests, properties, accountProfile} = state;
    return {
        pmInfo: properties.propertyManager,
        accountType: accountProfile.accountType,
        serviceRequestsState: serviceRequests,
        header,
        properties: convertObjectValuesToArray(properties.properties),
    };
}

function mapDispatchToProps(dispatch:any): ServiceRequestsScreenDispatchProps {
    return {
        onUpdateHeader: (selected: MainAppStackType) => {
            dispatch(updateSelectedPage(selected));
        },
    };
};

const ServiceRequestScreen = connect(
    mapStateToProps,
    mapDispatchToProps,
)(ServiceRequestScreenBase);

/**
 * ---------------------------------------------------
 * ServiceRequestScreen
 * ---------------------------------------------------
 * This is intended to be used in the Main Navigation Stack. This component is connected to the 
 * HomePairs redux store, the react-native Navigator, and our very own withSceneHeader HOC. It also 
 * can be injected with a Modal; this gives this component the capability to reveal a smaller page 
 * that allows the user to add a new service request to their account. 
 */

export default withHeaderUpdate(prepareNavigationHandlerComponent(withSceneHeader(ServiceRequestScreen, sceneParam)), sceneParam);
