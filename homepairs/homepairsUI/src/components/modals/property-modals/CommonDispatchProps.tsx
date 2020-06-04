import { fetchPropertyAppliancesAndTenants } from 'homepairs-endpoints';
import { storePropertyApplianceAndTenants } from 'homepairs-redux-actions';
import { connect } from 'react-redux';


export type DetailedPropertyMutatorDispatchProps = {
    setAppliancesAndTenants: (propId: string, token: string) => any
}

export const DetailedPropertyDispatchProps: (
    dispatch: any
) => DetailedPropertyMutatorDispatchProps = dispatch => ({
    // Calls an api requesst from the backend and then updates the store 
    setAppliancesAndTenants: async (propId: string, token) => {
        await fetchPropertyAppliancesAndTenants(propId, token).then(response => {
            const {tenants, appliances} = response;
            dispatch(storePropertyApplianceAndTenants(tenants,appliances));
        }).catch(error => {console.log(error);});
    },
});

export const DetailedPropertyMutatorModal = (SmartComponent: any) => connect(
    null,
    DetailedPropertyDispatchProps,
)(SmartComponent);