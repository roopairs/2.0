import React from 'react'; //**For every file that uses jsx, YOU MUST IMPORT REACT  */
import {ScrollView } from 'react-native';
import {MainAppStyles} from '../MainAppStyles';
import MainStackTitle from '../../../Components/MainAppComponents/MainStackTitle';
import ConnectAccountCard from '../../../Components/MainAppComponents/ConnectAccountCard';

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

   render = () => {
     return(
      <ScrollView 
      style={{flex: 1}} 
      contentContainerStyle={MainAppStyles.assetLoadedContainer}
      directionalLockEnabled={true}
      automaticallyAdjustContentInsets={false}>
          <MainStackTitle 
          title='Account Settings'/>
          <ConnectAccountCard connectAccountCallBack={() => this.handleConnectResults()}/>
          {/**TODO: Show Account Information for when connected to Roopairs Account*/}
      </ScrollView>
     )
   }


}