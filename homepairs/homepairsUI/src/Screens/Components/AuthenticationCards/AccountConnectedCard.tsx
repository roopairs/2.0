import React from 'react'; //* *For every file that uses jsx, YOU MUST IMPORT REACT  */
import { renderThinButton, Card } from 'homepair-elements';
import strings from 'homepair-strings';
import setStyles from './ConnectCardStyles';
import { DarkModeInjectedProps } from '../WithDarkMode/WithDarkMode';

export type AccountConnectedCardProps = DarkModeInjectedProps & {
    disconnectAccountCallBack?: (arg0?: any) => any;
};

const cardStrings =
    strings.connectAccountPage.accountConnected.accountConnectedCard;

<<<<<<< HEAD
export default function AccountConnectedCard(props:AccountConnectedCardProps) {
    const styles = setStyles(props.primaryColorTheme)
    
    function disconnectAccount(){
        // TODO: Call asyncronous fetch (From fetch or axios) to connect Roopairs account
        alert('I need to disconnect')
        props.disconnectAccountCallBack('TODO: Insert Parameters for call back (might be a json)!')
    }

    const disconnectAccountCardProps = {
        containerStyle: styles.accountContainer,
        title: cardStrings.title,
        titleStyle: styles.cardTitle,
        titleContainerStyle: styles.textContainer,
        subtitle: cardStrings.subtitle,
        subtitleStyle: styles.cardDescription,
        wrapperStyle: styles.wrapper,
=======
export default function AccountConnectedCard(props: AccountConnectedCardProps) {
    const { primaryColorTheme, disconnectAccountCallBack } = props;
    const styles = setStyles(primaryColorTheme);

    function disconnectAccount() {
        // TODO: Call asyncronous fetch (From fetch or axios) to connect Roopairs account
        alert('I need to disconnect');
        disconnectAccountCallBack(
            'TODO: Insert Parameters for call back (might be a json)!',
        );
>>>>>>> 6c0abe500170f7c4f80d6b59e196169385a97584
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
