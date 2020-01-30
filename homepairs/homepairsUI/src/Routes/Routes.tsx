import React from 'react';
import { createAppContainer, createSwitchNavigator, SafeAreaView } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import {
    MainAppPages,
    LoadingScreen,
    AuthenticationPages,
} from 'homepairs-pages';
import { Platform } from 'react-native';
import { HomePairsHeader } from 'homepairs-components';
import { LightColorTheme} from 'homepairs-base-styles';


// TODO: Render navigation header for andriod devices!!!
const navigationHeader = () => ({
    header: () => {
        return !(Platform.OS === 'android') ? (
            <SafeAreaView style={{ backgroundColor: LightColorTheme.primary, flex: 1 }}>
                <HomePairsHeader />
            </SafeAreaView>
        ) : <HomePairsHeader />;
    },
    headerStyle: {
        backgroundColor: LightColorTheme.primary,
    },
    gestureEnabled: true,
});

const authStackConfig = {
    defaultNavigationOptions: {
        headerTintColor: '#fff',
        headerStyle: {
            backgroundColor: LightColorTheme.primary,
        },
        headerShown: false,
        gestureEnabled: true,
    },
};

const mainStackConfig: any = {
    defaultNavigationOptions: navigationHeader,
    initialRouteName: 'Properties',
};

const innerStackConfig: any = {
    headerMode: 'none',
    defaultNavigationOptions: {
        gestureEnabled: true,
    },
};

// These should be separated into different files for each Route (AccountProperties, Service Request, Account)
const propertyStackConfig = {
    initialRouteName: 'AccountProperties',
    ...innerStackConfig,
};

const serviceRequestStackConfig = {
    initialRouteName: 'ServiceRequest',
    ...innerStackConfig,
};

const accountStackConfig = {
    initialRouteName: 'Account',
    ...innerStackConfig,
};

const PropertyStack = createStackNavigator(
    {
        AccountProperties: MainAppPages.PropertyPages.PropertiesScreen,
        DetailedProperty: MainAppPages.PropertyPages.DetailedPropertyScreen,
    },
    propertyStackConfig,
);
const ServiceRequestStack = createStackNavigator(
    {
        ServiceRequest: MainAppPages.ServiceRequestPages.ServiceRequestScreen,
        NewRequest: MainAppPages.ServiceRequestPages.NewRequestScreen,
    },
    serviceRequestStackConfig,
);
const AccountStack = createStackNavigator(
    { Account: MainAppPages.AccountPages.AccountScreen },
    accountStackConfig,
);

/*
 * injects navigator objects into all these pages; if you make a new page that needs a navigator, add it to this stack
 * (example: SignUp navigates to SignUpScreen [syntax: SignUp: AuthenticationPages.SignUpScreen])
 */
const MainStack = createStackNavigator(
    {
        Properties: PropertyStack,
        ServiceRequest: ServiceRequestStack,
        Account: AccountStack,
    },
    mainStackConfig,
);
const AuthStack = createSwitchNavigator(
    {
        Login: AuthenticationPages.LoginScreen,
        SignUp: AuthenticationPages.SignUpScreen,
        Connect: AuthenticationPages.RoopairsLogin,
    },
    authStackConfig,
);

export const AppNavigator = createAppContainer(
    createSwitchNavigator(
        {
            Main: MainStack,
            Auth: AuthStack,
            Loading: LoadingScreen,
        },
        {
            initialRouteName: 'Loading',
        },
    ),
);
export { MainStack, AuthStack };
