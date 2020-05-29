import { AppState, MainAppStackType } from 'homepairs-types';
import { connect } from 'react-redux';
import { updateSelectedPage } from 'homepairs-redux-actions';
import { convertObjectValuesToArray } from 'src/utility';
import {
    ServiceRequestScreenBase,
    ServiceRequestScreenStateProps,
    ServiceRequestsScreenDispatchProps,
} from './ServiceRequestScreenBase';

function mapStateToProps(state: AppState): ServiceRequestScreenStateProps {
    const {header, serviceRequests, properties, accountProfile} = state;
    return {
        pmInfo: properties.propertyManager,
        accountType: accountProfile.accountType,
        serviceRequestsState: serviceRequests,
        header,
        properties: convertObjectValuesToArray(properties.properties),
    };
}

function mapDispatchToProps(dispatch:any): ServiceRequestsScreenDispatchProps {
    return {
        onUpdateHeader: (selected: MainAppStackType) => {
            dispatch(updateSelectedPage(selected));
        },
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ServiceRequestScreenBase);
