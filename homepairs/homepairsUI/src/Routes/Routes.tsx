import React from 'react';
import {
  createAppContainer, 
  createSwitchNavigator,
} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {MainAppPages, LoadingScreen, AuthenticationPages} from 'homepair-pages';
import { View, Platform } from 'react-native';
import { HomePairsHeader, AddNewPropertyModal } from 'homepair-components';
import { MainAppStackType } from 'homepair-types';

export const MainAppStack : Array<MainAppStackType> = [
  { 
      title: 'Properties', 
      navigate: 'AccountProperties',
      key: 'Properties',
      button: 'Add Property',
      buttonAction: AddNewPropertyModal
  },
  { 
      title: 'Service Request', 
      navigate: 'ServiceRequest',
      key: 'ServiceRequest',
      button: 'Request Service'
  },
  {  
      title: 'Account Settings',
      navigate: 'Account',
      key: 'AccountSettings',
  },
  {
      title: 'Log Out',
      navigate: 'Auth',
      key: 'LogOut',
  }
]

const navigationHeader = () => ({
  header :
    <View style={{backgroundColor: '#1177B0'}}>
      <HomePairsHeader />
    </View>,
  headerStyle: {
    backgroundColor: '#f4511e',
  },
  gesturesEnabled: false,
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
    
  const innerStackConfigMobile: any = { 
    headerMode: 'none',
    defaultNavigationOptions: {
      gesturesEnabled: true,
    }
  }

  /**
   * There seems to be a bug on the the navigationStack for web. 
   * It does not properly render a header to none but the entire page. 
   * This is the current workaround
   */
  const innerStackConfigWeb:any = {
    defaultNavigationOptions: {
      headerStyle: {
        height: 0,
        width: 0,
      },
    },
  }

  const propertyStackConfig = {
    initialRouteName : 'AccountProperties',  
  ...(Platform.OS === 'web' ? innerStackConfigWeb : innerStackConfigMobile)}

  const serviceRequestStackConfig = {
    initialRouteName : 'ServiceRequest',  
  ...(Platform.OS === 'web' ? innerStackConfigWeb : innerStackConfigMobile)}

  const accountStackConfig = {
    initialRouteName : 'Account',  
  ...(Platform.OS === 'web' ? innerStackConfigWeb : innerStackConfigMobile)}
  
  const PropertyStack = createStackNavigator({AccountProperties: MainAppPages.PropertyPages.PropertiesScreen,
     DetailedProperty: MainAppPages.PropertyPages.DetailedPropertyScreen}, propertyStackConfig);
  const ServiceRequestStack = createStackNavigator(
    {ServiceRequest: MainAppPages.ServiceRequestPages.ServiceRequestScreen}, 
    serviceRequestStackConfig);
  const AccountStack = createStackNavigator(
    {Account: MainAppPages.AccountPages.AccountScreen},
    accountStackConfig)
  
  const MainStack = createStackNavigator({Properties: PropertyStack, ServiceRequest: ServiceRequestStack, Account: AccountStack}, mainStackConfig);
  const AuthStack = createSwitchNavigator({ Login: AuthenticationPages.LoginScreen, SignUp: AuthenticationPages.SignUpScreen, Connect: AuthenticationPages.RoopairsLogin},  authStackConfig);
  
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