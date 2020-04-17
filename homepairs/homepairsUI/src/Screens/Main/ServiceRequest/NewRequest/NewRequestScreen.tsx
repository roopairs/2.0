import { AppState, MainAppStackType, PropertyManagerAccount } from 'homepairs-types';
import { connect } from 'react-redux';
import { withSceneHeader} from 'homepairs-components';
import { prepareNavigationHandlerComponent } from 'homepairs-utilities';
import NewRequestScreenBase from './NewRequestScreenBase';

const sceneParam: MainAppStackType = {
    title: 'New Service Request',
    navigate: 'NewRequest',
    key: 'NewRequest',
};

function mapStateToProps(state: AppState) : any {
    return {
        properties: state.properties.properties,
        token: state.accountProfile.roopairsToken,
        pmId: (state.accountProfile as (PropertyManagerAccount)).pmId,
    };
}

const NewServiceRequestScreen = connect(
    mapStateToProps,
)(NewRequestScreenBase);


// Make sure the base also has Navigation Props, this is not passed down in withSceneHeader
const NewServiceRequestScreenWithNavigation = prepareNavigationHandlerComponent(NewServiceRequestScreen);

// Now render the component with the SceneHeader. This way, if the child needs to the use the 
// navigator, it is not reliant on the parent. 
export default prepareNavigationHandlerComponent(withSceneHeader(NewServiceRequestScreenWithNavigation, sceneParam));
