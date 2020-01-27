import { 
    AddPropertyAction,
    UpdatePropertyAction, 
    RemovePropertyAction, 
    FetchPropertyAction,
    FetchPropertyListAction, 
    Property,
    HomePairsResponseKeys,
} from '../types';
import axios from 'axios'

let responseKeys = HomePairsResponseKeys;
let loginStatus = HomePairsResponseKeys.STATUS_RESULTS;
let propertyKeys = HomePairsResponseKeys.PROPERTY_KEYS;

export enum PROPERTY_LIST_ACTION_TYPES {
    ADD_PROPERTY = 'PROPERTY_LIST/ADD_PROPERTY',
    REMOVE_PROPERTY = 'PROPETY_LIST/REMOVE_PROPERTY',
    UPDATE_PROPERTY = 'PROPERTY_LIST/UPDATE_PROPERTY',
    FETCH_PROPERTY = 'PROPERTY_LIST/FETCH_PROPERTY',
    FETCH_PROPERTY_LIST = 'PROPERTY_LIST/FETCH_PROPERTY_LIST',
}

export const addProperty = (address: string, tenants: number,
    bedrooms: number, bathrooms: number): AddPropertyAction => ({
    type: PROPERTY_LIST_ACTION_TYPES.ADD_PROPERTY,
    userData: {
        streetAddress: address, 
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
        streetAddress: address, 
        tenants, 
        bedrooms,
        bathrooms,
    }
});

export const removeProperty = (propertyIndex: number): RemovePropertyAction => ({
    type: PROPERTY_LIST_ACTION_TYPES.REMOVE_PROPERTY,
    index: propertyIndex,
});

export const fetchProperty = (linkedProperty: Property): FetchPropertyAction => {
    let fetchedProperty : Property;
        fetchedProperty = {
            streetAddress: linkedProperty[propertyKeys.ADDRESS],
            tenants: linkedProperty[propertyKeys.TENANTS],
            bedrooms : linkedProperty[propertyKeys.BEDROOMS],
            bathrooms : linkedProperty[propertyKeys.BATHROOMS]
        };
    return {
      type: PROPERTY_LIST_ACTION_TYPES.FETCH_PROPERTY,
      property: fetchedProperty
    }
};

export const fetchPropertyList = (linkedProperties: Array<any>): FetchPropertyListAction => {
    let fetchedProperties : Property[] = new Array()
    //TO DO: make linkedProperties not nullable again (once adam gives us properties for pm's again)
    linkedProperties?.forEach(element => {
        fetchedProperties.push({
            streetAddress: element[propertyKeys.ADDRESS],
            tenants: element[propertyKeys.TENANTS],
            bedrooms : element[propertyKeys.BEDROOMS],
            bathrooms : element[propertyKeys.BATHROOMS]})
    });
    return {
      type: PROPERTY_LIST_ACTION_TYPES.FETCH_PROPERTY_LIST,
      properties: fetchedProperties
    }
};

/*export const fetchAllProperties = (
    Username: String, Password: String, modalSetOffCallBack?: () => void, navigateMainCallBack?: () => void) => {
    return (dispatch: (arg0: any) => void) => {
        //TODO: GET POST URL FROM ENVIRONMENT VARIABLE ON HEROKU SERVER ENV VARIABLE
        return axios.post('http://vertical-proto-homepairs.herokuapp.com/verticalAPI/', {
            username: Username,
            password: Password,
          })
          .then((response) => {
            if(!((response[responseKeys.DATA][responseKeys.STATUS]) === loginStatus.FAILURE)){
              dispatch(fetchPropertyList(response[responseKeys.DATA][responseKeys.PROPERTIES]))
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
  };*/