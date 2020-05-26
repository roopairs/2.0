import React from 'react'; //* *For every file that uses jsx, YOU MUST IMPORT REACT  */
import { Card, ThinButton } from 'src/elements';
import strings from 'homepairs-strings';
import styles from './ConnectCardStyles';

export type ConnectAccountCardProps = {
    /**
     * Callback that will connect the card to Roopairs
     */
    connectAccountCallBack?: (arg0?: any) => any;
};

const cardStrings =
    strings.connectAccountPage.accountNotConnected.connectAccountCard;

/**
 * ------------------------------------------------------------
 * Connect Account Card
 * ------------------------------------------------------------
 * A small component that will be able to connect a users account 
 * to the Roopairs Backend.
 * *Note: This will most likely be removed in the future.
 * @param {ConnectedAccountCardProps} props 
 */
export default function ConnectAccountCard(props: ConnectAccountCardProps) {
    const { connectAccountCallBack } = props;
    function connectAccount() {
        // TODO: Call asyncronous fetch (From fetch or axios) to connect Roopairs account
        alert('I need to connect');
        connectAccountCallBack(
            'TODO: Insert Parameters for call back (might be a json)!',
        );
    }

    return (
        <Card
            containerStyle={styles.accountContainer}
            title={cardStrings.title}
            titleStyle={styles.cardTitle}
            titleContainerStyle={styles.textContainer}
            subtitle={cardStrings.subtitle}
            subtitleStyle={styles.cardDescription}
            wrapperStyle={styles.wrapper}
        >
            <ThinButton
                name={cardStrings.button}
                containerStyle={styles.thinButtonContainer}
                buttonStyle={styles.thinButton}
                buttonTextStyle={styles.thinButtonText}
                onClick={connectAccount}/>
        </Card>
    );
}

ConnectAccountCard.defaultProps = {
    connectAccountCallBack: () => {},
};
