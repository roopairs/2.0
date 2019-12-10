import { AddPropertyAction, UpdatePropertyAction, RemovePropertyAction, FetchPropertyAction, Property } from '../types';
import axios from 'axios'

export enum PROPERTY_LIST_ACTION_TYPES {
    ADD_PROPERTY = 'PROPERTY_LIST/ADD_PROPERTY',
    REMOVE_PROPERTY = 'PROPETY_LIST/REMOVE_PROPERTY',
    UPDATE_PROPERTY = 'PROPERTY_LIST/UPDATE_PROPERTY',
    FETCH_PROPERTIES = 'PROPERTY_LIST/FETCH_PROPERTIES',
}

export const addProperty = (address: string, tenants: number,
    bedrooms: number, bathrooms: number): AddPropertyAction => ({
    type: PROPERTY_LIST_ACTION_TYPES.ADD_PROPERTY,
    userData: {
        address, 
        tenants, 
        bedrooms,
        bathrooms,
    }
});

export const updateProperty = (propertyIndex: number, address: string = null, tenants: number = null,
    bedrooms: number = null, bathrooms: number = null) : UpdatePropertyAction => ({
    type: PROPERTY_LIST_ACTION_TYPES.UPDATE_PROPERTY,
    index: propertyIndex,
    userData: {
        address, 
        tenants, 
        bedrooms,
        bathrooms,
    }
});

export const removeProperty = (propertyIndex: number): RemovePropertyAction => ({
    type: PROPERTY_LIST_ACTION_TYPES.REMOVE_PROPERTY,
    index: propertyIndex,
});

export const fetchProperties = (linkedProperties: Array<any>): FetchPropertyAction => {
    let fetchedProperties : Property[] = new Array()
    linkedProperties.forEach(element => {
        fetchedProperties.push({
            address: element['address'],
            tenants: element['maxTenants'],
            bedrooms : element['numBed'],
            bathrooms : element['numBath']})
    });
    return {
      type: PROPERTY_LIST_ACTION_TYPES.FETCH_PROPERTIES,
      properties: fetchedProperties
    }
};

export const fetchAllProperties = (
    Username: String, Password: String, modalSetOffCallBack?: () => void, navigateMainCallBack?: () => void) => {
    return (dispatch: (arg0: any) => void) => {
        return axios.post('http://vertical-proto-homepairs.herokuapp.com/verticalAPI/', {
            username: Username,
            password: Password,
          })
          .then((response) => {
            if(!((response["data"]['status']) === 'failure')){
              dispatch(fetchProperties(response["data"]['properties']))
              navigateMainCallBack()
            }else{
                modalSetOffCallBack()
            }
          })
          .catch(function (error) {
            console.log(error);
          })
          .finally(() => {
          });
    };
  };