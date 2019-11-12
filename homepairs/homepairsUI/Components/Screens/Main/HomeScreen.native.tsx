import React from 'react'; //**For every file that uses jsx, YOU MUST IMPORT REACT  */
import { StyleSheet, Text, View, SafeAreaView, ScrollView, StatusBar, ActivityIndicator, Button } from 'react-native';
import {NavigationProps} from '../../../utility/NavigationProps'
import {MainAppStyles} from './MainAppStyles'
import {Card} from 'react-native-elements'

export default class HomeScreen extends React.Component<NavigationProps> {
  static navigationOptions = {
    title: 'HomePairs',
    headerTitleStyle: MainAppStyles.homePairsTitle,
    headerStyle: MainAppStyles.homePairsNavHeader,
    //headerRight: <Button onPress={() => this.props.navigation.navigate('DrawerOpen')} title= "=" />
  };

  render() {
    return(
        <SafeAreaView style={MainAppStyles.pallet}>
            <ScrollView 
            style={{flex: 1}} 
            contentContainerStyle={MainAppStyles.assetLoadedContainer}
            directionalLockEnabled={true}
            automaticallyAdjustContentInsets={false}>
            </ScrollView>
        </SafeAreaView>
    );
}
  _signOutAsync = () => {
    this.props.navigation.navigate('Auth');
  };
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });