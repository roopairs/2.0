import React from "react";
import { AsyncStorage, View, ActivityIndicator, StatusBar, StyleSheet } from "react-native";
import * as Font from 'expo-font';
import {NavigationProps} from '../utility/NavigationProps'


export default class AuthLoadingScreen extends React.Component<NavigationProps> {
    constructor(props) {
      super(props);
      this.state = { 
        assetsLoaded: false, 
      };
      this.loadAssets();
    }
  
    async loadAssets(){
        await Font.loadAsync({ //Every Assest not found in native devices, load them here!!
            'nunito-regular' : require('../assets/fonts/Nunito-Regular.ttf')
        });
        this.setState({assetsLoaded: true});
        this._bootstrapAsync()
    }

    // Fetch the token from storage then navigate to our appropriate place
    _bootstrapAsync = async () => {
      //TODO: Implement UserTOKEN in STORAGE ITEM const userToken = await AsyncStorage.getItem('userToken');
      
      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      this.props.navigation.navigate('Auth')//userToken ? 'App' : 'Auth');
    };
  
    // Render any loading content that you like here
    render() {
      return (
        <View style={styles.container}>
          <ActivityIndicator />
          <StatusBar barStyle="default" />
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

  