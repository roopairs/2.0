import { connect } from "react-redux";
import { PropertyListActions } from 'homepairs-redux-actions';
import { Property, AppState } from 'src/state/types';
import  AddNewPropertyModalBase, { AddNewPropertyDispatchProps, AddNewPropertyStateProps} from './AddNewPropertyModalBase';

const mapDispatchToProps : (dispatch: any) => AddNewPropertyDispatchProps = (dispatch: any) => ({
    onCreateProperty: (newProperty: Property, info: AddNewPropertyStateProps, setInitialState: () => void, onChangeModalVisiblity: (check: boolean) => void) => {
        dispatch(PropertyListActions.postNewProperty(newProperty, info, setInitialState, onChangeModalVisiblity));
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

