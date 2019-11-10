import React from 'react'; //**For every file that uses jsx, YOU MUST IMPORT REACT  */
import { StyleSheet, Text, View, StatusBar, ActivityIndicator, Button } from 'react-native';
import {NavigationProps} from '../../../utility/NavigationProps'



export default class HomeScreen extends React.Component<NavigationProps> {
  static navigationOptions = {
    title: 'HomePairs',
  };

  render() {
    return (
      <View style={styles.container}>

      </View>
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