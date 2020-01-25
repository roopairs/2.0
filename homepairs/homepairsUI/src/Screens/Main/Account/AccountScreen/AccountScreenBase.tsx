import React from 'react';
import {
    AccountConnectedCard,
    ConnectAccountCard,
    SceneInjectedProps,
    DarkModeInjectedProps,
} from 'homepair-components';
import strings from 'homepair-strings';
import { AccountState } from 'homepair-types';

const homepairAccountStrings = strings.connectAccountPage;

export type AccountScreenStateProps = {
    accountProfile: AccountState;
};
export type AccountScreenDispatchProps = {
    /* * TODO: Make sure to add proper arguments and parameters into these functions * */
    onConnectRoopairsAccount: () => void;
    onDisconnectRoopairsAccount: () => void;
};
type Props = SceneInjectedProps &
    AccountScreenStateProps &
    AccountScreenDispatchProps &
    DarkModeInjectedProps;

export default class AccountScreenBase extends React.Component<Props> {
    handleConnectResults = (arg0?: any) => {
        // TODO: Handle the results of connecting a Roopairs account with the Homepairs account
        alert('I need to handle these results now!');
    };

    handleDisconnectResults = (arg0?: any) => {
        // TODO: Handle the results of disconnecting a Roopairs account from the Homepairs account
        alert('I need to handle these results now!');
    };

    render() {
        const { accountProfile, primaryColorTheme } = this.props;
        if (
            accountProfile.roopairsToken === homepairAccountStrings.tokenFailed
        ) {
            return (
                <ConnectAccountCard
                    connectAccountCallBack={() => this.handleConnectResults()}
                    primaryColorTheme={primaryColorTheme}
                />
            );
        }
        return (
            <AccountConnectedCard
                disconnectAccountCallBack={() => this.handleDisconnectResults()}
                primaryColorTheme={primaryColorTheme}
            />
        );
    }
}
