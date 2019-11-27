import React from 'react'; //**For every file that uses jsx, YOU MUST IMPORT REACT  */
import { StyleSheet, Text, View, ScrollView} from 'react-native';
import {MainAppStyles} from '../MainAppStyles';
import MainScreen from '../MainScreen';
import HomePairsHeader from '../../../Components/Navigation/HomePairsHeader/HomePairsHeader';

export default class PropertiesScreen extends MainScreen {
  
  /**
   * Unlike IOS, we actually have to define the instance of our header for every page. 
   * This is due to the behavior of Android Navigation. It navigates using fragements and activitys 
   * and these pages are remained unchanged until removed  */
  static navigationOptions = (navigation) => ({
    header :<View style={{backgroundColor: '#1177B0'}}>
    <HomePairsHeader navigation={navigation.navigation} currentPage={0}/></View>,
    headerStyle: {
      backgroundColor: '#f4511e',
    },
  });

  render() {
    return(
        <View style={MainAppStyles.pallet}>
            <ScrollView 
            style={{flex: 1}} 
            contentContainerStyle={MainAppStyles.assetLoadedContainer}
            directionalLockEnabled={true}
            automaticallyAdjustContentInsets={false}>
                <Text style={styles.container}>Properties</Text>
            </ScrollView>
        </View>
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