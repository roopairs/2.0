import { AppState, MainAppStackType } from 'homepairs-types';
import { updateSelectedPage, storePropertyApplianceAndTenants} from 'homepairs-redux-actions';
import { connect } from 'react-redux';
import { prepareNavigationHandlerComponent, PROPERTY } from 'homepairs-routes';
import { fetchPropertyAppliancesAndTenants } from 'homepairs-endpoints';
import {
    DetailedPropertyScreenBase,
    DetailedPropertyStateProps,
    DetailedPropertyScreenDispatchProps,
} from './DetailedPropertyScreenBase';

function mapStateToProps(state: AppState): DetailedPropertyStateProps {
    const {properties} = state;
    return { 
        properties: properties.properties,
        token: state.accountProfile.roopairsToken,
<<<<<<< HEAD
        apiKey: state.settings.apiKey,
=======
        tenantInfo: properties.tenants,
        applianceInfo: properties.appliances,
>>>>>>> 079f91256a2f53dbc51cd11a8e4f5ef9d4fa5957
    };
}

const mapDispatchToProps: (dispatch:any) => DetailedPropertyScreenDispatchProps = dispatch => ({
    onUpdateHeader: () => {
      const selected: MainAppStackType = {
          title: 'Detailed Property',
          navigate: PROPERTY,
          key: 'My Properties',
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

const DetailedPropertyScreen = connect(
    mapStateToProps,
    mapDispatchToProps,
)(DetailedPropertyScreenBase);
export default prepareNavigationHandlerComponent(DetailedPropertyScreen);
