import { AppState, MainAppStackType } from 'homepairs-types';
import { connect } from 'react-redux';
import { prepareNavigationHandlerComponent } from 'homepairs-routes';
import {
    AccountScreenBase,
    AccountScreenStateProps,
    AccountScreenDispatchProps,
} from './AccountScreenBase';
import {withSceneHeader} from '../../components/index';

const sceneParam: MainAppStackType = {
    title: 'Account Settings',
    navigate: 'Account',
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

export default prepareNavigationHandlerComponent(withSceneHeader(AccountScreen, sceneParam));
