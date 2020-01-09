import React from 'react'; //**For every file that uses jsx, YOU MUST IMPORT REACT  */
import {AccountConnectedCard,  ConnectAccountCard,  SceneInjectedProps, DarkModeInjectedProps }  from 'homepair-components';
import strings from 'homepair-strings';
import { AccountState } from 'homepair-types'

const homepairAccountStrings = strings.connectAccountPage

export type AccountScreenStateProps = {
  accountProfile: AccountState,
}
export type AccountScreenDispatchProps = {
  /**TODO: Make sure to add proper arguments and parameters into these functions */
  onConnectRoopairsAccount: () => void,
  onDisconnectRoopairsAccount: () => void;
}
type Props = SceneInjectedProps & AccountScreenStateProps & AccountScreenDispatchProps & DarkModeInjectedProps


export default class AccountScreenBase extends React.Component<Props> {
  protected handleConnectResults = (arg0?:any) => {
      //TODO: Handle the results of connecting a Roopairs account with the Homepairs account 
      alert('I need to handle these results now!')
  }

  protected handleDisconnectResults = (arg0?:any) => {
      //TODO: Handle the results of disconnecting a Roopairs account from the Homepairs account 
      alert('I need to handle these results now!')  
  }

  render(){
      var accountProfile = this.props.accountProfile
      if(accountProfile.roopairsToken === homepairAccountStrings.tokenFailed){
        return (
        <ConnectAccountCard 
        connectAccountCallBack={() => this.handleConnectResults()}
        primaryColorTheme={this.props.primaryColorTheme}/>
        )
      }
      return(
        <AccountConnectedCard 
        disconnectAccountCallBack={() => this.handleDisconnectResults()}
        primaryColorTheme={this.props.primaryColorTheme}/>
      )
  }
}