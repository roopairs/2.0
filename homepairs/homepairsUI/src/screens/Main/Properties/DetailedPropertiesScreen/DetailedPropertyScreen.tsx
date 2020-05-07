import { AppState } from 'homepairs-types';
import { connect } from 'react-redux';
import {storePropertyApplianceAndTenants} from 'homepairs-redux-actions';
import { prepareNavigationHandlerComponent } from 'homepairs-routes';
import { fetchPropertyAppliancesAndTenants } from 'homepairs-endpoints';
import {
    DetailedPropertyScreenBase,
    DetailedPropertyStateProps,
    DetailedPropertyDispatchProps,
} from './DetailedPropertyScreenBase';

function mapStateToProps(state: AppState): DetailedPropertyStateProps {
    const {properties} = state;
    return { 
        properties: properties.properties,
        token: state.accountProfile.roopairsToken,
        tenantInfo: properties.tenants,
        applianceInfo: properties.appliances,
    };
}


const mapDispatchToProps: (
    dispatch: any
) => DetailedPropertyDispatchProps = dispatch => ({
    // Calls an api requesst from the backend and then updates the store 
    setAppliancesAndTenants: async (propId: string) => {
        await fetchPropertyAppliancesAndTenants(propId).then(response => {
            const {tenants, appliances} = response;
            dispatch(storePropertyApplianceAndTenants(tenants,appliances));
        }).catch(error => {console.log(error);});
    },
});

const DetailedPropertyScreen = connect(
    mapStateToProps,
    mapDispatchToProps,
)(DetailedPropertyScreenBase);
export default prepareNavigationHandlerComponent(DetailedPropertyScreen);
