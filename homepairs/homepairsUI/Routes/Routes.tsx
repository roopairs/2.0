import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createDrawerNavigator} from 'react-navigation-drawer';
import {createStackNavigator} from 'react-navigation-stack';
import PropertiesScreen from '../Screens/Main/Properties/PropertiesScreen';
import LoadingScreen from '../Screens/LoadingScreen';
import SignUpScreen from '../Screens/Auth/SignUpScreen/SignUpScreen';
import LoginScreen from '../Screens/Auth/LoginScreen/LoginScreen';
import {CustomDrawerNavigation} from '../Components/Navigation/HomePairsHeader/HomePairsHeaderMenu/HomePairsHeaderMenu.web';
import HomePairsHeaderTemplate from '../Components/Navigation/HomePairsHeader/HomePairsHeaderTemplate';
import ServiceRequestScreen from '../Screens/Main/ServiceRequest/ServiceRequestScreen';
import { Platform, View } from 'react-native';
import HomePairsHeader from '../Components/Navigation/HomePairsHeader/HomePairsHeader';
import React from 'react'

const navigationHeader = (navigation: any) => ({
  header :<View style={{backgroundColor: '#1177B0'}}>
  <HomePairsHeader navigation={navigation.navigation}/></View>,
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
  
  const headerConfig = {
    defaultNavigationOptions: navigationHeader,
    initialRouteName: 'Properties',
  }

  const webConfig ={
    initialRouteName: 'Properties',
    drawerType: 'front',
    drawerPosition: 'left',
    drawerBackgroundColor: 'orange',
    contentComponent: navigationHeader,
    drawerWidth: '20%',
  }
  
  const mainStackConfig = headerConfig//(Platform.OS === 'web') ? webConfig : nativeConfig   
  
  const MainStack = createStackNavigator({Properties: PropertiesScreen, ServiceRequest: ServiceRequestScreen}, mainStackConfig);
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