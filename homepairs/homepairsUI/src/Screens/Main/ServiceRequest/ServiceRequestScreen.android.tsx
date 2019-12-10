import React from 'react'; //**For every file that uses jsx, YOU MUST IMPORT REACT  */
import { StyleSheet, Text, View, ScrollView} from 'react-native';
import {MainAppStyles} from '../MainAppStyles';
import MainScreen from '../MainScreen';
//import HomePairsHeader from '../../../Components/Navigation/HomePairsHeader/HomePairsHeader';
import ServiceRequestScreenSkeleton from './ServiceRequestScreenSkeleton';

export default class ServiceRequestScreen extends MainScreen {

  /*
static navigationOptions = (navigation) => ({
    header :<View style={{backgroundColor: '#1177B0'}}>
    <HomePairsHeader navigation={navigation.navigation} currentPage={1}/></View>,
    headerStyle: {
      backgroundColor: '#f4511e',
    },
  });*/
  
  renderContents = () => {
    return(
        <View style={MainAppStyles.pallet}>
          <ServiceRequestScreenSkeleton />
        </View>
    );
  }
}