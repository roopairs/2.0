import { connect } from "react-redux";
import { PropertyListActions } from 'homepairs-redux-actions';
import { Appliance, AppState, AddApplianceState } from 'homepairs-types';
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

function mapStateToProps(state: AppState) : any {
    const propIndex = state.properties.selectedPropertyIndex;
    return {
        email: state.accountProfile.email, 
        roopairsToken: state.accountProfile.roopairsToken,
        property: state.properties.properties[propIndex],
    };
}

export default withNavigation(connect(
  mapStateToProps, 
  mapDispatchToProps)(AddApplianceModalBase));