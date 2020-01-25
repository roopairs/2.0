import React from 'react'; //* *For every file that uses jsx, YOU MUST IMPORT REACT  */
import { Card, renderThinButton } from 'homepair-elements';
import strings from 'homepair-strings';
import setStyles from './ConnectCardStyles';
import { DarkModeInjectedProps } from '../WithDarkMode/WithDarkMode';

export type ConnectAccountCardProps = DarkModeInjectedProps & {
    connectAccountCallBack?: (arg0?: any) => any;
};

const cardStrings =
    strings.connectAccountPage.accountNotConnected.connectAccountCard;
export default function ConnectAccountCard(props: ConnectAccountCardProps) {
    const { primaryColorTheme, connectAccountCallBack } = props;
    const styles = setStyles(primaryColorTheme);
    function connectAccount() {
        // TODO: Call asyncronous fetch (From fetch or axios) to connect Roopairs account
        alert('I need to connect');
        connectAccountCallBack(
            'TODO: Insert Parameters for call back (might be a json)!',
        );
    }

    const buttonProps = {
        name: cardStrings.button,
        containerStyle: styles.thinButtonContainer,
        buttonStyle: styles.thinButton,
        buttonTextStyle: styles.thinButtonText,
        onClick: connectAccount,
    };

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
            {renderThinButton(buttonProps)}
        </Card>
    );
}
