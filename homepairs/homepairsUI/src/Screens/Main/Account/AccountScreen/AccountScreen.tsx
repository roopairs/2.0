import { AppState, MainAppStackType } from 'homepairs-types';
import { connect } from 'react-redux';
import { AccountActions } from 'homepairs-redux-actions';
import { withSceneHeader, withDarkMode } from 'homepairs-components';
import { withNavigation } from 'react-navigation';
import AccountScreenBase, {
    AccountScreenStateProps,
    AccountScreenDispatchProps,
} from './AccountScreenBase';

const sceneParam: MainAppStackType = {
    title: 'Account Settings',
    navigate: 'Account',
    key: 'AccountSettings',
};

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

const AccountScreen = connect(
    mapStateToProps,
    mapDispatchToProps,
)(AccountScreenBase);

export default withDarkMode(withNavigation(withSceneHeader(AccountScreen, sceneParam)));
