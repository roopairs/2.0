import React from 'react';
import {View} from 'react-native';
import { NavigationSwitchProp } from 'react-navigation';
import { NavigationStackProp } from 'react-navigation-stack';

export const SingleViewComponent = <View style={{height: '25%', width: '25%', backgroundColor: 'black'}}/>;
export const navigationSwitchSpyFunction = jest.fn((arg?:string) => {return arg;});
export const navigationStackSpyFunction = jest.fn((arg?:any) => {return arg;});

export const mockSwitchNavigation: NavigationSwitchProp = {
    navigate: (routeNameOrOptions)=>{
      navigationSwitchSpyFunction(routeNameOrOptions);
      return true;
    },
    state: undefined,
    dispatch: undefined, 
    goBack: ()=> {
      navigationSwitchSpyFunction();
      return true;
    },
    dismiss: undefined, 
    getParam: undefined,
    setParams: undefined,
    emit: undefined, 
    addListener: undefined, 
    isFocused: undefined, 
    isFirstRouteInParent: undefined, 
    dangerouslyGetParent: undefined,
    jumpTo: undefined,
  };

  export const mockStackNavigation: NavigationStackProp = {
      navigate: (routeNameOrOptions)=>{
        navigationStackSpyFunction(routeNameOrOptions);
        return true;
      },
      state: undefined,
      dispatch: undefined, 
      goBack: ()=>{
        navigationStackSpyFunction();
        return true;
      },
      dismiss: undefined,
      getParam: undefined,
      setParams: undefined,
      emit: undefined, 
      addListener: undefined, 
      isFocused: undefined, 
      isFirstRouteInParent: undefined, 
      dangerouslyGetParent: undefined,
      push: (routeNameOrOptions)=>{
          navigationStackSpyFunction(routeNameOrOptions);
          return true;
      }, 
      replace:(routeNameOrOptions)=>{
          navigationStackSpyFunction(routeNameOrOptions);
          return true;
      }, 
      reset: (routeNameOrOptions)=>{
          navigationStackSpyFunction(routeNameOrOptions);
          return true;
      }, 
      pop: (routeNameOrOptions)=>{
          navigationStackSpyFunction(routeNameOrOptions);
          return true;
      }, 
      popToTop: (routeNameOrOptions)=>{
          navigationStackSpyFunction(routeNameOrOptions);
          return true;
      },
  };

  export const thinButtonFireEventTestId = {
    onClick: 'click-thin-button',
    onPress: 'click-thin-button',
  };