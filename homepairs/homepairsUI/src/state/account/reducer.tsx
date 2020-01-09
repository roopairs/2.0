import { 
    AccountState, 
    FetchUserAccountProfileAction, 
    AccountStateAction 
} from '../types';
import { FETCH_PROFILE_ACTION_TYPES } from './actions';

/**
* A reducer is a pure function that takes the previous state and 
* an action as arguments and returns a new state. The reducer is 
* instrumental in keeping the current state updated 
* throughout our app as it changes. 
* */

export const initialState: AccountState = null;

export const accountProfile = (
    state: AccountState = initialState,
    action: AccountStateAction
) => {
    const prevState = {...state, modalOpen: true };
    switch (action.type){
        case FETCH_PROFILE_ACTION_TYPES.FETCH_PROFILE:
            // pay attention to type-casting on action
            const profileState = (action as FetchUserAccountProfileAction).profile;
            return profileState;
        default:
            return prevState;
    }
}