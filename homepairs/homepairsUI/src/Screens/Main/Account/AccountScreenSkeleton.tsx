import React from 'react'; //**For every file that uses jsx, YOU MUST IMPORT REACT  */
import {ScrollView, Text } from 'react-native';
import {MainAppStyles} from '../MainAppStyles';
import MainStackTitle from '../../../Components/MainAppComponents/MainStackTitle';
import ConnectAccountCard from '../../../Components/MainAppComponents/ConnectAccountCard';
import { AccountDetailsModel } from '../../../ViewModel/AccountDetailsModel';
import AccountConnectedCard from '../../../Components/MainAppComponents/AccountConnectedCard';

interface AccountScreenSkeletonProps {}
export default abstract class AccountScreenSkeleton extends React.Component<AccountScreenSkeletonProps> {
  /**
   * TODO: Insert any logic for the Account pages. These pages will need to be divided since our header 
   * responds differently based on the OS. Web will hold a side menu, where IOS and Android navigate differntly. 
   * In order to keep very similar code base, we will simply add any functionality shared between the three 
   * classes here. 
   * */

   handleConnectResults = (arg0?:any) => {
     //TODO: Handle the results of connecting a Roopairs account with the Homepairs account 
     alert('I need to handle these results now!')
   }

   handleDisconnectResults = (arg0?:any) => {
     //TODO: Handle the results of disconnecting a Roopairs account from the Homepairs account 
     alert('I need to handle these results now!')  
   }

   renderCardOnRoopairsConnection = () => {
     if(AccountDetailsModel.roopairsToken === 'failure'){
       return (
        <ConnectAccountCard connectAccountCallBack={() => this.handleConnectResults()}/>
       )
     }
     return(
        <AccountConnectedCard disconnectAccountCallBack={() => this.handleDisconnectResults()}/>
     )
   }

   render = () => {
     return(
      <ScrollView 
      style={{flex: 1}} 
      contentContainerStyle={MainAppStyles.assetLoadedContainer}
      directionalLockEnabled={true}
      automaticallyAdjustContentInsets={false}>
          <MainStackTitle 
          title='Account Settings'/>
          {this.renderCardOnRoopairsConnection()}
      </ScrollView>
     )
   }


}