import { connect } from "react-redux";
import { PropertyListActions } from 'homepairs-redux-actions';
import { Appliance, AddApplianceState } from 'homepairs-types';
import { withNavigation } from "react-navigation";
import { NavigationStackProp } from "react-navigation-stack";
import  AddApplianceModalBase, { AddApplianceDispatchProps} from './AddApplianceModalBase';


const mapDispatchToProps : (dispatch: any) => AddApplianceDispatchProps = (dispatch: any) => ({
    onCreateAppliance: (newAppliance: Appliance, info: AddApplianceState, setInitialState: () => void, 
         displayError: (msg: string) => void, navigation: NavigationStackProp) => 
    {
        dispatch(PropertyListActions.postNewAppliance(newAppliance, info, setInitialState, displayError, navigation));
    },
});


export default withNavigation(connect(
  null, 
  mapDispatchToProps)(AddApplianceModalBase));