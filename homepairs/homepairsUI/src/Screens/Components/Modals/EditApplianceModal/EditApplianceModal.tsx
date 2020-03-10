import { connect } from "react-redux";
import { PropertyListActions } from 'homepairs-redux-actions';
import { Appliance  } from 'homepairs-types';
import {NavigationRouteHandler, prepareNavigationHandlerComponent} from 'homepairs-utilities';
import  EditApplianceModalBase, { EditApplianceDispatchProps} from './EditApplianceModalBase';


const mapDispatchToProps : (dispatch: any) => EditApplianceDispatchProps = (dispatch: any) => ({
    onEditAppliance: (newAppliance: Appliance,
         displayError: (msg: string) => void, navigation: NavigationRouteHandler) => 
    {
        dispatch(PropertyListActions.postUpdatedAppliance(newAppliance, displayError, navigation));
    },
});


export default prepareNavigationHandlerComponent(connect(
  null, 
  mapDispatchToProps)(EditApplianceModalBase));