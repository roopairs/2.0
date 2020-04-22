import { AuthenticationState, SessionAction, SetAccountAuthenticationStateAction } from '../types';
import { SESSION_ACTION_TYPES } from './actions';

export const initialState = {
    authed: false,
};

export const authenticated = (
    state: AuthenticationState = initialState,
    action: SessionAction,
) => {
    /* * NOTE: USE IMMUTABLE UPDATE FUNCTIONS FOR REDUCERS OR ELSE REDUX WILL NOT UPDATE!!! * */
    let authed;
    switch (action.type) {
        case SESSION_ACTION_TYPES.SET_AUTH_STATE:
            // pay attention to type-casting on action
            authed = (action as SetAccountAuthenticationStateAction).authed;
            return {
                authed,
            };
        default:
            return state;
    }
};
