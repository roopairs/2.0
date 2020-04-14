import { AsyncStorage } from 'react-native';
import {
    AddPropertyAction,
    UpdatePropertyAction,
    RemovePropertyAction,
    FetchPropertiesAction,
    Property,
    HomePairsResponseKeys,
    SetSelectedPropertyAction,
    FetchPropertyAndPropertyManagerAction,
    AccountTypes,
    Contact,
} from '../types';

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
 * fetchPropertyManager
 * ----------------------------------------------------
 * Function used to extract a single property and its owner from fetching an account profile. 
 * This should be called after generating a new account or authentication for specifically
 * Tenants 
 * @param {Contact} linkedPropertyManager -Property Manager recieved from the homepairs servers  
 */
export const fetchPropertyAndPropertyManager = (linkedProperties: Property[], linkedPropertyManager: Contact): FetchPropertyAndPropertyManagerAction => {
  const linkedProperty = linkedProperties[0];
  const fetchedPropertyManager: Contact = {
    email: linkedPropertyManager[accountKeys.EMAIL],
    firstName: linkedPropertyManager[accountKeys.FIRSTNAME],
    lastName: linkedPropertyManager[accountKeys.LASTNAME],
    accountType: AccountTypes.PropertyManager,
  };

  const fetchedProperties: Property[] = [];
  const fetchedProperty = {
    propId: linkedProperty[propertyKeys.PROPERTYID],
    address: linkedProperty[propertyKeys.ADDRESS],
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
  const fetchedProperties: Property[] = [];
  linkedProperties?.forEach(linkedProperty => {
    fetchedProperties.push({
      propId: linkedProperty[propertyKeys.PROPERTYID],
      address: linkedProperty[propertyKeys.ADDRESS],
      tenants: linkedProperty[propertyKeys.TENANTS],
      bedrooms: linkedProperty[propertyKeys.BEDROOMS],
      bathrooms: linkedProperty[propertyKeys.BATHROOMS],
    });
  });
  storePropertyData(fetchedProperties);
  return {
    type: PROPERTY_LIST_ACTION_TYPES.FETCH_PROPERTIES,
    properties: fetchedProperties,
  };
};

