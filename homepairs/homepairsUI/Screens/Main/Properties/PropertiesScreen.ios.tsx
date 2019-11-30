import React from 'react'; //**For every file that uses jsx, YOU MUST IMPORT REACT  */
import { StyleSheet, Text, SafeAreaView, ScrollView } from 'react-native';
import { MainAppStyles } from '../MainAppStyles';
import MainScreen from '../MainScreen';
import PropertiesScreenSkeleton from './PropertiesScreenSkeleton';

export default class PropertiesScreen extends MainScreen {
  renderContents = () => {
      return(
          <SafeAreaView style={MainAppStyles.pallet}>
              <PropertiesScreenSkeleton />
          </SafeAreaView>
      );
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
});