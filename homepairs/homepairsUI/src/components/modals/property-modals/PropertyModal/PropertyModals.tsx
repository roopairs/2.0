import { connect } from "react-redux";
import { Property, AppState, EditPropertyState, PropertyManagerAccount } from 'homepairs-types';
import { prepareNavigationHandlerComponent } from 'src/routes';
import { postUpdatedProperty, postNewProperty } from 'homepairs-endpoints';
import PropertyModal, {PropertyDispatchProps, PropertyState} from './PropertyModal';
import { withTitle } from '../CommonProps';

const mapEditDispatchToProps : (dispatch: any) => PropertyDispatchProps = (dispatch: any) => ({
    onSendPropertyRequest: (editProperty: Property, info: PropertyState, displayError: (msg: string) => void) => 
    {dispatch(postUpdatedProperty(editProperty, info, displayError));},
});
function mapEditStateToProps(state: AppState) : EditPropertyState {
    const propId = state.properties.selectedPropertyId;
    return {
        email: state.accountProfile.email, 
        propId, 
        oldProp: state.properties.properties[propId],
        roopairsToken: (state.accountProfile as PropertyManagerAccount).roopairsToken,
    };
}

const mapAddDispatchToProps : (dispatch: any) => PropertyDispatchProps = (dispatch: any) => ({
    onSendPropertyRequest: (newProperty: Property, info: PropertyState, displayError?: (msg: string) => void) => 
    { dispatch(postNewProperty(newProperty, info, displayError)); },
});

function mapAddStateToProps(state: AppState) : any {
    return {
        email: state.accountProfile.email, 
        roopairsToken: (state.accountProfile as PropertyManagerAccount).roopairsToken,
        propId: null, 
        oldProp: null,
    };
}

const EditPropertyModal = withTitle(
    prepareNavigationHandlerComponent(connect(mapEditStateToProps, mapEditDispatchToProps)(PropertyModal)),
    "Edit Property");

const AddNewPropertyModal = withTitle(
    prepareNavigationHandlerComponent(connect(mapAddStateToProps, mapAddDispatchToProps)(PropertyModal)),
    "Add Property");

export {EditPropertyModal, AddNewPropertyModal};