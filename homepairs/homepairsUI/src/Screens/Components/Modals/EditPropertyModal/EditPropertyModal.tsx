import { connect } from "react-redux";
import { PropertyListActions } from 'homepairs-redux-actions';
import { Property, AppState } from 'src/state/types';
import EditPropertyModalBase, {EditPropertyDispatchProps} from './EditPropertyModalBase';

const mapDispatchToProps : (dispatch: any) => EditPropertyDispatchProps = (dispatch: any) => ({
    onEditProperty: (oldProperty: Property, editProperty: Property, propIndex: number, email: string, onChangeModalVisiblity: (check: boolean) => void) => {
        dispatch(PropertyListActions.postUpdatedProperty(oldProperty, editProperty, propIndex, email,  onChangeModalVisiblity));
    },
});

function mapStateToProps(state: AppState) : any {
    const propIndex = state.propertyList.selectedPropertyIndex;
    return {email: state.accountProfile.email, index: propIndex, oldProp: state.propertyList.properties[propIndex]};
}

export default connect(
    mapStateToProps, 
    mapDispatchToProps)(EditPropertyModalBase);

