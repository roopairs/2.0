import React from 'react';
import strings from 'homepairs-strings';
import { AccountState } from 'homepairs-types';
import {
    AccountConnectedCard,
    ConnectAccountCard,
} from './AuthenticationCards';

const homepairAccountStrings = strings.connectAccountPage;

export type AccountScreenStateProps = {
    accountProfile: AccountState;
};
export type AccountScreenDispatchProps = {
    /* * TODO: Make sure to add proper arguments and parameters into these functions * */
    onConnectRoopairsAccount: () => void;
    onDisconnectRoopairsAccount: () => void;
};
type Props = AccountScreenStateProps &
    AccountScreenDispatchProps;

export class AccountScreenBase extends React.Component<Props> {
    handleConnectResults = (arg0?: any) => {
        // TODO: Handle the results of connecting a Roopairs account with the Homepairs account
        alert('I need to handle these results now!');
    };

    handleDisconnectResults = (arg0?: any) => {
        // TODO: Handle the results of disconnecting a Roopairs account from the Homepairs account
        alert('I need to handle these results now!');
    };

    render() {
        const { accountProfile} = this.props;
        if (
            accountProfile.roopairsToken === homepairAccountStrings.tokenFailed
        ) {
            return (
                <ConnectAccountCard
                    connectAccountCallBack={() => this.handleConnectResults()}/>
            );
        }
        return (
            <AccountConnectedCard
                disconnectAccountCallBack={() => this.handleDisconnectResults()}/>
        );
    }
}
