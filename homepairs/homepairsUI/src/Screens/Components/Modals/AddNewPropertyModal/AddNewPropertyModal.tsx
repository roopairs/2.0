import React from 'react';
import { connect } from "react-redux";
import { PropertyListActions } from 'homepair-redux-actions';
import AddNewPropertyModalBase, {AddNewPropertyDispatchProps} from './AddNewPropertyModalBase';
import { Property, AppState } from 'src/state/types';


const mapDispatchToProps : (dispatch: any) => AddNewPropertyDispatchProps = (dispatch: any) => ({
    onCreateProperty: (newProperty: Property, email: string, setInitialState: () => void, onChangeModalVisiblity: (check: boolean) => void) => {
        dispatch(PropertyListActions.postNewProperty(newProperty, email, setInitialState, onChangeModalVisiblity))
    }
});

function mapStateToProps(state: AppState) : any {
    return {email: state.accountProfile.email};
}

export default connect(
    mapStateToProps, 
    mapDispatchToProps)(AddNewPropertyModalBase);

