import axios from 'axios';
import { NavigationStackProp } from 'react-navigation-stack';
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
    EditApplianceState,
} from '../types';

const responseKeys = HomePairsResponseKeys;
const propertyKeys = HomePairsResponseKeys.PROPERTY_KEYS;

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
    FETCH_PROPERTIES = 'PROPERTY_LIST/FETCH_PROPERTIES',
    SET_SELECTED_PROPERTY = 'PROPERTY_LIST/SET_SELECTED_PROPERTY',
    ADD_APPLIANCE = 'PROPERTY_LIST/ADD_APPLIANCE', 
    UPDATE_APPLIANCE = 'PROPERTY_LIST/UPDATE_APPLIANCE',
}

/**
 * ----------------------------------------------------
 * setSelectedProperty
 * ----------------------------------------------------
 * Action whom indicates to the reducer what property is currently selected
 * to be viewed by the user. This is set to null//undefined if none is currently
 * being view
 * @param {number} index -position of the property in the array of the state
 */
export const setSelectedProperty = (
    index: number,
): SetSelectedPropertyAction => {
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
    navigation: NavigationStackProp,
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
                    console.log(response[responseKeys.DATA]);
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
export const updateProperty = (
    propertyIndex: number,
    updatedProperty: Property,
): UpdatePropertyAction => {
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
    navigation: NavigationStackProp,
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
 * TENANTS
 * @param {Property} linkedProperty -Property recieved from the homepairs servers
 */
export const fetchProperty = (
    linkedProperty: Property,
): FetchPropertyAction => {
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
    return {
        type: PROPERTY_LIST_ACTION_TYPES.FETCH_PROPERTY,
        property: fetchedProperties,
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
export const fetchProperties = (
    linkedProperties: Array<any>,
): FetchPropertiesAction => {
    const fetchedProperties: Property[] = [];
    linkedProperties?.forEach(linkedProperty => {
        fetchedProperties.push({
            propId: linkedProperties[propertyKeys.PROPERTYID],
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
        properties: fetchedProperties,
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
export const addAppliance = (newAppliance: Appliance): AddApplianceAction => {
    return {
        type: PROPERTY_LIST_ACTION_TYPES.ADD_APPLIANCE,
        userData: newAppliance,
    };
};

export const postNewAppliance = (
    newAppliance: Appliance,
    info: AddApplianceState,
    setInitialState: () => void,
    displayError: (msg: string) => void,
    navigation: NavigationStackProp,
) => {
    return async (dispatch: (arg0: any) => void) => {
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
                    const newApp : Appliance = {
                        applianceId: response[responseKeys.DATA][responseKeys.ID],
                        category: newAppliance.category,
                        appName: newAppliance.appName, 
                        manufacturer: newAppliance.manufacturer, 
                        modelNum: newAppliance.modelNum, 
                        serialNum: newAppliance.serialNum, 
                        location: newAppliance.location,
                    };
                    dispatch(addAppliance(newApp));
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
    info: EditApplianceState,
    displayError: (msg: string) => void,
    navigation: NavigationStackProp,
) => {
    return async (dispatch: (arg0: any) => void) => {
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
