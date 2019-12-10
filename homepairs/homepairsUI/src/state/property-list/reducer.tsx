import { 
      PropertyListState, 
      PropertyListAction, 
      AddPropertyAction, 
      RemovePropertyAction, 
      UpdatePropertyAction, 
      FetchPropertyAction } from '../types';
import { PROPERTY_LIST_ACTION_TYPES } from './actions';

/**
 * A reducer is a pure function that takes the previous state and 
 * an action as arguments and returns a new state. The reducer is 
 * instrumental in keeping the current state of friends updated 
 * throughout our app as it changes. 
 * */

export const initialState: PropertyListState = [];

export const propertyList = (
  state: PropertyListState = initialState,
  action: PropertyListAction
) => {
  /**NOTE: USE IMMUTABLE UPDATE FUNCTIONS FOR REDUCERS OR ELSE REDUX WILL NOT UPDATE!!! */
  //const newState: PropertyListState = cloneDeep(state)
  const newState = {...state, modalOpen: true };
  switch (action.type){
      case PROPERTY_LIST_ACTION_TYPES.ADD_PROPERTY:
            // pay attention to type-casting on action
            const newProperty = (action as AddPropertyAction).userData;
            return [...newState, newProperty ];
      case PROPERTY_LIST_ACTION_TYPES.REMOVE_PROPERTY: 
            const index = (action as RemovePropertyAction).index;
            return newState.filter((item, propIndex) => propIndex !== index)

      case PROPERTY_LIST_ACTION_TYPES.UPDATE_PROPERTY:  
            const updatedProperty = (action as UpdatePropertyAction).userData
            const updateIndex = (action as UpdatePropertyAction).index
            const updatedState = state.map((item, index) => {
                  if (index !== updateIndex) {
                    // This isn't the item we care about - keep it as-is
                    return item
                  }
                  // Otherwise, this is the one we want - return an updated value
                  return {
                    ...item,
                    ...updatedProperty
                  }
            })
            return updatedState;
      case PROPERTY_LIST_ACTION_TYPES.FETCH_PROPERTIES:
            return (action as FetchPropertyAction).properties
      default:
          return state;
  }
}