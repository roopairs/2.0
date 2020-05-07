import { SetAccountAuthenticationStateAction } from '../types';


/**
 * ----------------------------------------------------
 * Session Action Types
 * ----------------------------------------------------
 * A enumeration of values used to help the reducer distinguish between
 * the different changes it should make to the store. Every potential
 * mutation to the Session Store should contain a unique value
 * in.
 */
export enum SESSION_ACTION_TYPES {
    SET_AUTH_STATE = 'SESSION/SET_AUTH_STATE',
};


  /**
   * ----------------------------------------------------
   * setAccountAuthenticationState
   * ----------------------------------------------------
   * Action whom indicates to the reducer whether or not the application is running on an authenticated 
   * account. 
   * @param {boolean} authed -value used to determine if the app is authenticated
   */
  export const setAccountAuthenticationState = (authed: boolean): SetAccountAuthenticationStateAction => {
    return {
      type: SESSION_ACTION_TYPES.SET_AUTH_STATE,
      authed,
    };
  };