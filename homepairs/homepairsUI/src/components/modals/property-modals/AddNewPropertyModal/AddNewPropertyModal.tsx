import { connect } from "react-redux";
import { Property, AppState, AddNewPropertyState, PropertyManagerAccount } from 'homepairs-types';
import { prepareNavigationHandlerComponent, NavigationRouteHandler } from 'src/routes';
import { postNewProperty } from 'homepairs-endpoints';
import  AddNewPropertyModalBase, { AddNewPropertyDispatchProps} from './AddNewPropertyModalBase';

const mapDispatchToProps : (dispatch: any) => AddNewPropertyDispatchProps = (dispatch: any) => ({
    onCreateProperty: (newProperty: Property, info: AddNewPropertyState, setInitialState: () => void, 
         displayError: (msg: string) => void, navigation: NavigationRouteHandler) => 
    {
        dispatch(postNewProperty(newProperty, info, setInitialState, displayError, navigation));
    },
});

function mapStateToProps(state: AppState) : any {
    console.log((state.accountProfile as PropertyManagerAccount).roopairsToken);
    return {
        email: state.accountProfile.email, 
        roopairsToken: (state.accountProfile as PropertyManagerAccount).roopairsToken,
    };
}


const ConnectedComponent = connect(
  mapStateToProps, 
  mapDispatchToProps,
  )(AddNewPropertyModalBase);

export default prepareNavigationHandlerComponent(ConnectedComponent);

