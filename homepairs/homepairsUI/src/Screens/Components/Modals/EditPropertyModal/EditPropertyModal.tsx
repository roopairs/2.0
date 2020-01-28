import React from 'react';
import { connect } from "react-redux";
import { PropertyListActions } from 'homepair-redux-actions';
import { Property, AppState } from 'src/state/types';
import EditPropertyModalBase, {EditPropertyDispatchProps} from './EditPropertyModalBase';



const mapDispatchToProps : (dispatch: any) => EditPropertyDispatchProps = (dispatch: any) => ({
    onEditProperty: (editProperty: Property, propIndex: number, email: string, setInitialState: () => void, onChangeModalVisiblity: (check: boolean) => void) => {
        dispatch(PropertyListActions.postUpdatedProperty(editProperty, propIndex, email, setInitialState, onChangeModalVisiblity));
    },
});

function mapStateToProps(state: AppState) : any {
    return {email: state.accountProfile.email};
}

export default connect(
    mapStateToProps, 
    mapDispatchToProps)(EditPropertyModalBase);

