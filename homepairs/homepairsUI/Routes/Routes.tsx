import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import PropertiesScreen from '../Screens/Main/Properties/PropertiesScreen';
import LoadingScreen from '../Screens/LoadingScreen';
import SignUpScreen from '../Screens/Auth/SignUpScreen/SignUpScreen';
import LoginScreen from '../Screens/Auth/LoginScreen/LoginScreen';
import ServiceRequestScreen from '../Screens/Main/ServiceRequest/ServiceRequestScreen';
import { View } from 'react-native';
import HomePairsHeader from '../Components/Navigation/HomePairsHeader/HomePairsHeader';
import React from 'react'
import AccountScreen from '../Screens/Main/Account/AccountScreen';
import DetailedPropertyScreen from '../Screens/Main/Properties/DetailedPropertyScreen';

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
  
  const mainStackConfig = {
    defaultNavigationOptions: navigationHeader,
    initialRouteName: 'Properties',
  }
    
  const propertyStackConfig = {
    //defaultNavigationOptions: navigationHeader,
    initialRouteName: 'AccountProperties',
  }
  const PropertyStack = createSwitchNavigator({AccountProperties: PropertiesScreen, DetailedProperty: DetailedPropertyScreen}, propertyStackConfig);
  const MainStack = createStackNavigator({Properties: PropertyStack, ServiceRequest: ServiceRequestScreen, Account: AccountScreen}, mainStackConfig);
  //const MainStack = createStackNavigator({Properties: PropertiesScreen, ServiceRequest: ServiceRequestScreen, Account: AccountScreen}, mainStackConfig);
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