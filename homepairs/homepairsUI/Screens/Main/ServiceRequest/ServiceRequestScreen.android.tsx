import React from 'react'; //**For every file that uses jsx, YOU MUST IMPORT REACT  */
import { StyleSheet, Text, View, ScrollView} from 'react-native';
import {MainAppStyles} from '../MainAppStyles';
import MainScreen from '../MainScreen';
import HomePairsHeader from '../../../Components/Navigation/HomePairsHeader/HomePairsHeader';

export default class ServiceRequestScreen extends MainScreen {

static navigationOptions = (navigation) => ({
    header :<View style={{backgroundColor: '#1177B0'}}>
    <HomePairsHeader navigation={navigation.navigation} currentPage={1}/></View>,
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
                <Text style={styles.container}>Service Request</Text>
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