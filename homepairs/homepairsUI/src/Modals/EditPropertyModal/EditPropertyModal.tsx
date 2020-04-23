import { connect } from "react-redux";
import { Property, AppState, EditPropertyState } from 'homepairs-types';
import { prepareNavigationHandlerComponent, NavigationRouteHandler } from 'homepairs-routes';
import { postUpdatedProperty } from 'homepairs-endpoints';
import EditPropertyModalBase, {EditPropertyDispatchProps} from './EditPropertyModalBase';

const mapDispatchToProps : (dispatch: any) => EditPropertyDispatchProps = (dispatch: any) => ({
    onEditProperty: (editProperty: Property, info: EditPropertyState, displayError: (msg: string) => void, navigation: NavigationRouteHandler) => 
        {
            dispatch(postUpdatedProperty(editProperty, info, displayError, navigation));
        },
});

function mapStateToProps(state: AppState) : EditPropertyState {
    const propIndex = state.properties.selectedPropertyIndex;
    return {
        email: state.accountProfile.email, 
        index: propIndex, 
        oldProp: state.properties.properties[propIndex],
        roopairsToken: state.accountProfile.roopairsToken,
    };
}

export default prepareNavigationHandlerComponent(connect(
    mapStateToProps, 
    mapDispatchToProps)(EditPropertyModalBase));
