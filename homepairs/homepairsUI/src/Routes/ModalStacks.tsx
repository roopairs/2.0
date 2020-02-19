import React from 'react';
import { createStackNavigator, NavigationStackConfig, NavigationStackOptions} from 'react-navigation-stack';
import {
    MainAppPages,
    AuthenticationPages,
} from 'homepairs-pages';
import {AddNewPropertyModal, EditPropertyModal, LoggingInModal, CreatingAccountModal, HomePairsHeader} from 'homepairs-components';
import { navigationKeys } from './RouteConstants';
import { LightColorTheme } from 'res/Styles/base';
import { SafeAreaView, Platform } from 'react-native';

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

const ModalStack = createStackNavigator({
    [navigationKeys.AddNewPropertyModal]: AddNewPropertyModal,
    [navigationKeys.EditPropertyModal]: EditPropertyModal,
},
{
    ...navigationConfiguration,
});


const SignInStack = createStackNavigator({
    [navigationKeys.LoginScreen]: AuthenticationPages.LoginScreen,
    [navigationKeys.LoggingInModal]: LoggingInModal,
},
{
    ...navigationConfiguration,
});

const SignUpStack = createStackNavigator({
    [navigationKeys.SignUpScreen]: AuthenticationPages.SignUpScreen,
    [navigationKeys.CreatingAccountModal]: CreatingAccountModal,
},
{
    ...navigationConfiguration,
});

const RoopairsSignInStack = createStackNavigator({
    [navigationKeys.RoopairsLogin]: AuthenticationPages.RoopairsLogin,
    [navigationKeys.RoopairsLoggingInModal]: LoggingInModal,
},
{
    ...navigationConfiguration,
});

export {AccountPropertiesStack, SinglePropertyStack, SignInStack, SignUpStack, RoopairsSignInStack, ModalStack};