import { connect } from "react-redux";
import { PropertyListActions } from 'homepairs-redux-actions';
import { Appliance  } from 'homepairs-types';
import { withNavigation } from "react-navigation";
import { NavigationStackProp } from "react-navigation-stack";
import  EditApplianceModalBase, { EditApplianceDispatchProps} from './EditApplianceModalBase';


const mapDispatchToProps : (dispatch: any) => EditApplianceDispatchProps = (dispatch: any) => ({
    onEditAppliance: (newAppliance: Appliance,
         displayError: (msg: string) => void, navigation: NavigationStackProp) => 
    {
        dispatch(PropertyListActions.postUpdatedAppliance(newAppliance, displayError, navigation));
    },
});


export default withNavigation(connect(
  null, 
  mapDispatchToProps)(EditApplianceModalBase));