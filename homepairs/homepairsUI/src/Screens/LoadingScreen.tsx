import React from "react";
import { 
  View, 
  ActivityIndicator, 
  StatusBar, 
  StyleSheet, 
} from "react-native";
import { LoadFonts } from 'homepair-fonts';
import { NavigationStackScreenProps } from 'react-navigation-stack';


export default class AuthLoadingScreen extends React.Component<NavigationStackScreenProps> {
    constructor(props) {
      super(props);
      this.state = { 
        assetsLoaded: false, 
      };
      this.loadAssets();
    }
  

    async loadAssets(){
        await LoadFonts();
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

  