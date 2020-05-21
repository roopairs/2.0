import { AppState, MainAppStackType, PropertyManagerAccount } from 'homepairs-types';
import { connect } from 'react-redux';
import { updateSelectedPage } from 'homepairs-redux-actions';
import { withSceneHeader} from 'homepairs-components';
import { prepareNavigationHandlerComponent, NEW_SERVICE_REQUEST } from 'homepairs-routes';
import { convertObjectValuesToArray } from 'homepairs-utilities';
import { NewServiceRequestBase, NewRequestScreenDispatchProps } from './NewRequestScreenBase';

const sceneParam: MainAppStackType = {
    title: 'New Service Request',
    navigate: 'NewRequest',
    key: 'NewRequest',
};

function mapStateToProps(state: AppState) : any {
    const properties = convertObjectValuesToArray(state.properties.properties);
    console.log(state.accountProfile.roopairsToken);
    return {
        properties,
        token: state.accountProfile.roopairsToken,
        pmId: (state.accountProfile as (PropertyManagerAccount)).pmId,
        isPm: state.accountProfile.accountType,
    };
}

function mapDispatchToProps(dispatch:any): NewRequestScreenDispatchProps {
    const selected: MainAppStackType = {
        key: 'New Service Request',
        title: 'New Service Request',
        navigate: NEW_SERVICE_REQUEST,
    };
    return {
        onUpdateHeader: (navPage: MainAppStackType = selected) => {
            dispatch(updateSelectedPage(navPage));
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
