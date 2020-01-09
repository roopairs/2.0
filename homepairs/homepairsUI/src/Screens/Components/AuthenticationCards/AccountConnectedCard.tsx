import React from 'react'; //**For every file that uses jsx, YOU MUST IMPORT REACT  */
import { ThinButton, Card } from 'homepair-elements';
import { setStyles } from './ConnectCardStyles';
import strings from 'homepair-strings'
import { DarkModeInjectedProps } from '../WithDarkMode/WithDarkMode';

export type AccountConnectedCardProps = DarkModeInjectedProps & {
    disconnectAccountCallBack?: (arg0?:any) => any
}

const cardStrings = strings.connectAccountPage.accountConnected.accountConnectedCard

export default function AccountConnectedCard(props:AccountConnectedCardProps) {
    let styles = setStyles(props.primaryColorTheme)
    
    function disconnectAccount(){
        //TODO: Call asyncronous fetch (From fetch or axios) to connect Roopairs account
        alert('I need to disconnect')
        props.disconnectAccountCallBack('TODO: Insert Parameters for call back (might be a json)!')
    }

    let disconnectAccountCardProps = {
        containerStyle: styles.accountContainer,
        title: cardStrings.title,
        titleStyle: styles.cardTitle,
        titleContainerStyle: styles.textContainer,
        subtitle: cardStrings.subtitle,
        subtitleStyle: styles.cardDescription,
        wrapperStyle: styles.wrapper,
    }

    let buttonProps = {
        name: cardStrings.button,
        containerStyle: styles.thinButtonContainer,
        buttonStyle: styles.thinButton,
        buttonTextStyle: styles.thinButtonText,
        onClick: disconnectAccount,
    }

    return(
        <Card {...disconnectAccountCardProps}>
            <ThinButton {...buttonProps}/>
        </Card>
    )
}

