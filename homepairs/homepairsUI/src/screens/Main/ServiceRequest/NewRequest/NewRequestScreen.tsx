import { AppState, MainAppStackType, PropertyManagerAccount, TenantAccount } from 'homepairs-types';
import { connect } from 'react-redux';
import { prepareNavigationHandlerComponent, NEW_SERVICE_REQUEST } from 'homepairs-routes';
import { convertObjectValuesToArray } from 'homepairs-utilities';
import { NewServiceRequestBase, NewRequestScreenStateProps } from './NewRequestScreenBase';
import {withSceneHeader, withHeaderUpdate} from '../../components';

const sceneParam: MainAppStackType = {
    title: 'New Service Request',
    navigate: NEW_SERVICE_REQUEST,
};

function mapStateToProps(state: AppState) : NewRequestScreenStateProps {
    const properties = convertObjectValuesToArray(state.properties.properties);
    return {
        accountType: state.accountProfile.accountType,
        properties,
        token: state.accountProfile.token,
        pmId: (state.accountProfile as (PropertyManagerAccount)).pmId,
        phoneNumber: (state.accountProfile as (TenantAccount)).phoneNumber,
    };
}

const NewServiceRequestScreen = connect(
    mapStateToProps,
)(NewServiceRequestBase);


// Make sure the base also has Navigation Props, this is not passed down in withSceneHeader
const NewServiceRequestScreenWithNavigation = prepareNavigationHandlerComponent(NewServiceRequestScreen);

// Now render the component with the SceneHeader. This way, if the child needs to the use the 
// navigator, it is not reliant on the parent. 
export default prepareNavigationHandlerComponent(withHeaderUpdate(withSceneHeader(NewServiceRequestScreenWithNavigation, sceneParam), sceneParam));
