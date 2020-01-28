import React from 'react'; //* *For every file that uses jsx, YOU MUST IMPORT REACT  */
import { renderThinButton, Card } from 'homepairs-elements';
import strings from 'homepairs-strings';
import setStyles from './ConnectCardStyles';
import { DarkModeInjectedProps } from '../WithDarkMode/WithDarkMode';

export type AccountConnectedCardProps = DarkModeInjectedProps & {
    disconnectAccountCallBack?: (arg0?: any) => any;
};

const cardStrings =
    strings.connectAccountPage.accountConnected.accountConnectedCard;

export default function AccountConnectedCard(props: AccountConnectedCardProps) {
    const { primaryColorTheme, disconnectAccountCallBack } = props;
    const styles = setStyles(primaryColorTheme);

    function disconnectAccount() {
        // TODO: Call asyncronous fetch (From fetch or axios) to connect Roopairs account
        alert('I need to disconnect');
        disconnectAccountCallBack(
            'TODO: Insert Parameters for call back (might be a json)!',
        );
    }

    const buttonProps = {
        name: cardStrings.button,
        containerStyle: styles.thinButtonContainer,
        buttonStyle: styles.thinButton,
        buttonTextStyle: styles.thinButtonText,
        onClick: disconnectAccount,
    };

    return (
        <Card
            containerStyle={styles.accountContainer}
            title={cardStrings.title}
            titleStyle={styles.textContainer}
            subtitle={cardStrings.subtitle}
            subtitleStyle={styles.cardDescription}
            wrapperStyle={styles.wrapper}
        >
            {renderThinButton(buttonProps)}
        </Card>
    );
}
