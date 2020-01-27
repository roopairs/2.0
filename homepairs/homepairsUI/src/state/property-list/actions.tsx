import axios from 'axios';
import { 
    AddPropertyAction,
    UpdatePropertyAction, 
    RemovePropertyAction, 
    FetchPropertyAction, 
    Property,
    HomePairsResponseKeys,
} from '../types';
<<<<<<< HEAD
import axios from 'axios';
=======
>>>>>>> 6c0abe500170f7c4f80d6b59e196169385a97584

const responseKeys = HomePairsResponseKeys;
const loginStatus = HomePairsResponseKeys.STATUS_RESULTS;
const propertyKeys = HomePairsResponseKeys.PROPERTY_KEYS;

export enum PROPERTY_LIST_ACTION_TYPES {
    ADD_PROPERTY = 'PROPERTY_LIST/ADD_PROPERTY',
    REMOVE_PROPERTY = 'PROPERTY_LIST/REMOVE_PROPERTY',
    UPDATE_PROPERTY = 'PROPERTY_LIST/UPDATE_PROPERTY',
    FETCH_PROPERTIES = 'PROPERTY_LIST/FETCH_PROPERTIES',
}

export const addProperty = (newProperty: Property): AddPropertyAction => 
{
  return {
    type: PROPERTY_LIST_ACTION_TYPES.ADD_PROPERTY,
<<<<<<< HEAD
    userData: newProperty
  }
};

export const postNewProperty = (newProperty: Property, email: string, setInitialState: () => void, onChangeModalVisibility: (check: boolean) => void) => {
    return async (dispatch: (arg0: any) => void) => {
      return await axios.post('https://homepairs-alpha.herokuapp.com/API/property/create/', {
        streetAddress: newProperty.address, 
        city: newProperty.city, 
        state: newProperty.state, 
        numBed: newProperty.bedrooms, 
        numBath: newProperty.bathrooms, 
        maxTenants: newProperty.tenants,
        pm: email
      })
      .then((response) => {
        console.log(response[responseKeys.DATA])
        if(!(response[responseKeys.DATA][responseKeys.STATUS] === responseKeys.STATUS_RESULTS.FAILURE)){
          dispatch(addProperty(newProperty));
          setInitialState();
          onChangeModalVisibility(false);
        } else {
          console.log("error");
        }
      }).catch((error) => {
        console.log(error);
      });
    }
};
=======
    userData: {
        address, 
        tenants, 
        bedrooms,
        bathrooms,
    },
});
>>>>>>> 6c0abe500170f7c4f80d6b59e196169385a97584

export const updateProperty = (propertyIndex: number, updatedProperty: Property) : UpdatePropertyAction => {
  return {
    type: PROPERTY_LIST_ACTION_TYPES.UPDATE_PROPERTY,
    index: propertyIndex,
<<<<<<< HEAD
    userData: updatedProperty
  }
};

export const postUpdatedProperty = (editProperty: Property, propIndex: number, email: string, setInitialState: () => void, onChangeModalVisibility: (check: boolean) => void) => {
  return async (dispatch: (arg0: any) => void) => {
    return await axios.post('https://homepairs-alpha.herokuapp.com/API/property/create/', {
      streetAddress: editProperty.address, 
      city: editProperty.city, 
      state: editProperty.state, 
      numBed: editProperty.bedrooms, 
      numBath: editProperty.bathrooms, 
      maxTenants: editProperty.tenants,
      pm: email
    })
    .then((response) => {
      console.log(response[responseKeys.DATA])
      if(!(response[responseKeys.DATA][responseKeys.STATUS] === responseKeys.STATUS_RESULTS.FAILURE)){
        dispatch(updateProperty(propIndex, editProperty));
        setInitialState();
        onChangeModalVisibility(false);
      } else {
        console.log("error");
      }
    }).catch((error) => {
      console.log(error);
    });
  }
}


=======
    userData: {
        address, 
        tenants, 
        bedrooms,
        bathrooms,
    },
});
>>>>>>> 6c0abe500170f7c4f80d6b59e196169385a97584

export const removeProperty = (propertyIndex: number): RemovePropertyAction => ({
    type: PROPERTY_LIST_ACTION_TYPES.REMOVE_PROPERTY,
    index: propertyIndex,
});

export const fetchProperties = (linkedProperties: Array<any>): FetchPropertyAction => {
    const fetchedProperties : Property[] = [];
    // TO DO: make linkedProperties not nullable again (once adam gives us properties for pm's again)
    linkedProperties?.forEach(element => {
        fetchedProperties.push({
            address: element[propertyKeys.ADDRESS],
            city: element[propertyKeys.CITY], 
            state: element[propertyKeys.STATE],
            tenants: element[propertyKeys.TENANTS],
            bedrooms : element[propertyKeys.BEDROOMS],
            bathrooms : element[propertyKeys.BATHROOMS]});
    });
    return {
      type: PROPERTY_LIST_ACTION_TYPES.FETCH_PROPERTIES,
<<<<<<< HEAD
      properties: fetchedProperties
=======
      properties: fetchedProperties,
>>>>>>> 6c0abe500170f7c4f80d6b59e196169385a97584
    };
};

export const fetchAllProperties = (
    Username: String, Password: String, modalSetOffCallBack?: () => void, navigateMainCallBack?: () => void) => {
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
          .catch((_error) => {
          })
          .finally(() => {
          });
    };
  };