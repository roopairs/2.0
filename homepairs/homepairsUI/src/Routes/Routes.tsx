import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import PropertiesScreen from '../Screens/Main/Properties/PropertiesScreen/PropertiesScreen';
import LoadingScreen from '../Screens/LoadingScreen';
import SignUpScreen from '../Screens/Auth/SignUpScreen/SignUpScreen';
import LoginScreen from '../Screens/Auth/LoginScreen/LoginScreen';
import ServiceRequestScreen from '../Screens/Main/ServiceRequest/ServiceRequestScreen';
import { View, Platform } from 'react-native';
import HomePairsHeader from '../Components/Navigation/HomePairsHeader/HomePairsHeader';
import React from 'react'
import AccountScreen from '../Screens/Main/Account/AccountScreen';
import DetailedPropertyScreen from '../Screens/Main/Properties/DetailedPropertiesScreen/DetailedPropertyScreen';

const navigationHeader = (navigation: any) => ({
  header :
    <View style={{backgroundColor: '#1177B0'}}>
      <HomePairsHeader navigation={navigation.navigation}/>
    </View>,
  headerStyle: {
    backgroundColor: '#f4511e',
  },
})

const authStackConfig = {
    defaultNavigationOptions: {
      headerTintColor: '#fff',
      headerStyle: {
        backgroundColor: '#000',
      },
      headerShown: false,
    }
  }
  
  const mainStackConfig: any = {
    defaultNavigationOptions: navigationHeader,
    initialRouteName: 'Properties',
  }
    
  const propertyStackConfigMobile: any = { 
    headerMode: 'none',
  }

  /**
   * There seems to be a bug on the the navigationStack for web. 
   * It does not properly render a header to none but the entire page. 
   * This is the current workaround
   */
  const propertyStackConfigWeb:any = {
    defaultNavigationOptions: {
      headerStyle: {
        height: 0,
        width: 0,
      },
    },
  }

  const propertyStackConfig = {
    initialRouteName : 'AccountProperties',  
  ...(Platform.OS === 'web' ? propertyStackConfigWeb : propertyStackConfigMobile)}
  
  const PropertyStack = createStackNavigator({AccountProperties: PropertiesScreen, DetailedProperty: DetailedPropertyScreen}, propertyStackConfig);
  const MainStack = createStackNavigator({Properties: PropertyStack, ServiceRequest: ServiceRequestScreen, Account: AccountScreen}, mainStackConfig);
  const AuthStack = createSwitchNavigator({ Login: LoginScreen, SignUp: SignUpScreen},  authStackConfig);
  export default createAppContainer(createSwitchNavigator(
    {
      Main: MainStack,
      Auth: AuthStack,
      Loading: LoadingScreen,
    },
    {
      initialRouteName: 'Loading',
    }
  ));
  export {MainStack, AuthStack}