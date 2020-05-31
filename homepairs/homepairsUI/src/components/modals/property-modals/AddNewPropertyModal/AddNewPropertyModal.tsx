import { connect } from "react-redux";
import { Property, AppState, AddNewPropertyState, PropertyManagerAccount } from 'homepairs-types';
import { prepareNavigationHandlerComponent} from 'src/routes';
import { postNewProperty } from 'homepairs-endpoints';
import  AddNewPropertyModalBase, { AddNewPropertyDispatchProps} from './AddNewPropertyModalBase';
import  NewAddNewPropertyModalBase from './NewAddNewPropertyModalBase';

const mapDispatchToProps : (dispatch: any) => AddNewPropertyDispatchProps = (dispatch: any) => ({
    onCreateProperty: (newProperty: Property, info: AddNewPropertyState, displayError?: (msg: string) => void) => 
    { dispatch(postNewProperty(newProperty, info, displayError)); },
});

function mapStateToProps(state: AppState) : any {
    return {
        email: state.accountProfile.email, 
        roopairsToken: (state.accountProfile as PropertyManagerAccount).roopairsToken,
    };
}

const ConnectedComponent = connect(mapStateToProps, mapDispatchToProps)(NewAddNewPropertyModalBase);
export default prepareNavigationHandlerComponent(ConnectedComponent);

