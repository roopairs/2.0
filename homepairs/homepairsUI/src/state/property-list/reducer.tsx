import { 
      PropertyListState, 
      PropertyListAction, 
      AddPropertyAction, 
      RemovePropertyAction, 
      UpdatePropertyAction, 
      FetchPropertyAction, 
} from '../types';
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
  action: PropertyListAction,
) => {
  /* * NOTE: USE IMMUTABLE UPDATE FUNCTIONS FOR REDUCERS OR ELSE REDUX WILL NOT UPDATE!!! * */
  let property = null;
  let updateIndex:number = null;
  let updatedState = null;
  const newState = {...state, modalOpen: true };

  switch (action.type){
      case PROPERTY_LIST_ACTION_TYPES.ADD_PROPERTY:
            // pay attention to type-casting on action
            property = (action as AddPropertyAction).userData;
            return [...newState, property ];
      case PROPERTY_LIST_ACTION_TYPES.REMOVE_PROPERTY: 
            updateIndex = (action as RemovePropertyAction).index;
            return newState.filter((_item, propIndex) => propIndex !== updateIndex);

      case PROPERTY_LIST_ACTION_TYPES.UPDATE_PROPERTY:  
            property = (action as UpdatePropertyAction).userData;
            updateIndex = (action as UpdatePropertyAction).index;
            updatedState = state.map((item, index) => {
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
            return updatedState;
      case PROPERTY_LIST_ACTION_TYPES.FETCH_PROPERTIES:
            return (action as FetchPropertyAction).properties;
      default:
          return state;
  }
};