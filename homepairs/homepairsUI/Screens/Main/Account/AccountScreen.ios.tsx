import React from 'react'; //**For every file that uses jsx, YOU MUST IMPORT REACT  */
import {SafeAreaView, View,} from 'react-native';
import {MainAppStyles} from '../MainAppStyles';
import MainScreen from '../MainScreen';
import AccountScreenSkeleton from './AccountScreenSkeleton';

export default class AccountScreen extends MainScreen {
  renderContents = () => {
    return(
      <View style={MainAppStyles.container}>
        <SafeAreaView style={MainAppStyles.pallet}>
            <AccountScreenSkeleton/>
        </SafeAreaView>
      </View>
    );
  }
}