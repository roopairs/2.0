import React from 'react'; //**For every file that uses jsx, YOU MUST IMPORT REACT  */
import {View} from 'react-native';
import {MainAppStyles} from '../MainAppStyles';
import MainScreen from '../MainScreen';
//import HomePairsHeader from '../../../Components/Navigation/HomePairsHeader/HomePairsHeader';
import AccountScreenSkeleton from './AccountScreenSkeleton';

export default class AccountScreen extends MainScreen {
  
  /**
   * Unlike IOS or Web, we actually have to define the instance of our header for every page. 
   * This is due to the behavior of Android Navigation. It navigates using fragements and activitys 
   * and these pages are remained unchanged until removed
  static navigationOptions = (navigation) => ({
    header :<View style={{backgroundColor: '#1177B0'}}>
    <HomePairsHeader navigation={navigation.navigation} currentPage={2}/></View>,
    headerStyle: {
      backgroundColor: '#f4511e',
    },
  });  */

  renderContents = () => {
    return(
      <View style={MainAppStyles.container}>
        <View style={MainAppStyles.pallet}>
            <AccountScreenSkeleton />
        </View>
      </View>
    );
  }
}