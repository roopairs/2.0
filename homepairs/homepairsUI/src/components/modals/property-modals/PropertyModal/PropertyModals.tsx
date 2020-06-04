import { connect } from "react-redux";
import { Property, AppState, EditPropertyState, PropertyManagerAccount } from 'homepairs-types';
import { prepareNavigationHandlerComponent } from 'src/routes';
import { putUpdatedProperty, postNewProperty } from 'homepairs-endpoints';
import { updateProperty, addProperty } from 'homepairs-redux-actions';
import PropertyModal, {PropertyDispatchProps, PropertyState} from './PropertyModal';
import { withTitle } from '../CommonProps';

const mapEditDispatchToProps : (dispatch: any) => PropertyDispatchProps = (dispatch: any) => ({
    onSendPropertyRequest: async (editProperty: Property, info: PropertyState) => 
    {
        await putUpdatedProperty(editProperty, info).then(()=> {
            dispatch(updateProperty(editProperty));
        }).catch(error => {console.log(error); throw error;});
    },
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
    onSendPropertyRequest: async (newProperty: Property, info: PropertyState, displayError?: (msg: string) => void) => 
    { 
        await postNewProperty(newProperty, info).then(response => {
            console.log(response);
            const {data} = response;
            console.log(response);
            const {propId} = data;
            const updatedNew : Property = {
                propId,
                address: newProperty.address,
                bedrooms: newProperty.bedrooms, 
                bathrooms: newProperty.bathrooms, 
                tenants: newProperty.tenants,
              };
            dispatch(addProperty(updatedNew));
        }).catch(error => {console.log(error); throw error;});
    },
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