/* eslint-disable no-case-declarations */
import { 
    PreferredServiceProviderState, 
    PreferredServiceProviderAction, 
    RemoveServiceProviderAction, 
    RefreshServiceProvidersAction,
    ServiceProvider,
    ProviderDictionary,
} from '../types';
import { PREFERRED_SERVICE_PROVIDER_ACTION_TYPES} from './actions';
import { testLogo } from 'homepairs-images';


const {REFRESH_SERVICE_PROVIDERS, REMOVE_SERVICE_PROVIDER} = PREFERRED_SERVICE_PROVIDER_ACTION_TYPES;

/**
 * Helper function that converts an array to ServiceProviders to something a preferredServiceProivderState
 * @param {ServiceProvider[]} serviceProviders 
 */
export function arrayToDictionary(serviceProviders: ServiceProvider[]) : ProviderDictionary {
    let newDict: ProviderDictionary = {};
    serviceProviders.forEach((serviceProvider: ServiceProvider) => {
        const {phoneNum} = serviceProvider;
        newDict[phoneNum] = serviceProvider;
    });
    return newDict;
}

/**
 * Helper function that removes a service provider from a dictionary without mutating the original
 * @param {ProviderDictionary} serviceProviders -dictionary of serviceProviders
 * @param {string} phoneNum -service provider key to be removed
 */
export function removeKey(serviceProviders: ProviderDictionary, phoneNum: string): ProviderDictionary {
    let updatedServiceProviders : ProviderDictionary = {};
    Object.entries(serviceProviders).forEach((serviceProvider) => {
        if(phoneNum !== serviceProvider[0]){
            const [key, val] = serviceProvider;
            updatedServiceProviders[key] = val;
        }
    });
    return updatedServiceProviders;
}

// TODO: Gather this information from Async Storage
export const initialState : PreferredServiceProviderState = {
    serviceProviders: {},
};

export const preferredProviders = (
    state: PreferredServiceProviderState = initialState,
    action: PreferredServiceProviderAction,
) : PreferredServiceProviderState => {
    const {serviceProviders} = state;

    switch(action.type){
        case REFRESH_SERVICE_PROVIDERS:
            const newServiceProviders = arrayToDictionary(
                (action as RefreshServiceProvidersAction).preferredServiceProviders);
            return {
                serviceProviders : newServiceProviders,
            };
        case REMOVE_SERVICE_PROVIDER:
            const {phoneNum}  = (action as RemoveServiceProviderAction).serviceProvider;
            const updatedProviders: ProviderDictionary = removeKey(serviceProviders, phoneNum);
            return {
                serviceProviders: updatedProviders,
            };
        default:
            return state;
    }
};