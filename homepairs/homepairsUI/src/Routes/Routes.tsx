import React from 'react';

import {createBrowserApp} from '@react-navigation/web';
import { createAppContainer, createSwitchNavigator, SafeAreaView } from 'react-navigation';
import { createStackNavigator, NavigationStackConfig, NavigationStackOptions } from 'react-navigation-stack';
import {
    MainAppPages,
} from 'homepairs-pages';
import { Platform } from 'react-native';
import { HomePairsHeader, AddNewPropertyModal, EditPropertyModal} from 'homepairs-components';
import { LightColorTheme} from 'homepairs-base-styles';
import { navigationKeys } from './RouteConstants';
import {AccountPropertiesStack, SinglePropertyStack, SignUpStack, SignInStack, RoopairsSignInStack, ModalStack}from './ModalStacks'; 

const isWeb = Platform.OS === 'web';

const defaultNavigationOptions: NavigationStackOptions = {
    cardOverlayEnabled: true,
    cardStyle: { 
        backgroundColor: 'rgba(0,0,0,.4)',
     },
    gestureEnabled: false,
};

const modalStackConfig: NavigationStackConfig = {
    mode: 'modal',
    headerMode: 'none',
};

const navigationConfiguration = {
    defaultNavigationOptions,
    ...modalStackConfig,
};


// TODO: Render navigation header for andriod devices!!!
const navigationHeader = () => ({
    header: () => {
        return Platform.OS === 'ios' ? (
            <SafeAreaView style={{ backgroundColor: LightColorTheme.primary, flex: 1 }}>
                <HomePairsHeader />
            </SafeAreaView>
        ) : <HomePairsHeader />;
    },
    headerStyle: {
        backgroundColor: LightColorTheme.primary,
    },
    headerMode: 'float',
    gestureEnabled: true,
});


const mainStackConfig: any = {
    // defaultNavigationOptions: navigationHeader,
    headerMode: 'none',
    initialRouteName: navigationKeys.Properties,
    animationEnabled:false,
    transitionConfig: () => ({
        transitionSpec: {
          duration:0,
          timing: 0,
        },
    }),
    mode: 'modal',
};

const innerStackConfig: any = {
    defaultNavigationOptions: navigationHeader,
    animationEnabled:false,
};

// These should be separated into different files for each Route (AccountProperties, Service Request, Account)
const propertyStackConfig = {
    initialRouteName: navigationKeys.AccountProperties,
    ...innerStackConfig,
};

const serviceRequestStackConfig = {
    initialRouteName: navigationKeys.ServiceRequest,
    ...innerStackConfig,
};
const accountStackConfig = {
    initialRouteName: navigationKeys.Account,
    ...innerStackConfig,
};

const PropertyStack = createStackNavigator(
    {
        [navigationKeys.AccountProperties]: AccountPropertiesStack,
        [navigationKeys.TenantProperties]: MainAppPages.PropertyPages.TenantPropertiesScreen,
        [navigationKeys.DetailedProperty]: SinglePropertyStack,
    },
    propertyStackConfig,
);
const ServiceRequestStack = createStackNavigator(
    {
      [navigationKeys.ServiceRequest]: MainAppPages.ServiceRequestPages.ServiceRequestScreen, 
      [navigationKeys.NewRequest]: MainAppPages.ServiceRequestPages.NewRequestScreen,
    }, 
  serviceRequestStackConfig);
const AccountStack = createStackNavigator(
    {
        [navigationKeys.Account]: MainAppPages.AccountPages.AccountScreen,
    },
  accountStackConfig);


/**
 * If you wish to add a modal to the stack, do so HERE!
 * TODO: Refactor the routes modules to be cleaner!!
 */
const MainStack = createStackNavigator(
    {
        [navigationKeys.Properties]: PropertyStack,
        [navigationKeys.ServiceRequest]: ServiceRequestStack,
        [navigationKeys.Account]: AccountStack,
        [navigationKeys.AddNewPropertyModal]: AddNewPropertyModal,
        [navigationKeys.EditPropertyModal]: EditPropertyModal,
    },
    navigationConfiguration,
);

const AuthStack = createSwitchNavigator(
    {
        [navigationKeys.Login]: SignInStack,
        [navigationKeys.SignUp]: SignUpStack,
        [navigationKeys.Connect]: RoopairsSignInStack,
    },
);

const container = createStackNavigator(
    {
        [navigationKeys.Main]: MainStack,
        [navigationKeys.Auth]: AuthStack,
    },
    {
        initialRouteName: navigationKeys.Auth,
        headerMode: 'none',
    },
    
);


export const AppNavigator = isWeb ? createBrowserApp(container): createAppContainer(container);

export { MainStack, AuthStack };
