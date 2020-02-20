import {
    PropertyListState,
    PropertyListAction,
    AddPropertyAction,
    AddApplianceAction, 
    UpdateApplianceAction,
    RemovePropertyAction,
    UpdatePropertyAction,
    FetchPropertyAction,
    FetchPropertyAndPropertyManagerAction,
    SetSelectedPropertyAction,
    FetchPropertiesAction,
} from '../types';
import { PROPERTY_LIST_ACTION_TYPES } from './actions';

/**
 * A reducer is a pure function that takes the previous state and
 * an action as arguments and returns a new state. The reducer is
 * instrumental in keeping the current state of friends updated
 * throughout our app as it changes.
 * */


export const initialState: PropertyListState = {
    selectedPropertyIndex: null,
    properties: [],
    appliances: [],
    propertyManager: null,
>>>>>>> 4272c80229cba19f11e9ab1f81ef01c95cbed99d
};

export const properties = (
    state: PropertyListState = initialState,
    action: PropertyListAction,
) => {
    /* * NOTE: USE IMMUTABLE UPDATE FUNCTIONS FOR REDUCERS OR ELSE REDUX WILL NOT UPDATE!!! * */
    const newState = { ...state };
    let property = null;
    // let appliance = null;
    let updateIndex: number = null;
    let updatedPropertyList = null;
    // let updatedApplianceList = null;

    switch (action.type) {
        case PROPERTY_LIST_ACTION_TYPES.ADD_PROPERTY:
            // pay attention to type-casting on action
            property = (action as AddPropertyAction).userData;
            updatedPropertyList = [...state.properties, property];
            return {
                selectedPropertyIndex: null,
                properties: updatedPropertyList,
            };
        case PROPERTY_LIST_ACTION_TYPES.REMOVE_PROPERTY:
            updateIndex = (action as RemovePropertyAction).index;
            updatedPropertyList = newState.properties.filter(
                (_item, propIndex) => propIndex !== updateIndex,
            );
            return {
                selectedPropertyIndex: null,
                properties: updatedPropertyList,
            };
        case PROPERTY_LIST_ACTION_TYPES.UPDATE_PROPERTY:
            property = (action as UpdatePropertyAction).userData;
            updateIndex = (action as UpdatePropertyAction).index;
            updatedPropertyList = state.properties.map((item, index) => {
                if (index !== updateIndex) {
                    // This isn't the item we care about - keep it as-is
                    return item;
                }
                // Otherwise, this is the one we want - return an updated value
                return {
                    ...item,
                    ...property,
                };
            });
            return {
                selectedPropertyIndex: updateIndex,
                properties: updatedPropertyList,
            };
        /*
        case PROPERTY_LIST_ACTION_TYPES.ADD_APPLIANCE:
            // pay attention to type-casting on action
            appliance = (action as AddApplianceAction).userData;
            updatedApplianceList = [...state.appliances, appliance];
            return {
                selectedPropertyIndex: null,
                properties: updatedApplianceList,
            };
        case PROPERTY_LIST_ACTION_TYPES.UPDATE_APPLIANCE:
            appliance = (action as UpdateApplianceAction).userData;
            updateIndex = (action as UpdateApplianceAction).index;
            updatedApplianceList = state.appliances.map((item, index) => {
                if (index !== updateIndex) {
                    // This isn't the item we care about - keep it as-is
                    return item;
                }
                // Otherwise, this is the one we want - return an updated value
                return {
                    ...item,
                    ...appliance,
                };
            });
            return {
                selectedPropertyIndex: updateIndex,
                appliances: updatedApplianceList,
            };
            */
        case PROPERTY_LIST_ACTION_TYPES.FETCH_PROPERTY:
            return {
                selectedPropertyIndex: null,
                properties: (action as FetchPropertyAction).property,
            };
        case PROPERTY_LIST_ACTION_TYPES.FETCH_PROPERTY_AND_PROPERTY_MANAGER:
            return {
                selectedPropertyIndex: null,
                properties: (action as FetchPropertyAndPropertyManagerAction).property,
                propertyManager: (action as FetchPropertyAndPropertyManagerAction).propertyManager,
            };
        case PROPERTY_LIST_ACTION_TYPES.FETCH_PROPERTIES:
            return {
                selectedPropertyIndex: null,
                properties: (action as FetchPropertiesAction).properties,
            };
        case PROPERTY_LIST_ACTION_TYPES.SET_SELECTED_PROPERTY:
            return {
                ...newState,
                selectedPropertyIndex: (action as SetSelectedPropertyAction).index,
            };
        default:
            return state;
    }
};
