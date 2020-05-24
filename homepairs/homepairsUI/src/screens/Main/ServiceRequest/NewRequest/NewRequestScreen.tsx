import { AppState, MainAppStackType, PropertyManagerAccount } from 'homepairs-types';
import { connect } from 'react-redux';
import { updateSelectedPage } from 'homepairs-redux-actions';
import { prepareNavigationHandlerComponent, NEW_SERVICE_REQUEST } from 'homepairs-routes';
import { convertObjectValuesToArray } from 'homepairs-utilities';
import { NewServiceRequestBase, NewRequestScreenDispatchProps, NewRequestScreenStateProps } from './NewRequestScreenBase';
import {withSceneHeader} from '../../SceneHeader/WithSceneHeader';

const sceneParam: MainAppStackType = {
    title: 'New Service Request',
    navigate: 'NewRequest',
};

function mapStateToProps(state: AppState) : NewRequestScreenStateProps {
    const properties = convertObjectValuesToArray(state.properties.properties);
    return {
        accountType: state.accountProfile.accountType,
        properties,
        token: state.accountProfile.roopairsToken,
        pmId: (state.accountProfile as (PropertyManagerAccount)).pmId,
    };
}

function mapDispatchToProps(dispatch:any): NewRequestScreenDispatchProps {
    const selected: MainAppStackType = {
        title: 'New Service Request',
        navigate: NEW_SERVICE_REQUEST,
    };
    return {
        onUpdateHeader: () => {
            dispatch(updateSelectedPage(selected));
        },
    };
};

const NewServiceRequestScreen = connect(
    mapStateToProps,
    mapDispatchToProps,
)(NewServiceRequestBase);


// Make sure the base also has Navigation Props, this is not passed down in withSceneHeader
const NewServiceRequestScreenWithNavigation = prepareNavigationHandlerComponent(NewServiceRequestScreen);

// Now render the component with the SceneHeader. This way, if the child needs to the use the 
// navigator, it is not reliant on the parent. 
export default prepareNavigationHandlerComponent(withSceneHeader(NewServiceRequestScreenWithNavigation, sceneParam));
