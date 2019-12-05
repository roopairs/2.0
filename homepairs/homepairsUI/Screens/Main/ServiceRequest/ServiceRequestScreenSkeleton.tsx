import React from 'react'; //**For every file that uses jsx, YOU MUST IMPORT REACT  */
import { ScrollView } from 'react-native';
import { MainAppStyles } from '../MainAppStyles';
import MainStackTitle from '../../../Components/MainAppComponents/MainStackTitle';


interface ServiceRequestScreenSkeletonProps {}

export default abstract class ServiceRequestScreenSkeleton extends React.Component<ServiceRequestScreenSkeletonProps> {
  /**
   * TODO: Insert any logic for the Properties pages. These pages will need to be divided since our header 
   * responds differently based on the OS. Web will hold a side menu, where IOS and Android navigate differntly. 
   * In order to keep very similar code base, we will simply add any functionality shared between the three 
   * classes here. 
   * */

  presentNewRequestModal = (arg0?:any) => {
    //TODO: Present Modal for new Request
    alert('I need to open a modal Page')
  }

  render = () => {
    return(
     <ScrollView 
     style={{flex: 1}} 
     contentContainerStyle={MainAppStyles.assetLoadedContainer}
     directionalLockEnabled={true}
     automaticallyAdjustContentInsets={false}>
         <MainStackTitle 
         title='Service Requests'
         buttonTitle='New Request'
         onButtonPress={this.presentNewRequestModal}
         />
         {/**TODO: Add Components for Service Requests Screen */}
     </ScrollView>
    )
  }
}