import React from 'react'; //* *For every file that uses jsx, YOU MUST IMPORT REACT  */
import { Card, ThinButton } from 'homepairs-elements';
import strings from 'homepairs-strings';
import styles from './ConnectCardStyles';

export type AccountConnectedCardProps = {
    /**
     * Callback function that will disconnect the account from roopairs
     */
    disconnectAccountCallBack?: (arg0?: any) => any;
};

const cardStrings =
    strings.connectAccountPage.accountConnected.accountConnectedCard;

/**
 * ------------------------------------------------------------
 * Account Connected Card
 * ------------------------------------------------------------
 * A small component that will be able to disconnect a users account 
 * from the Roopairs Backend.
 * *Note: This will most likely be removed in the future.
 * @param {AccountConnectedCardProps} props 
 */
export default function AccountConnectedCard(props: AccountConnectedCardProps) {
    const {disconnectAccountCallBack } = props;

    function disconnectAccount() {
        // TODO: Call asyncronous fetch (From fetch or axios) to connect Roopairs account
        alert('I need to disconnect');
        disconnectAccountCallBack(
            'TODO: Insert Parameters for call back (might be a json)!',
        );
    }

    return (
        <Card
            containerStyle={styles.accountContainer}
            title={cardStrings.title}
            titleStyle={styles.textContainer}
            subtitle={cardStrings.subtitle}
            subtitleStyle={styles.cardDescription}
            wrapperStyle={styles.wrapper}>
            <ThinButton
                name={cardStrings.button}
                containerStyle={styles.thinButtonContainer}
                buttonStyle={styles.thinButton}
                buttonTextStyle={styles.thinButtonText}
                onClick={disconnectAccount}/>
        </Card>
    );
}

AccountConnectedCard.defaultProps = {
    disconnectAccountCallBack: () => {},
};
