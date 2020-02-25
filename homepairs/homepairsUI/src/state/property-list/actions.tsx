import axios from 'axios';
import { NavigationStackProp } from 'react-navigation-stack';
import { AsyncStorage } from 'react-native';
import NavigationRouteHandler from 'src/utility/NavigationRouterHandler';
import {
    AddPropertyAction,
    UpdatePropertyAction,
    RemovePropertyAction,
    FetchPropertyAction,
    FetchPropertiesAction,
    AddApplianceAction, 
    UpdateApplianceAction,
    Property,
    Appliance,
    HomePairsResponseKeys,
    SetSelectedPropertyAction,
    EditPropertyState,
    AddNewPropertyState,
    AddApplianceState,
    FetchPropertyAndPropertyManagerAction,
    AccountTypes,
    Contact,
    TenantInfo,
} from '../types';

const responseKeys = HomePairsResponseKeys;
const propertyKeys = HomePairsResponseKeys.PROPERTY_KEYS;
const accountKeys = HomePairsResponseKeys.ACCOUNT_KEYS;

/**
 * ----------------------------------------------------
 * Property List Action Types
 * ----------------------------------------------------
 * A enumeration of values used to help the reducer distinguish between
 * the different changes it should make to the store. Every potential
 * mutation to the Property List Store should contain a unique value
 * in.
 */
export enum PROPERTY_LIST_ACTION_TYPES {
  ADD_PROPERTY = 'PROPERTY_LIST/ADD_PROPERTY',
  REMOVE_PROPERTY = 'PROPERTY_LIST/REMOVE_PROPERTY',
  UPDATE_PROPERTY = 'PROPERTY_LIST/UPDATE_PROPERTY',
  FETCH_PROPERTY = 'PROPERTY_LIST/FETCH_PROPERTY',
  FETCH_PROPERTY_AND_PROPERTY_MANAGER = 'PROPERTY_LIST/FETCH_PROPERTY_AND_PROPERTY_MANAGER',
  FETCH_PROPERTIES = 'PROPERTY_LIST/FETCH_PROPERTIES',
  SET_SELECTED_PROPERTY = 'PROPERTY_LIST/SET_SELECTED_PROPERTY',
  UPDATE_TENANT = 'PROPERTY_LIST/UPDATE_TENANT' 
}

/**
 * ----------------------------------------------------
 * Store Property Data
 * ----------------------------------------------------
 * Stores the list of properties into the local storage as a string object.  
 * @param {Property[]} propertyList -should only have a length of 1 if it is for a tenant 
 */
const storePropertyData = async (propertyList: Property[]) => {
  try {
    await AsyncStorage.setItem('propertyList', JSON.stringify(propertyList));
  } catch (error) {
    // Error saving data
  }
};

/**
 * ----------------------------------------------------
 * setSelectedProperty
 * ----------------------------------------------------
 * Action whom indicates to the reducer what property is currently selected
 * to be viewed by the user. This is set to null//undefined if none is currently
 * being view
 * @param {number} index -position of the property in the array of the state
 */
export const setSelectedProperty = (index: number): SetSelectedPropertyAction => {
  // Set the store the selectedProperty in the local state for useage after the app falls asleep
  AsyncStorage.setItem('selectedProperty', index.toString());
  return {
    type: PROPERTY_LIST_ACTION_TYPES.SET_SELECTED_PROPERTY,
    index,
  };
};

/**
 * ----------------------------------------------------
 * addProperty
 * ----------------------------------------------------
 * Action used to add a property to the store. This should be called after postNewProperty
 * @param {Property} newProperty -property that has been added to the database
 * waiting to be added to the store
 */
export const addProperty = (newProperty: Property): AddPropertyAction => {
  return {
    type: PROPERTY_LIST_ACTION_TYPES.ADD_PROPERTY,
    userData: newProperty,
  };
};

/**
 * ----------------------------------------------------
 * postNewProperty
 * ----------------------------------------------------
 * Sends an request to the homepairs backend attempting to mutate the data of an exisiting property. It takes in
 * the previous property (TODO: Update this to be propId when backend resolves properties from propId) and sends this 
 * data to backend in order for it to resolve which property is to be updated. The intitial state of the component is invoked 
 * and the modal navigates to back to the previous page upon a success. 
 * 
 * @param {Property} newProperty -property to add to the homepairs database
 * @param {AddNewPropertyState} info -information used to indicate the property manager of the property
 * @param {setIntialState} setInitialState -sets state of calling component to its original state. Should be used for forms
 * @param {onChangeModalVisibility} onChangeModalVisibility -changes the visibility of the modal of the calling component
 */
export const postNewProperty = (
    newProperty: Property,
    info: AddNewPropertyState,
    setInitialState: () => void,
    displayError: (msg: string) => void,
    navigation: NavigationRouteHandler,
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
                if (
                    response[responseKeys.DATA][responseKeys.STATUS] ===
                    responseKeys.STATUS_RESULTS.SUCCESS
                ) {
                    // add in propertyID
                    dispatch(addProperty(newProperty));
                    setInitialState();
                    navigation.goBack();
                } else {
                    displayError(
                        response[responseKeys.DATA][responseKeys.ERROR],
                    );
                }
            })
            .catch();
    };
};

/**
 * ----------------------------------------------------
 * updateProperty
 * ----------------------------------------------------
 * Action intended to mutate a specified property after it has been updated
 * in the homepairs servers. Should be called after postUpdatedProperty.
 * @param {number} propertyIndex -location of the updated property in the redux-store
 * @param {Property} updatedProperty -the new contents of the selected property
 */
export const updateProperty = (propertyIndex: number, updatedProperty: Property): UpdatePropertyAction => {
  return {
    type: PROPERTY_LIST_ACTION_TYPES.UPDATE_PROPERTY,
    index: propertyIndex,
    userData: updatedProperty,
  };
};

/**
 * ----------------------------------------------------
 * postUpdatedProperty
 * ----------------------------------------------------
 * Sends a request to the homepairs API to update a selected property. On success,
 * it updates the redux-store and invokes a callback intended to close the modal
 * of the calling component. Upon failure, an error message should be sent.
 * @param {Property} editProperty -contents of the property to be updated
 * @param {EditPropertyState} info -information passed to the api to help determine which property in the
 * servers to update
 * @param {onChangeModalVisibility} onChangeModalVisibility -changes the visibility of the modal
 * of the calling component
 */
export const postUpdatedProperty = (
    editProperty: Property,
    info: EditPropertyState,
    displayError: (msg: string) => void,
    navigation: NavigationRouteHandler,
) => {
    return async (dispatch: (arg0: any) => void) => {
        return axios
            .post(
                'https://homepairs-alpha.herokuapp.com/API/property/update/',
                {
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
                },
            )
            .then(response => {
                if (
                    response[responseKeys.DATA][responseKeys.STATUS] ===
                    responseKeys.STATUS_RESULTS.SUCCESS
                ) {
                    dispatch(updateProperty(info.index, editProperty));
                    navigation.goBack();
                } else {
                    displayError(
                        response[responseKeys.DATA][responseKeys.ERROR],
                    );
                }
            })
            .catch(() => {});
    };
};

/**
 * ----------------------------------------------------
 * removeProperty
 * ----------------------------------------------------
 * Action intended to remove a Property from the list of managed properties
 * for a pm. TODO: create a function that removes a property from the database
 * @param {number} propertyIndex -location of the property to remove from the store
 */
export const removeProperty = (
  propertyIndex: number,
): RemovePropertyAction => ({
  type: PROPERTY_LIST_ACTION_TYPES.REMOVE_PROPERTY,
  index: propertyIndex,
});

/**
 * ----------------------------------------------------
 * fetchProperty
 * ----------------------------------------------------
 * Function used to extract a single property from fetching an account profile.
 * This should be called after generating a new account or authentication for specifically
 * Tenants
 * @param {Property} linkedProperty -Property recieved from the homepairs servers
 */
export const fetchProperty = (linkedProperty: Property): FetchPropertyAction => {
  console.log(linkedProperty)

  const fetchedProperties: Property[] = [];
  const fetchedProperty = {
    propId: linkedProperty[propertyKeys.PROPERTYID],
    streetAddress: linkedProperty[propertyKeys.ADDRESS],
    city: linkedProperty[propertyKeys.CITY],
    state: linkedProperty[propertyKeys.STATE],
    tenants: linkedProperty[propertyKeys.TENANTS],
    bedrooms: linkedProperty[propertyKeys.BEDROOMS],
    bathrooms: linkedProperty[propertyKeys.BATHROOMS],
  };
  fetchedProperties.push(fetchedProperty);
  storePropertyData(fetchedProperties);
  return {
    type: PROPERTY_LIST_ACTION_TYPES.FETCH_PROPERTY,
    property: fetchedProperties,
  };
};

/**
 * ----------------------------------------------------
 * fetchPropertyManager
 * ----------------------------------------------------
 * Function used to extract a single property and its owner from fetching an account profile. 
 * This should be called after generating a new account or authentication for specifically
 * Tenants 
 * @param {Contact} linkedPropertyManager -Property Manager recieved from the homepairs servers  
 */
export const fetchPropertyAndPropertyManager = (linkedProperty: Property, linkedPropertyManager: Contact): FetchPropertyAndPropertyManagerAction => {
  const fetchedPropertyManager: Contact = {
    email: linkedPropertyManager[accountKeys.EMAIL],
    firstName: linkedPropertyManager[accountKeys.FIRSTNAME],
    lastName: linkedPropertyManager[accountKeys.LASTNAME],
    accountType: AccountTypes.PropertyManager,
  };
  const fetchedProperties: Property[] = [];
  const fetchedProperty = {
    propId: linkedProperty[propertyKeys.PROPERTYID],
    streetAddress: linkedProperty[propertyKeys.ADDRESS],
    city: linkedProperty[propertyKeys.CITY],
    state: linkedProperty[propertyKeys.STATE],
    tenants: linkedProperty[propertyKeys.TENANTS],
    bedrooms: linkedProperty[propertyKeys.BEDROOMS],
    bathrooms: linkedProperty[propertyKeys.BATHROOMS],
  };
  fetchedProperties.push(fetchedProperty);
  storePropertyData(fetchedProperties);
  return {
    type: PROPERTY_LIST_ACTION_TYPES.FETCH_PROPERTY_AND_PROPERTY_MANAGER,
    property: fetchedProperties,
    propertyManager: fetchedPropertyManager,
  };
};

/**
 * ----------------------------------------------------
 * fetchProperties
 * ----------------------------------------------------
 * Function used to extract an array of properties from the fetching of an account profile.
 * This should be called after generating a new account or authentication for specifically
 * PROPERTY MANAGERS
 * @param linkedProperties -Array of objects that contain the data for properties
 */
export const fetchProperties = (linkedProperties: Array<any>): FetchPropertiesAction => {
  console.log(linkedProperties)

  const fetchedProperties: Property[] = [];
  linkedProperties?.forEach(linkedProperty => {
    fetchedProperties.push({
      propId: linkedProperty[propertyKeys.PROPERTYID],
      streetAddress: linkedProperty[propertyKeys.ADDRESS],
      city: linkedProperty[propertyKeys.CITY],
      state: linkedProperty[propertyKeys.STATE],
      tenants: linkedProperty[propertyKeys.TENANTS],
      bedrooms: linkedProperty[propertyKeys.BEDROOMS],
      bathrooms: linkedProperty[propertyKeys.BATHROOMS],
    });
  });
  console.log(fetchedProperties)
  storePropertyData(fetchedProperties);
  return {
    type: PROPERTY_LIST_ACTION_TYPES.FETCH_PROPERTIES,
    properties: fetchedProperties,
  };
};


/**
 * ----------------------------------------------------
 * updateTenantInfo
 * ----------------------------------------------------
 * A function that sends to the backend, a put request in order to edit the information of a tenant account 
 * at a specified property. Since the Frontend does not maintain the state of the property tenants, it must 
 * either request the information again from the endpoint, or it must update the information on its own.
 * @param {number} propertyId -The ID of the property that holds the tenant 
 * @param {TenantInfo} info -The editable information that the user wants to change 
 * @param {NavigationStackProp} navigation -An object used for navigating back to the previous page.
 */
export const updateTenantInfo = (propertyId: number, info: TenantInfo, navigation: NavigationStackProp) => {
  alert('I need to be updated by the backend!');
  navigation.goBack();
  return{
    type: PROPERTY_LIST_ACTION_TYPES.UPDATE_TENANT,
  };
};

/**
 * Callback is intended to set the input forms of the component used to send
 * the request back to the base values. This could be empty or predetermined.
 * @callback setInitialState */
/**
 * Callback is intended to change the state of a modal of the calling component
 * after the request has been sent. This should be optional.
 * @callback onChangeModalVisibility
 * @param {boolean} check -determines if the components modal should be visible */

// make docs


export const postNewAppliance = (
    newAppliance: Appliance,
    info: AddApplianceState,
    setInitialState: () => void,
    displayError: (msg: string) => void,
    navigation: NavigationRouteHandler,
) => {
    return async () => {
        await axios
            .post(
                'https://homepairs-alpha.herokuapp.com/API/appliance/create/',
                {
                    streetAddress: info.property.streetAddress, 
                    city: info.property.city,
                    name: newAppliance.appName, 
                    manufacturer: newAppliance.manufacturer, 
                    category: newAppliance.category,
                    modelNum: newAppliance.modelNum, 
                    serialNum: newAppliance.serialNum, 
                    location: newAppliance.location, 
                },
            )
            .then(response => {
                if (
                    response[responseKeys.DATA][responseKeys.STATUS] ===
                    responseKeys.STATUS_RESULTS.SUCCESS
                ) {
                    // handle in detailed property screen
                    setInitialState();
                    navigation.goBack();
                } else {
                    displayError(
                        response[responseKeys.DATA][responseKeys.ERROR],
                    );
                }
            })
            .catch();
    };
};

// fix docs
/**
 * ----------------------------------------------------
 * updateProperty
 * ----------------------------------------------------
 * Action intended to mutate a specified property after it has been updated
 * in the homepairs servers. Should be called after postUpdatedProperty.
 * @param {Property} updatedProperty -the new contents of the selected property
 */
/*
export const updateAppliance = (
    propertyIndex: number, 
    updatedAppliance: Appliance,
): UpdateApplianceAction => {
    return {
        type: PROPERTY_LIST_ACTION_TYPES.UPDATE_APPLIANCE,
        userData: updatedAppliance,
        index: propertyIndex,
    };
};
*/
/**
 * ----------------------------------------------------
 * postUpdatedProperty
 * ----------------------------------------------------
 * Sends a request to the homepairs API to update a selected property. On success,
 * it updates the redux-store and invokes a callback intended to close the modal
 * of the calling component. Upon failure, an error message should be sent.
 * @param {Property} editProperty -contents of the property to be updated
 * @param {EditPropertyState} info -information passed to the api to help determine which property in the
 * servers to update
 * @param {onChangeModalVisibility} onChangeModalVisibility -changes the visibility of the modal
 * of the calling component
 */
export const postUpdatedAppliance = (
    editAppliance: Appliance,
    displayError: (msg: string) => void,
    navigation: NavigationRouteHandler,
) => {
    return async () => {
        return axios
            .post(
                'https://homepairs-alpha.herokuapp.com/API/appliance/update/',
                {
                    appId: editAppliance.applianceId,
                    newName: editAppliance.appName, 
                    newManufacturer: editAppliance.manufacturer, 
                    newCategory: editAppliance.category,
                    newModelNum: editAppliance.modelNum, 
                    newSerialNum: editAppliance.serialNum, 
                    newLocation: editAppliance.location,
                },
            )
            .then(response => {
                if (
                    response[responseKeys.DATA][responseKeys.STATUS] ===
                    responseKeys.STATUS_RESULTS.SUCCESS
                ) {
                    // dispatch(updateAppliance(info.index, editAppliance));
                    navigation.goBack();
                } else {
                    displayError(
                        response[responseKeys.DATA][responseKeys.ERROR],
                    );
                }
            })
            .catch(() => {});
    };
};
