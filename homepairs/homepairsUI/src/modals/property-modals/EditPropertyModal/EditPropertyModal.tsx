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
    const propId = state.properties.selectedPropertyId;
    return {
        email: state.accountProfile.email, 
        propId, 
        oldProp: state.properties.properties[propId],
        roopairsToken: state.accountProfile.token,
    };
}

export default prepareNavigationHandlerComponent(connect(
    mapStateToProps, 
    mapDispatchToProps)(EditPropertyModalBase));
