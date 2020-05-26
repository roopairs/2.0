import { AppState} from 'homepairs-types';
import { connect } from 'react-redux';
import {
    AccountScreenBase,
    AccountScreenStateProps,
    AccountScreenDispatchProps,
} from './AccountScreenBase';



function mapStateToProps(state: AppState): AccountScreenStateProps {
    return { accountProfile: state.accountProfile };
}

const mapDispatchToProps: (dispatch: any) => AccountScreenDispatchProps = (
    dispatch: any,
) => ({
    onConnectRoopairsAccount: () => {
        // TODO: Add action to connect to Roopairs api
    },
    onDisconnectRoopairsAccount: () => {
        // TODO: Add action for when disconnecting Roopairs Account
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(AccountScreenBase);

