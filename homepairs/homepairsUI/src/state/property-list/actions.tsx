import axios from 'axios';
import { NewPropertyState } from 'src/Screens/Components/Modals/AddNewPropertyModal/AddNewPropertyModalBase';
import { EditPropertyState } from 'src/Screens/Components/Modals/EditPropertyModal/EditPropertyModalBase';
import { SetSelectedPropertyAction } from '../types';
import {
    AddPropertyAction,
    UpdatePropertyAction, 
    RemovePropertyAction, 
    FetchPropertyAction, 
    FetchPropertiesAction,
    Property,
    HomePairsResponseKeys,
} from '../types';
const responseKeys = HomePairsResponseKeys;
const loginStatus = HomePairsResponseKeys.STATUS_RESULTS;
const propertyKeys = HomePairsResponseKeys.PROPERTY_KEYS;

export enum PROPERTY_LIST_ACTION_TYPES {
    ADD_PROPERTY = 'PROPERTY_LIST/ADD_PROPERTY',
    REMOVE_PROPERTY = 'PROPERTY_LIST/REMOVE_PROPERTY',
    UPDATE_PROPERTY = 'PROPERTY_LIST/UPDATE_PROPERTY',
    FETCH_PROPERTY = 'PROPERTY_LIST/FETCH_PROPERTY',
    FETCH_PROPERTIES = 'PROPERTY_LIST/FETCH_PROPERTIES',
    SET_SELECTED_PROPERTY = 'PROPERTY_LIST/SET_SELECTED_PROPERTY',
}

export const setSelectedProperty = (index: number) : SetSelectedPropertyAction => {
  return {
    type: PROPERTY_LIST_ACTION_TYPES.SET_SELECTED_PROPERTY,
    index,
  };
};

export const addProperty = (newProperty: Property): AddPropertyAction => {
    return {
        type: PROPERTY_LIST_ACTION_TYPES.ADD_PROPERTY,
        userData: newProperty,
    };
};

export const postNewProperty = (
    newProperty: Property,
    info: NewPropertyState,
    setInitialState: () => void,
    onChangeModalVisibility: (check: boolean) => void,
) => {
    return async (dispatch: (arg0: any) => void) => {
        await axios
            .post(
                'https://homepairs-alpha.herokuapp.com/API/property/create/',
                {
                    streetAddress: newProperty.streetAddress,
                    city: newProperty.city,
                    state: newProperty.state,
                    numBed: newProperty.bedrooms,
                    numBath: newProperty.bathrooms,
                    maxTenants: newProperty.tenants,
                    pm: info.email,
                    token: info.roopairsToken,
                },
            )
            .then(response => {
                console.log(response[responseKeys.DATA]);
                if (
                    !(
                        response[responseKeys.DATA][responseKeys.STATUS] ===
                        responseKeys.STATUS_RESULTS.FAILURE
                    )
                ) {
                    dispatch(addProperty(newProperty));
                    setInitialState();
                    onChangeModalVisibility(false);
                } else {
                    console.log('error');
                }
            })
            .catch(error => {
                console.log(error);
            });
    };
};

export const updateProperty = (propertyIndex: number, updatedProperty: Property) : UpdatePropertyAction => {
    return {
      type: PROPERTY_LIST_ACTION_TYPES.UPDATE_PROPERTY,
      index: propertyIndex,
      userData: updatedProperty,
    };
  };
  
export const postUpdatedProperty = (
    editProperty: Property, 
    info: EditPropertyState,
    onChangeModalVisibility: (check: boolean) => void) => {
  return async (dispatch: (arg0: any) => void) => {
    return axios.post('https://homepairs-alpha.herokuapp.com/API/property/update/', {
      oldStreetAddress: info.oldProp.streetAddress,
      oldCity: info.oldProp.city,
      streetAddress: editProperty.streetAddress, 
      city: editProperty.city, 
      state: editProperty.state, 
      numBed: editProperty.bedrooms, 
      numBath: editProperty.bathrooms, 
      maxTenants: editProperty.tenants,
      pm: info.email,
      token: info.roopairsToken,
    })
    .then((response) => {
      console.log(response[responseKeys.DATA]);
      if(!(response[responseKeys.DATA][responseKeys.STATUS] === responseKeys.STATUS_RESULTS.FAILURE)){
        dispatch(updateProperty(info.index, editProperty));
        onChangeModalVisibility(false);
      } else {
        console.log("error");
      }
    }).catch((error) => {
      console.log(error);
    });
  };
};

export const removeProperty = (
    propertyIndex: number,
): RemovePropertyAction => ({
    type: PROPERTY_LIST_ACTION_TYPES.REMOVE_PROPERTY,
    index: propertyIndex,
});

export const fetchProperty = (linkedProperty: Property): FetchPropertyAction => {
    let fetchedProperty : Property;
    const fetchedProperties: Property[] = [];
        fetchedProperty = {
            streetAddress: linkedProperty[propertyKeys.ADDRESS],
            city: linkedProperty[propertyKeys.CITY],
            state: linkedProperty[propertyKeys.STATE],
            tenants: linkedProperty[propertyKeys.TENANTS],
            bedrooms : linkedProperty[propertyKeys.BEDROOMS],
            bathrooms : linkedProperty[propertyKeys.BATHROOMS]
        };
        fetchedProperties.push(fetchedProperty);
    return {
      type: PROPERTY_LIST_ACTION_TYPES.FETCH_PROPERTY,
      property: fetchedProperties
    }
};

export const fetchProperties = (
    linkedProperties: Array<any>,
): FetchPropertiesAction => {
    const fetchedProperties: Property[] = [];
    linkedProperties?.forEach(linkedProperty => {
        fetchedProperties.push({
            streetAddress: linkedProperty[propertyKeys.ADDRESS],
            city: linkedProperty[propertyKeys.CITY],
            state: linkedProperty[propertyKeys.STATE],
            tenants: linkedProperty[propertyKeys.TENANTS],
            bedrooms: linkedProperty[propertyKeys.BEDROOMS],
            bathrooms: linkedProperty[propertyKeys.BATHROOMS],
        });
    });
    return {
      type: PROPERTY_LIST_ACTION_TYPES.FETCH_PROPERTIES,
      properties: fetchedProperties
    }
};

