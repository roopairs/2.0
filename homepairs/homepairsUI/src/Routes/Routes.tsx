import React from 'react';

import {createBrowserApp} from '@react-navigation/web';
import { createAppContainer, SafeAreaView, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator, NavigationStackConfig, NavigationStackOptions } from 'react-navigation-stack';
import {
    MainAppPages, AuthenticationPages,
} from 'homepairs-pages';
import { Platform } from 'react-native';
import { HomePairsHeader, AddNewPropertyModal, EditPropertyModal, LoggingInModal, CreatingAccountModal, AddApplianceModal, EditApplianceModal} from 'homepairs-components';
import { LightColorTheme} from 'homepairs-base-styles';
import { navigationKeys } from './RouteConstants';
import { navigationPages } from 'src/Routes/RouteConstants';

const isWeb = Platform.OS === 'web';

const defaultNavigationOptions: NavigationStackOptions = {
    cardOverlayEnabled: true,
    cardStyle: { 
        backgroundColor: 'rgba(0,0,0,.4)',
     },
    gestureEnabled: false,
    animationEnabled:false,
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
    gestureEnabled: false,
});

const innerStackConfig: any = {
    defaultNavigationOptions: navigationHeader,
    animationEnabled:false,
};

// These should be separated into different files for each Route (AccountProperties, Service Request, Account)
const propertyStackConfig = {
    initialRouteName: navigationPages.PropertiesScreen,
    ...innerStackConfig,
};

const serviceRequestStackConfig = {
    initialRouteName: navigationPages.ServiceRequestScreen,
    ...innerStackConfig,
};
const accountStackConfig = {
    initialRouteName: navigationPages.AccountSettings,
    ...innerStackConfig,
};

const PropertyStack = createStackNavigator(
    {
        [navigationKeys.PropertiesScreen]: MainAppPages.PropertyPages.PropertiesScreen,
        [navigationKeys.TenantProperty]: MainAppPages.PropertyPages.TenantPropertiesScreen,
        [navigationKeys.SingleProperty]: MainAppPages.PropertyPages.DetailedPropertyScreen,
    },
    propertyStackConfig,
);
const ServiceRequestStack = createStackNavigator(
    {
      [navigationKeys.ServiceRequestScreen]: MainAppPages.ServiceRequestPages.ServiceRequestScreen, 
      [navigationKeys.NewRequest]: MainAppPages.ServiceRequestPages.NewRequestScreen,
    }, 
  serviceRequestStackConfig);
const AccountStack = createStackNavigator(
    {
        [navigationKeys.AccountSettings]: MainAppPages.AccountPages.AccountScreen,
    },
  accountStackConfig);


/**
 * If you wish to add a modal to the stack, do so HERE!
 */
//
const MainStack = createStackNavigator(
    {
        [navigationKeys.Properties]: PropertyStack,
        [navigationKeys.ServiceRequest]: ServiceRequestStack,
        [navigationKeys.Account]: AccountStack,

        // Add all modals here. This way, the page will overlay the entire page including the header
        [navigationKeys.AddNewPropertyModal]: AddNewPropertyModal,
        [navigationKeys.EditPropertyModal]: EditPropertyModal,
        [navigationKeys.AddApplianceModal]: AddApplianceModal, 
        [navigationKeys.EditApplianceModal]: EditApplianceModal,
    },
    {
        initialRouteName: navigationKeys.Properties,
        ...navigationConfiguration,
    },
);

const AuthStack = createStackNavigator(
    {
        [navigationKeys.LoginScreen]: AuthenticationPages.LoginScreen,
        [navigationKeys.LoggingInModal]: LoggingInModal,
        [navigationKeys.RoopairsLogin]: AuthenticationPages.RoopairsLogin,
        [navigationKeys.RoopairsLoggingInModal]: LoggingInModal,
        [navigationKeys.SignUpScreen]: AuthenticationPages.SignUpScreen,
        [navigationKeys.CreatingAccountModal]: CreatingAccountModal,
    },
    {
        initialRouteName: navigationKeys.LoginScreen,
        ...navigationConfiguration,
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

export const AppNavigator = /* isWeb ? createBrowserApp(container): */ createAppContainer(container);

export { MainStack, AuthStack };
