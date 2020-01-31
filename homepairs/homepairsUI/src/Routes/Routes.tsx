import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import {
    MainAppPages,
    LoadingScreen,
    AuthenticationPages,
} from 'homepairs-pages';
import { View } from 'react-native';
import { HomePairsHeader } from 'homepairs-components';
import { AccountTypes } from 'homepairs-types';

const navigationHeader = () => ({
    header: () => {
        return (
            <View style={{ backgroundColor: '#1177B0', flex: 1 }}>
                <HomePairsHeader />
            </View>
        );
    },
    headerStyle: {
        backgroundColor: '#f4511e',
    },
});

const authStackConfig = {
    defaultNavigationOptions: {
        headerTintColor: '#fff',
        headerStyle: {
            backgroundColor: '#000',
        },
        headerShown: false,
    },
};

const mainStackConfig: any = {
    defaultNavigationOptions: navigationHeader,
    initialRouteName: 'Properties',
};

const innerStackConfig: any = {
    headerMode: 'none',
    defaultNavigationOptions: {
        gestureEnabled: false,
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
        TenantProperties: MainAppPages.PropertyPages.TenantPropertiesScreen,
        DetailedProperty: MainAppPages.PropertyPages.DetailedPropertyScreen,
    },
    propertyStackConfig,
);
const ServiceRequestStack = createStackNavigator(
  {ServiceRequest: MainAppPages.ServiceRequestPages.ServiceRequestScreen, NewRequest: MainAppPages.ServiceRequestPages.NewRequestScreen}, 
  serviceRequestStackConfig);
const AccountStack = createStackNavigator(
  {Account: MainAppPages.AccountPages.AccountScreen},
  accountStackConfig);

export function ChooseMainPage(accountType: AccountTypes = AccountTypes.Tenant, navigation: any) {
  accountType === AccountTypes.Landlord ? 
  navigation.navigate('AccountProperties') : 
  navigation.navigate('TenantProperties')
}

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
