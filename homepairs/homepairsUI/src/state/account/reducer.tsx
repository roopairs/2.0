/**
* A reducer is a pure function that takes the previous state and 
* an action as arguments and returns a new state. The reducer is 
* instrumental in keeping the current state updated 
* throughout our app as it changes. 
* */

import { 
    AccountState, 
    FetchUserAccountProfileAction, 
    AccountStateAction, 
} from '../types';
import { FETCH_PROFILE_ACTION_TYPES } from './actions';


export const initialState: AccountState = null;

/**
 * ----------------------------------------------------
 * accountProfile
 * ----------------------------------------------------
 * The reducer for the redux-store that deals with the state of anything homepairs
 * account related. This reducer will be initialized upon authorization and will 
 * be called during a change of user settings. Only dispatch methods and the 
 * root store should ever need to use this function.
 * @param {AccountState} state - current state of the redux-store
 * @param {AccountStateAction} action - the value that determines what type of mutation will occur with the store 
 */
export const accountProfile = (
    state: AccountState = initialState,
    action: AccountStateAction,
) => {
    let profileState: AccountState;
    const prevState = {...state};
    switch (action.type){
        case FETCH_PROFILE_ACTION_TYPES.FETCH_PROFILE:
            // pay attention to type-casting on action
            profileState = (action as FetchUserAccountProfileAction).profile;
            return profileState;
        default:
            return prevState;
    }
};