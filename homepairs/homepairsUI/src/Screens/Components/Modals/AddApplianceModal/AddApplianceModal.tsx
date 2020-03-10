import { connect } from "react-redux";
import { PropertyListActions } from 'homepairs-redux-actions';
import { Appliance, AddApplianceState } from 'homepairs-types';
import {NavigationRouteHandler, prepareNavigationHandlerComponent} from 'homepairs-utilities';
import  AddApplianceModalBase, { AddApplianceDispatchProps} from './AddApplianceModalBase';


const mapDispatchToProps : (dispatch: any) => AddApplianceDispatchProps = (dispatch: any) => ({
    onCreateAppliance: (newAppliance: Appliance, info: AddApplianceState, setInitialState: () => void, 
         displayError: (msg: string) => void, navigation: NavigationRouteHandler) => 
    {
        dispatch(PropertyListActions.postNewAppliance(newAppliance, info, setInitialState, displayError, navigation));
    },
});


export default prepareNavigationHandlerComponent(connect(
  null, 
  mapDispatchToProps)(AddApplianceModalBase));