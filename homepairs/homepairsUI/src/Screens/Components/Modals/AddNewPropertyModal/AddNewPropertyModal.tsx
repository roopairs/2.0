import { connect } from "react-redux";
import { PropertyListActions } from 'homepairs-redux-actions';
import { Property, AppState, AddNewPropertyState } from 'homepairs-types';
import { withNavigation } from "react-navigation";
import { NavigationStackProp } from "react-navigation-stack";
import  AddNewPropertyModalBase, { AddNewPropertyDispatchProps} from './AddNewPropertyModalBase';


const mapDispatchToProps : (dispatch: any) => AddNewPropertyDispatchProps = (dispatch: any) => ({
    onCreateProperty: (newProperty: Property, info: AddNewPropertyState, setInitialState: () => void, navigation: NavigationStackProp)  => {
        dispatch(PropertyListActions.postNewProperty(newProperty, info, setInitialState, navigation));
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
  mapDispatchToProps)(AddNewPropertyModalBase));

