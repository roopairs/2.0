import React from 'react'; //**For every file that uses jsx, YOU MUST IMPORT REACT  */
import { ThinButton, Card } from 'homepair-elements';
import { setStyles } from './ConnectCardStyles';
import strings from 'homepair-strings'
import { DarkModeInjectedProps } from '../WithDarkMode/WithDarkMode';


export type ConnectAccountCardProps = DarkModeInjectedProps & {
    connectAccountCallBack?: (arg0?:any) => any
}

const cardStrings = strings.connectAccountPage.accountNotConnected.connectAccountCard
export default function ConnectAccountCard(props:ConnectAccountCardProps) {
    let styles = setStyles(props.primaryColorTheme)
    function connectAccount(){
        //TODO: Call asyncronous fetch (From fetch or axios) to connect Roopairs account
        alert('I need to connect')
        props.connectAccountCallBack('TODO: Insert Parameters for call back (might be a json)!')
    }

    let connectAccountCardProps = {
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
        onClick: connectAccount,
    }

    return(
        <Card {...connectAccountCardProps}>
            <ThinButton {...buttonProps}/>
        </Card>
    )
    
}
