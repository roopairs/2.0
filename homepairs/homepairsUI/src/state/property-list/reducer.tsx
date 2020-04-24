import {
    PropertyListState,
    PropertyListAction,
    AddPropertyAction,
    RemovePropertyAction,
    UpdatePropertyAction,
    FetchPropertyAndPropertyManagerAction,
    SetSelectedPropertyAction,
    FetchPropertiesAction,
    Property,
} from '../types';
import { PROPERTY_LIST_ACTION_TYPES } from './actions';

/**
 * A reducer is a pure function that takes the previous state and
 * an action as arguments and returns a new state. The reducer is
 * instrumental in keeping the current state of friends updated
 * throughout our app as it changes.
 * */


export const initialState: PropertyListState = {
    selectedPropertyId: null,
    properties: {},
    appliances: [],
    propertyManager: null,
};

// TODO: Make sure any updates to the local storage occur here!!! This way it will always have an updated property list
export const properties = (
    state: PropertyListState = initialState,
    action: PropertyListAction,
) => {
    /* * NOTE: USE IMMUTABLE UPDATE FUNCTIONS FOR REDUCERS OR ELSE REDUX WILL NOT UPDATE!!! * */
    const newState = { ...state };
    let property: Property = null;
    let updatePropId: string = null;
    let updatedPropertyDict = {};

    switch (action.type) {
        case PROPERTY_LIST_ACTION_TYPES.ADD_PROPERTY:
            // pay attention to type-casting on action
            property = (action as AddPropertyAction).userData;
            updatedPropertyDict = {...state.properties};
            updatedPropertyDict[property.propId] = property;
            return {
                ...newState,
                selectedPropertyId: null,
                properties: updatedPropertyDict,
            };
        case PROPERTY_LIST_ACTION_TYPES.REMOVE_PROPERTY:
            updatePropId = (action as RemovePropertyAction).propId;
            updatedPropertyDict = {...newState.properties};
            delete updatedPropertyDict[updatePropId];
            return {
                ...newState,
                selectedPropertyId: null,
                properties: updatedPropertyDict,
            };
        case PROPERTY_LIST_ACTION_TYPES.UPDATE_PROPERTY:
            property = (action as UpdatePropertyAction).userData;
            updatePropId = (action as UpdatePropertyAction).propId;
            updatedPropertyDict = {...newState.properties};
            updatedPropertyDict[updatePropId] = property;
            return {
                ...newState,
                selectedPropertyId: updatePropId,
                properties: updatedPropertyDict,
            };
        case PROPERTY_LIST_ACTION_TYPES.FETCH_PROPERTY_AND_PROPERTY_MANAGER:
            return {
                ...newState,
                selectedPropertyId: (action as FetchPropertyAndPropertyManagerAction).property.propId,
                properties: (action as FetchPropertyAndPropertyManagerAction).property,
                propertyManager: (action as FetchPropertyAndPropertyManagerAction).propertyManager,
            };
        case PROPERTY_LIST_ACTION_TYPES.FETCH_PROPERTIES:
            return {
                ...newState,
                selectedPropertyId: null,
                properties: (action as FetchPropertiesAction).properties,
            };
        case PROPERTY_LIST_ACTION_TYPES.SET_SELECTED_PROPERTY:
            return {
                ...newState,
                selectedPropertyId: (action as SetSelectedPropertyAction).propId,
            };
        default:
            return state;
    }
};
