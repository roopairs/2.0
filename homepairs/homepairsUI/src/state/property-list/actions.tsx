import axios from 'axios';
import { AddNewPropertyStateProps } from '../../Screens/Components/Modals/AddNewPropertyModal/AddNewPropertyModalBase';
import {
    AddPropertyAction,
    UpdatePropertyAction,
    RemovePropertyAction,
    FetchPropertyAction,
    Property,
    HomePairsResponseKeys,
    SetSelectedPropertyAction, 
} from '../types';
import { EditPropertyStateProps } from 'src/Screens/Components/Modals/EditPropertyModal/EditPropertyModalBase';

const responseKeys = HomePairsResponseKeys;
const loginStatus = HomePairsResponseKeys.STATUS_RESULTS;
const propertyKeys = HomePairsResponseKeys.PROPERTY_KEYS;

export enum PROPERTY_LIST_ACTION_TYPES {
    ADD_PROPERTY = 'PROPERTY_LIST/ADD_PROPERTY',
    REMOVE_PROPERTY = 'PROPERTY_LIST/REMOVE_PROPERTY',
    UPDATE_PROPERTY = 'PROPERTY_LIST/UPDATE_PROPERTY',
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
    info: AddNewPropertyStateProps,
    setInitialState: () => void,
    onChangeModalVisibility: (check: boolean) => void,
) => {
    return async (dispatch: (arg0: any) => void) => {
        await axios
            .post(
                'https://homepairs-alpha.herokuapp.com/API/property/create/',
                {
                    streetAddress: newProperty.address,
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
                    //console.log('error');
                }
            })
            .catch(error => {
                //console.log(error);
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
    info: EditPropertyStateProps,
    onChangeModalVisibility: (check: boolean) => void) => {
  return async (dispatch: (arg0: any) => void) => {
    return axios.post('https://homepairs-alpha.herokuapp.com/API/property/update/', {
      oldStreetAddress: info.oldProp.address,
      oldCity: info.oldProp.city,
      streetAddress: editProperty.address, 
      city: editProperty.city, 
      state: editProperty.state, 
      numBed: editProperty.bedrooms, 
      numBath: editProperty.bathrooms, 
      maxTenants: editProperty.tenants,
      pm: info.email,
      token: info.roopairsToken,
    })
    .then((response) => {
      if(!(response[responseKeys.DATA][responseKeys.STATUS] === responseKeys.STATUS_RESULTS.FAILURE)){
        dispatch(updateProperty(info.index, editProperty));
        onChangeModalVisibility(false);
      } else {
        // TODO: Send back error status to modal, this can be done by sending another callback as a parameter
      }
    }).catch((error) => {
    });
  };
};

export const removeProperty = (
    propertyIndex: number,
): RemovePropertyAction => ({
    type: PROPERTY_LIST_ACTION_TYPES.REMOVE_PROPERTY,
    index: propertyIndex,
});

export const fetchProperties = (
    linkedProperties: Array<any>,
): FetchPropertyAction => {
    const fetchedProperties: Property[] = [];
    linkedProperties?.forEach(element => {
        fetchedProperties.push({
            address: element[propertyKeys.ADDRESS],
            city: element[propertyKeys.CITY],
            state: element[propertyKeys.STATE],
            tenants: element[propertyKeys.TENANTS],
            bedrooms: element[propertyKeys.BEDROOMS],
            bathrooms: element[propertyKeys.BATHROOMS],
        });
    });
    return {
        type: PROPERTY_LIST_ACTION_TYPES.FETCH_PROPERTIES,
        properties: fetchedProperties,

    };
};

export const fetchAllProperties = (
    Username: String,
    Password: String,
    modalSetOffCallBack?: () => void,
    navigateMainCallBack?: () => void,
) => {
    return (dispatch: (arg0: any) => void) => {
        // TODO: GET POST URL FROM ENVIRONMENT VARIABLE ON HEROKU SERVER ENV VARIABLE
        return axios.post('http://vertical-proto-homepairs.herokuapp.com/verticalAPI/', {
            username: Username,
            password: Password,
          })
          .then((response) => {
            if(!((response[responseKeys.DATA][responseKeys.STATUS]) === loginStatus.FAILURE)){
              dispatch(fetchProperties(response[responseKeys.DATA][responseKeys.PROPERTIES]));
              navigateMainCallBack();
            }else{
                modalSetOffCallBack();
            }
          })
          .catch((error) => {
            // TODO: Send back error status to modal, this can be done by sending another callback as a parameter
          })
          .finally(() => {
          });
    };
};
