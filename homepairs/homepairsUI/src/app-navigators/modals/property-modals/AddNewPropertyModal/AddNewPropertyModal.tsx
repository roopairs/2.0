import { connect } from "react-redux";
import { Property, AppState, AddNewPropertyState } from 'homepairs-types';
import { prepareNavigationHandlerComponent } from 'src/routes';
import { postNewProperty } from 'homepairs-endpoints';
import  AddNewPropertyModalBase, { AddNewPropertyDispatchProps} from './AddNewPropertyModalBase';

const mapDispatchToProps : (dispatch: any) => AddNewPropertyDispatchProps = (dispatch: any) => ({
    onCreateProperty: (newProperty: Property, info: AddNewPropertyState, setInitialState: () => void, 
         displayError: (msg: string) => void) => 
    {
        dispatch(postNewProperty(newProperty, info, setInitialState, displayError));
    },
});

function mapStateToProps(state: AppState) : any {
    return {
        email: state.accountProfile.email, 
        roopairsToken: state.accountProfile.roopairsToken,
    };
}


const ConnectedComponent = connect(
  mapStateToProps, 
  mapDispatchToProps,
  )(AddNewPropertyModalBase);

export default prepareNavigationHandlerComponent(ConnectedComponent);

