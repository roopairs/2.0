import { AsyncStorage } from 'react-native';
import { 
    RefreshServiceProvidersAction, 
    RemoveServiceProviderAction,
    ServiceProvider,
 } from '../types';

/**
 * ----------------------------------------------------
 * Preffered Service Provider Action Types
 * ----------------------------------------------------
 * A enumeration of values used to help the reducer distinguish between
 * the different changes it should make to the store. Two types exists. 
 * 1. Refresh Action -should be used when any get requests to the 
 * backend is invoked. This should also be used after a successful put 
 * request adding to the list has been invoked.
 * 
 * 2. Remove Service Provider Action -should be used when a successful remove 
 * (as verified from the backend) has been invoked.
 */
export enum PREFERRED_SERVICE_PROVIDER_ACTION_TYPES {
  REFRESH_SERVICE_PROVIDERS = 'PREFERRED_SERVICE_PROVIDER_ACTION_TYPES/REFRESH_SERVICE_PROVIDERS',
  REMOVE_SERVICE_PROVIDER = 'PREFERRED_SERVICE_PROVIDER_ACTION_TYPES/REMOVE_SERVICE_PROVIDER',
}


/**
 * ----------------------------------------------------
 * Refresh Service Providers
 * ----------------------------------------------------
 * A small action that will be dispatched to the store after a get request to the backend 
 * has been successful. 
 * It will recieve a list of prefferred service provides that will overwrite the current 
 * list. 
 */
export const refreshServiceProviders = (serviceProviders: ServiceProvider[]): RefreshServiceProvidersAction => {
    return {
        type: PREFERRED_SERVICE_PROVIDER_ACTION_TYPES.REFRESH_SERVICE_PROVIDERS,
        preferredServiceProviders: serviceProviders,
    };
};

/**
 * ----------------------------------------------------
 * Remove Service Provider
 * ----------------------------------------------------
 * A small action that will be dispatched to remove a specific service Provider from the store. 
 */
export const removeServiceProvider = (serviceProvider: ServiceProvider): RemoveServiceProviderAction => {
    return {
        type: PREFERRED_SERVICE_PROVIDER_ACTION_TYPES.REMOVE_SERVICE_PROVIDER,
        serviceProvider,
    };
};



