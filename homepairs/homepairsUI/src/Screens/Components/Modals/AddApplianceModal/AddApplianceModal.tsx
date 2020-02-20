import { connect } from "react-redux";
import { PropertyListActions } from 'homepairs-redux-actions';
import { Appliance, AppState, AddNewPropertyState } from 'homepairs-types';
import { withNavigation } from "react-navigation";
import { NavigationStackProp } from "react-navigation-stack";
import  AddApplianceModalBase, { AddApplianceDispatchProps} from './AddApplianceModalBase';


const mapDispatchToProps : (dispatch: any) => AddApplianceDispatchProps = (dispatch: any) => ({
    onCreateAppliance: (newAppliance: Appliance, info: AddNewPropertyState, setInitialState: () => void, 
         displayError: (msg: string) => void, navigation: NavigationStackProp) => 
    {
        dispatch(PropertyListActions.postNewAppliance(newAppliance, info, setInitialState, displayError, navigation));
    },
});

function mapStateToProps(state: AppState) : any {
    return {
        email: state.accountProfile.email, 
        roopairsToken: state.accountProfile.roopairsToken,
    };
}

export default withNavigation(connect(
  mapStateToProps, 
  mapDispatchToProps)(AddApplianceModalBase));