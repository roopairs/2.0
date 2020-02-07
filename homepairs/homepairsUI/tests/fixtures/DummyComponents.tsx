import React from 'react';
import {View} from 'react-native';
import { NavigationSwitchProp } from 'react-navigation';

export const SingleViewComponent = <View style={{height: '25%', width: '25%', backgroundColor: 'black'}}/>;
const navSpyFunction = jest.fn((arg:string) => {return arg;});

export const mockNavigation: NavigationSwitchProp = {
    navigate: (routeNameOrOptions)=>{
      navSpyFunction(routeNameOrOptions);
      return true;
    },
    state: undefined,
    dispatch: undefined, 
    goBack: undefined,
    dismiss: undefined,
    openDrawer:undefined,
    closeDrawer: undefined, 
    toggleDrawer: undefined, 
    getParam: undefined,
    setParams: undefined,
    emit: undefined, 
    addListener: undefined, 
    isFocused: undefined, 
    isFirstRouteInParent: undefined, 
    dangerouslyGetParent: undefined,
    jumpTo: undefined,
  };

  export const mockNavigation: NavigationStackProp = {
    navigate: (routeNameOrOptions)=>{
      navSpyFunction(routeNameOrOptions);
      return true;
    },
    state: undefined,
    dispatch: undefined, 
    goBack: undefined,
    dismiss: undefined,
    openDrawer:undefined,
    closeDrawer: undefined, 
    toggleDrawer: undefined, 
    getParam: undefined,
    setParams: undefined,
    emit: undefined, 
    addListener: undefined, 
    isFocused: undefined, 
    isFirstRouteInParent: undefined, 
    dangerouslyGetParent: undefined,
    jumpTo: undefined,
  };