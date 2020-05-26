import { AppState, PropertyManagerAccount, TenantAccount } from 'homepairs-types';
import { connect } from 'react-redux';
import { convertObjectValuesToArray } from 'src/utility';
import { NewServiceRequestBase, NewRequestScreenStateProps } from './NewRequestScreenBase';

function mapStateToProps(state: AppState) : NewRequestScreenStateProps {
    const properties = convertObjectValuesToArray(state.properties.properties);
    return {
        accountType: state.accountProfile.accountType,
        properties,
        token: state.accountProfile.token,
        pmId: (state.accountProfile as (PropertyManagerAccount)).pmId,
        phoneNumber: (state.accountProfile as (TenantAccount)).phoneNumber,
    };
}

export default connect(
    mapStateToProps,
)(NewServiceRequestBase);

