import { AppState, MainAppStackType, PropertyDict, TenantInfo, Appliance, PropertyManagerAccount } from 'homepairs-types';
import { updateSelectedPage, storePropertyApplianceAndTenants} from 'homepairs-redux-actions';
import { connect } from 'react-redux';
import { PROPERTY} from 'src/routes';
import { fetchPropertyAppliancesAndTenants } from 'homepairs-endpoints';
import React from 'react';

export type WithSinglePropertyStateProps = {
    properties: PropertyDict,
    tenantInfo: TenantInfo[],
    applianceInfo: Appliance[],
    token: string,
    apiKey: string,
};

export type WithSinglePropertyDispatchProps = {
    onUpdateHeader: () => any
    setAppliancesAndTenants: (propId: string) => any,
}

export type WithSinglePropertyInjectedProps = 
    & WithSinglePropertyDispatchProps 
    & WithSinglePropertyDispatchProps;


export function mapStateToProps(state: AppState): WithSinglePropertyStateProps {
    const {properties, accountProfile} = state;

    return { 
        properties: properties.properties,
        token: (accountProfile as PropertyManagerAccount).roopairsToken,
        tenantInfo: properties.tenants,
        applianceInfo: properties.appliances,
        apiKey: state.settings.apiKey,
    };
}

export const mapDispatchToProps: (dispatch:any) => WithSinglePropertyDispatchProps = dispatch => ({
    onUpdateHeader: () => {
      const selected: MainAppStackType = {
          title: 'Detailed Property',
          navigate: PROPERTY,
      };
      dispatch(updateSelectedPage(selected));
    },
    // Calls an api requesst from the backend and then updates the store 
    setAppliancesAndTenants: async (propId: string) => {
        await fetchPropertyAppliancesAndTenants(propId).then(response => {
            const {tenants, appliances} = response;
            dispatch(storePropertyApplianceAndTenants(tenants,appliances));
        }).catch(error => {console.log(error);});
    },
});

export default function withSinglePropertyConnect(WrappedComponent: any){
    const InnerComponent = connect(
        mapStateToProps,
        mapDispatchToProps,
    )(WrappedComponent);

    return (props: any) => {
        return <InnerComponent {...props} />;
    };
}