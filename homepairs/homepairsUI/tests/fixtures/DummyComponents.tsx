import React from 'react';
import {View} from 'react-native';
import { NavigationSwitchProp } from 'react-navigation';
import { NavigationStackProp } from 'react-navigation-stack';
import { MainAppStackType, ApplianceType } from 'src/state/types';
import { navigationPages } from 'src/Routes/RouteConstants';

export const SingleViewComponent = <View style={{height: '25%', width: '25%', backgroundColor: 'black'}}/>;
export const navigationSwitchSpyFunction = jest.fn((arg?:string) => {return arg;});
export const navigationStackSpyFunction = jest.fn((arg?:any) => {return arg;});
export const navigationSetParamsSpyFunction = jest.fn((params?:any) => {return params;});
export const navigationGetParamsSpyFunction = jest.fn((params?:any) => {return params;});

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
    setParams: (params) => {
      navigationSetParamsSpyFunction(params);
      return true;
    },
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
      state: {
        key: 'iamatestkey',
        index: 1,
        routeName: 'Properties',
        routes: undefined,
        isTransitioning: false,
      },
      dispatch: undefined, 
      goBack: ()=>{
        navigationStackSpyFunction();
        return true;
      },
      dismiss: undefined,
      getParam: (param) => {
        navigationGetParamsSpyFunction(param);
        if(param === 'appliance') {
          return {
            applianceId: '123jh', 
            category: ApplianceType.HVAC, 
            manufacturer: 'Vulcan Equipment', 
            appName: 'Oven', 
            modelNum: 123, 
            serialNum: 321,
            location: 'Kitchen',
          };
        }
        return true;
      },
      setParams: (params) => {
        navigationSetParamsSpyFunction(params);
        return true;
      },
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

  export const mockStackNavigationFirstRoute: NavigationStackProp = {
    navigate: (routeNameOrOptions)=>{
      navigationStackSpyFunction(routeNameOrOptions);
      return true;
    },
    state: {
      key: 'iamatestkey',
      index: 0,
      routeName: 'Properties',
      routes: undefined,
      isTransitioning: false,
    },
    dispatch: undefined, 
    goBack: ()=>{
      navigationStackSpyFunction();
      return true;
    },
    dismiss: undefined,
    getParam: (params) => {
      return {
        tenant: 
        {
              firstName: 'Alex',
              lastName: 'Kavanaugh',
              email: 'alex@roopairs.com',
              phoneNumber: '838-0034-3333',
          },
        propertyId : 1,
      };
    },
    setParams: (params) => {
      navigationSetParamsSpyFunction(params);
      return true;
    },
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

  export const MainAppStackTest: Array<MainAppStackType> = [
    {
        title: 'Properties',
        navigate: navigationPages.PropertiesScreen,
        key: 'Properties',
        button: 'Add Property',
    },
    {
        title: 'Service Request',
        navigate: navigationPages.ServiceRequestScreen,
        key: 'ServiceRequest',
        button: 'Request Service',
    },
    {
        title: 'Account Settings',
        navigate: navigationPages.AccountSettings,
        key: 'AccountSettings',
    },
    {
        title: 'Log Out',
        navigate: navigationPages.LoginScreen,
        key: 'LogOut',
    },
];