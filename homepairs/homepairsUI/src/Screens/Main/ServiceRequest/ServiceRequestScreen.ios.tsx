import React from 'react'; //**For every file that uses jsx, YOU MUST IMPORT REACT  */
import { StyleSheet, Text, SafeAreaView, ScrollView } from 'react-native';
import {MainAppStyles} from '../MainAppStyles';
import MainScreen from '../MainScreen';
import ServiceRequestScreenSkeleton from './ServiceRequestScreenSkeleton';

export default class ServiceRequestScreen extends MainScreen {
  renderContents = () => {
    return(
        <SafeAreaView style={MainAppStyles.pallet}>
          <ServiceRequestScreenSkeleton />
        </SafeAreaView>
    );
  }
}