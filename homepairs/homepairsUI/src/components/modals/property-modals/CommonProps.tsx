import React from 'react';
import { fetchPropertyAppliancesAndTenants } from 'homepairs-endpoints';
import { storePropertyApplianceAndTenants } from 'homepairs-redux-actions';
import { connect } from 'react-redux';
import { PropertyDict, AppState, Contact, PropertyManagerAccount } from 'homepairs-types';

export type PropertyStateProps = {
    properties: PropertyDict,
    propertyManager: Contact,
    token: string,
}

export type DetailedPropertyMutatorDispatchProps = {
    setAppliancesAndTenants: (propId: string) => any
}

export function MapPropertyStateProps(state: AppState){
    return {
        properties: state.properties.properties,
        propertyManager: state.properties.propertyManager,
        token: (state.accountProfile as PropertyManagerAccount).roopairsToken,
    };
}

export const DetailedPropertyDispatchProps: (
    dispatch: any
) => DetailedPropertyMutatorDispatchProps = dispatch => ({
    // Calls an api requesst from the backend and then updates the store 
    setAppliancesAndTenants: async (propId: string) => {
        await fetchPropertyAppliancesAndTenants(propId).then(response => {
            const {tenants, appliances} = response;
            dispatch(storePropertyApplianceAndTenants(tenants,appliances));
        }).catch(error => {console.log(error);});
    },
});


/**
 * Maps a component to the redux store giving it the properties:
 * 
 * setAppliancesAndTenants: (propId: string) => any, 
 * 
 * @param SmartComponent 
 */
export const DetailedPropertyMutatorModal = (SmartComponent: any) => connect(
    MapPropertyStateProps,
    DetailedPropertyDispatchProps,
)(SmartComponent);


/**
 * Injects a Title Property into a given component.
 * @param Component 
 * @param title 
 */
export function withTitle(Component: any, title: string){
    return function(props: any) {
        return <Component title={title} {...props}/>;
    }; 
};