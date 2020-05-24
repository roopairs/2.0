import { AppState, MainAppStackType, PropertyDict, TenantInfo, Appliance } from 'homepairs-types';
import { updateSelectedPage, storePropertyApplianceAndTenants} from 'homepairs-redux-actions';
import { connect } from 'react-redux';
import { PROPERTY} from 'homepairs-routes';
import { fetchPropertyAppliancesAndTenants } from 'homepairs-endpoints';

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
    const {properties} = state;
    return { 
        properties: properties.properties,
        token: state.accountProfile.roopairsToken,
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
    return connect(
        mapStateToProps,
        mapDispatchToProps,
    )(WrappedComponent);
}