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


export default withNavigation(connect(
  null, 
  mapDispatchToProps)(EditApplianceModalBase));