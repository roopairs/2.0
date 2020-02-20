import { connect } from "react-redux";
import { PropertyListActions } from 'homepairs-redux-actions';
import { Appliance, AppState, EditApplianceState } from 'homepairs-types';
import { withNavigation } from "react-navigation";
import { NavigationStackProp } from "react-navigation-stack";
import  EditApplianceModalBase, { EditApplianceDispatchProps} from './EditApplianceModalBase';


const mapDispatchToProps : (dispatch: any) => EditApplianceDispatchProps = (dispatch: any) => ({
    onEditAppliance: (newAppliance: Appliance, info: EditApplianceState,
         displayError: (msg: string) => void, navigation: NavigationStackProp) => 
    {
        dispatch(PropertyListActions.postUpdatedAppliance(newAppliance, info, displayError, navigation));
    },
});

function mapStateToProps(state: AppState) : any {
    const propIndex = state.properties.selectedPropertyIndex;
    return {
        email: state.accountProfile.email, 
        roopairsToken: state.accountProfile.roopairsToken,
        oldAppliance: state.properties.appliances[propIndex],
        propId: state.properties.properties[propIndex].propId,
        index: propIndex, 
    };
}

export default withNavigation(connect(
  mapStateToProps, 
  mapDispatchToProps)(EditApplianceModalBase));