import React from 'react';
import { createAppContainer, SafeAreaView, withNavigation } from 'react-navigation';
import { createStackNavigator, NavigationStackConfig, NavigationStackOptions } from 'react-navigation-stack';
import {
    MainAppPages, AuthenticationPages,
} from 'src/Screens';
import { Platform } from 'react-native';
import { 
    AddNewPropertyModal, 
    EditPropertyModal, 
    LoggingInModal, 
    CreatingAccountModal, 
    AddApplianceModal, 
    EditApplianceModal, 
    EditTenantModal, 
    AddTenantModal,
    ServiceRequestModal,
} from 'homepairs-modals';
import { HomePairsHeader } from 'homepairs-components';
import { LightColorTheme } from 'homepairs-base-styles';
import { AccountTypes } from 'src/state/types';
import { NavigationRouteHandler } from 'homepairs-utilities';
import { navigationKeys, navigationPages } from './RouteConstants';

/** Set Up our configuration for the navigation routes */

// Give the homepairs header a navigation object so it can actually change pages as intended
const HomePairsHeaderWithNav = withNavigation(HomePairsHeader);

// Define the navigation configurations for all of the stacks 
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
                <HomePairsHeaderWithNav />
            </SafeAreaView>
        ) : <HomePairsHeaderWithNav />;
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

const propertyStackConfig = {
    initialRouteName: navigationPages.PropertiesScreen,
    ...innerStackConfig,
    mode: 'modal',
};

const serviceRequestStackConfig = {
    initialRouteName: navigationPages.ServiceRequestScreen,
    ...innerStackConfig,
    mode: 'modal',
};
const accountStackConfig = {
    initialRouteName: navigationPages.AccountSettings,
    ...innerStackConfig,
    mode: 'modal',
};

/** Define the Navigation Stacks now that our configuration is ready */
const PropertyStack = createStackNavigator(
    {
        [navigationKeys.PropertiesScreen]: MainAppPages.PropertyPages.PropertiesScreen,
        [navigationKeys.TenantProperty]: MainAppPages.PropertyPages.TenantPropertiesScreen,
        [navigationKeys.SingleProperty]: MainAppPages.PropertyPages.DetailedPropertyScreen,

        // [navigationKeys.EditPropertyModal]: EditPropertyModal,
        // [navigationKeys.AddApplianceModal]: AddApplianceModal, 
        // [navigationKeys.EditApplianceModal]: EditApplianceModal,
        // [navigationKeys.EditTenantModal]: EditTenantModal,
        // [navigationKeys.AddTenantModal]: AddTenantModal,
    },
    propertyStackConfig,
);

const ServiceRequestStack = createStackNavigator(
    {
      [navigationKeys.ServiceRequestScreen]: MainAppPages.ServiceRequestPages.ServiceRequestScreen, 
      [navigationKeys.NewRequest]: MainAppPages.ServiceRequestPages.NewRequestScreen,

      // [navigationKeys.ServiceRequestModal]: ServiceRequestModal,

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
const MainStack = createStackNavigator(
    {
        [navigationKeys.Properties]: PropertyStack,
        [navigationKeys.ServiceRequest]: ServiceRequestStack,
        [navigationKeys.Account]: AccountStack,

        [navigationKeys.AddNewPropertyModal]: AddNewPropertyModal,
        [navigationKeys.EditPropertyModal]: EditPropertyModal,
        [navigationKeys.AddApplianceModal]: AddApplianceModal, 
        [navigationKeys.EditApplianceModal]: EditApplianceModal,
        [navigationKeys.EditTenantModal]: EditTenantModal,
        [navigationKeys.AddTenantModal]: AddTenantModal,
        [navigationKeys.ServiceRequestModal]: ServiceRequestModal,

    },
    {
        initialRouteName: navigationKeys.Properties,
        ...navigationConfiguration,
    },
);

const AuthStack = createStackNavigator(
    {
        [navigationKeys.LoginScreen]: AuthenticationPages.LoginScreen,
        // [navigationKeys.LoggingInModal]: LoggingInModal,
        [navigationKeys.RoopairsLogin]: AuthenticationPages.RoopairsLogin,
        // [navigationKeys.RoopairsLoggingInModal]: LoggingInModal,
        [navigationKeys.SignUpScreen]: AuthenticationPages.SignUpScreen,
        // [navigationKeys.CreatingAccountModal]: CreatingAccountModal,
    },
    {
        initialRouteName: navigationKeys.LoginScreen,
        ...navigationConfiguration,
    },
);

// NOTE: All authentication modals should be defined at the highest parent navigator. This permits the modal to be replaced 
// from any page in the program. It is just safer to define all modals up here. 
const container = createStackNavigator(
    {
        [navigationKeys.Main]: MainStack,
        [navigationKeys.Auth]: AuthStack,
        [navigationKeys.LoginScreen]: AuthenticationPages.LoginScreen,
        [navigationKeys.RoopairsLogin]: AuthenticationPages.RoopairsLogin,
        [navigationKeys.SignUpScreen]: AuthenticationPages.SignUpScreen,
        [navigationKeys.CreatingAccountModal]: CreatingAccountModal,
        [navigationKeys.RoopairsLoggingInModal]: LoggingInModal,
        [navigationKeys.LoggingInModal]: LoggingInModal,
    },
    {
        initialRouteName: navigationKeys.Auth,
        ...navigationConfiguration,
    },
    
);

export const AppNavigator = createAppContainer(container);

/**
 * ----------------------------------------------------
 * ChooseMainPage
 * ----------------------------------------------------
 * This function navigates to a specific page based on the Account Type passed in.  
 * @param {AccountTypes} accountType - Type passed in
 * @param {NavigationRouteHandler} navigation -navigator passed from calling component */
function ChooseMainPage(accountType: AccountTypes, navigation: NavigationRouteHandler) {
    if(accountType === AccountTypes.Tenant){
      navigation.navigate(navigationPages.TenantProperty);
      return;
    }
    navigation.navigate(navigationPages.PropertiesScreen);  
}

export { MainStack, AuthStack, ChooseMainPage};
