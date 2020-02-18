import { connect } from "react-redux";
import { PropertyListActions } from 'homepairs-redux-actions';
import { Property, AppState, AddNewPropertyState } from 'homepairs-types';
import  AddNewPropertyModalBase, { AddNewPropertyDispatchProps} from './AddNewPropertyModalBase';


const mapDispatchToProps : (dispatch: any) => AddNewPropertyDispatchProps = (dispatch: any) => ({
    onCreateProperty: (newProperty: Property, info: AddNewPropertyState, setInitialState: () => void, 
        onChangeModalVisiblity: (check: boolean) => void, displayError: (msg: string) => void) => 
    {
        dispatch(PropertyListActions.postNewProperty(newProperty, info, setInitialState, onChangeModalVisiblity, displayError));
    },
});

function mapStateToProps(state: AppState) : any {
    return {
        email: state.accountProfile.email, 
        roopairsToken: state.accountProfile.roopairsToken,
    };
}

export default connect(
  mapStateToProps, 
  mapDispatchToProps)(AddNewPropertyModalBase);

