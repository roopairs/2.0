import { AppState, MainAppStackType, PropertyManagerAccount, TenantAccount } from 'homepairs-types';
import { connect } from 'react-redux';
import { updateSelectedPage } from 'homepairs-redux-actions';
import { prepareNavigationHandlerComponent, NEW_SERVICE_REQUEST } from 'homepairs-routes';
import { convertObjectValuesToArray } from 'homepairs-utilities';
import { NewServiceRequestBase, NewRequestScreenDispatchProps, NewRequestScreenStateProps } from './NewRequestScreenBase';
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
        token: state.accountProfile.roopairsToken,
        pmId: (state.accountProfile as (PropertyManagerAccount)).pmId,
        tenId: (state.accountProfile as (TenantAccount)).tenantId,
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
