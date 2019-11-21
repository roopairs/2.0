import React from 'react'; //**For every file that uses jsx, YOU MUST IMPORT REACT  */
import { StyleSheet, Text, View, SafeAreaView, ScrollView, StatusBar, ActivityIndicator, Button } from 'react-native';
import {NavigationProps} from '../../../utility/NavigationProps'
import {MainAppStyles} from '../MainAppStyles'
import HomePairsHeaderTemplate from '../../../Components/Navigation/HomePairsHeader/HomePairsHeaderTemplate'
import { createSwitchNavigator } from 'react-navigation';
import MainScreen from '../MainScreen';
import HomePairsHeader from '../../../Components/Navigation/HomePairsHeader/HomePairsHeader.web';


export default class ServiceRequestScreen extends MainScreen {  
  render() {
    return(
        <SafeAreaView style={MainAppStyles.pallet}>
            <ScrollView 
            style={{flex: 1}} 
            contentContainerStyle={MainAppStyles.assetLoadedContainer}
            directionalLockEnabled={true}
            automaticallyAdjustContentInsets={false}>
                <Text style={styles.container}>Service Request</Text>
            </ScrollView>
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