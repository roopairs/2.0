import React from "react";
import { 
  View, 
  ActivityIndicator, 
  StatusBar, 
  StyleSheet, 
} from "react-native";
import { LoadFonts } from 'homepair-fonts';
import { NavigationInjectedProps } from 'react-navigation';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default class AuthLoadingScreen extends React.Component<NavigationInjectedProps> {
    constructor(props: NavigationInjectedProps) {
      super(props);
      this.loadAssets();
    }
  
    // Fetch the token from storage then navigate to our appropriate place
    bootstrapAsync = async () => {
      const {navigation} = this.props;
      // TODO: Implement UserTOKEN in STORAGE ITEM const userToken = await AsyncStorage.getItem('userToken');
      
      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      navigation.navigate('Auth');// userToken ? 'App' : 'Auth');
    };

    async loadAssets(){
      await LoadFonts();
      this.bootstrapAsync();
  }

  
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


  