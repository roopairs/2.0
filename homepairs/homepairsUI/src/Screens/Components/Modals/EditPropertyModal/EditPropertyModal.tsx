import { connect } from "react-redux";
import { PropertyListActions } from 'homepairs-redux-actions';
import { Property, AppState, EditPropertyState } from 'homepairs-types';
import { NavigationStackProp } from 'react-navigation-stack';
import { withNavigation } from "react-navigation";
import EditPropertyModalBase, {EditPropertyDispatchProps} from './EditPropertyModalBase';

const mapDispatchToProps : (dispatch: any) => EditPropertyDispatchProps = (dispatch: any) => ({
    onEditProperty: (editProperty: Property, info: EditPropertyState, navigation: NavigationStackProp) => {
        dispatch(PropertyListActions.postUpdatedProperty(editProperty, info, navigation));
    },
});

function mapStateToProps(state: AppState) : EditPropertyState {
    const propIndex = state.properties.selectedPropertyIndex;
    return {
        email: state.accountProfile.email, 
        index: propIndex, oldProp: state.properties.properties[propIndex],
        roopairsToken: state.accountProfile.roopairsToken,
    };
}

export default withNavigation(connect(
    mapStateToProps, 
    mapDispatchToProps)(EditPropertyModalBase));

