import React from 'react';
import {View, Platform} from 'react-native';
import { NavigationSwitchProp } from 'react-navigation';
import { NavigationStackProp } from 'react-navigation-stack';
import { MainAppStackType, ApplianceType, TenantInfo } from 'src/state/types';
import { navigationPages } from 'src/Routes/RouteConstants';
import NavigationRouteHandler, { prepareRoute } from 'src/utility/NavigationRouterHandler';
import { isNullOrUndefined } from 'src/utility/ParameterChecker';


// Object that will hold the parameter state for when getParam is called on a mock navigator (mobile)
const testParamObject = { 
  tenant: {
    firstName: 'Alex',
    lastName: 'Kavanaugh',
    email: 'alex@roopairs.com',
    phoneNumber: '838-034-3333',
  },
  propertyId : 1,
  appliance : {
    applianceId: '123jh', 
    category: ApplianceType.HVAC, 
    manufacturer: 'Vulcan Equipment', 
    appName: 'Oven', 
    modelNum: 123, 
    serialNum: 321,
    location: 'Kitchen',
  },
};

/* Mock objects and functions that will be used for our tests */
export const SingleViewComponent = <View style={{height: '25%', width: '25%', backgroundColor: 'black'}}/>;
export const navigationSwitchSpyFunction = jest.fn((arg?:string) => {return arg;});
export const navigationStackSpyFunction = jest.fn((arg?:any) => {return arg;});
export const navigationSetParamsSpyFunction = jest.fn((params?:any) => {return params;});
export const navigationGetParamsSpyFunction = jest.fn((params?:any) => {return params;});
export const mockRouterFunction = jest.fn((params?:any) => {return params;});
export const displayErrorMock = jest.fn((error?:string) => {return error;});

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
  getParam: (param:string) => {
    navigationGetParamsSpyFunction(param);
    return testParamObject[param];
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
  jumpTo: undefined,
  toggleDrawer: undefined, 
  openDrawer: undefined, 
  closeDrawer: undefined,
};

export const mockStackNavigation: NavigationStackProp = {
  navigate: (routeNameOrOptions)=>{
    navigationStackSpyFunction(routeNameOrOptions);
    return true;
  },
  state: {
    key: 'iamatestkey',
    index: 1,
    routeName: navigationPages.SingleProperty,
    routes: undefined,
    isTransitioning: false,
  },
  dispatch: undefined, 
  goBack: ()=>{
    navigationStackSpyFunction();
    return true;
  },
  dismiss: undefined,
  getParam: (param:string) => {
    navigationGetParamsSpyFunction(param);
    return testParamObject[param];
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
  toggleDrawer: undefined, 
  openDrawer: undefined, 
  closeDrawer: undefined,
};

export const mockStackNavigationFirstRoute: NavigationStackProp = {
  navigate: (routeNameOrOptions)=>{
    navigationStackSpyFunction(routeNameOrOptions);
    return true;
  },
  state: {
    key: 'iamatestkey',
    index: 0,
    routeName: navigationPages.PropertiesScreen,
    routes: undefined,
    isTransitioning: false,
  },
  dispatch: undefined, 
  goBack: ()=>{
    navigationStackSpyFunction();
    return true;
  },
  dismiss: undefined,
  getParam: (param:string) => {
   return testParamObject[param];
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
  toggleDrawer: undefined, 
  openDrawer: undefined, 
  closeDrawer: undefined,
};

export const mockRoute = {
  history: {
    go: mockRouterFunction,
    goBack: mockRouterFunction,
    goForward: mockRouterFunction,
    listen: undefined,
    location: {
      pathname: '/test/path',
      search: '/test/search',
      hash: '/test/hash',
    },
    push: mockRouterFunction,
    pop: mockRouterFunction,
    replace: mockRouterFunction,
  },
  location: {
    pathname: '/test/path',
    search: '/test/search',
    hash: '/test/hash',
  },
  match: {
    path: '/test/path',
    url: '/test/path',
    isExact: true,
  },
};

export const mockFirstRoute = {
  history: {
    go: mockRouterFunction,
    goBack: mockRouterFunction,
    goForward: mockRouterFunction,
    listen: undefined,
    location: {
      pathname: '/admin/properties',
      search: '/test/search',
      hash: '/test/hash',
    },
    push: mockRouterFunction,
    pop: mockRouterFunction,
    replace: mockRouterFunction,
  },
  location: {
    pathname: '/admin/properties',
    search: '/test/search',
    hash: '/test/hash',
  },
  match: {
    path: '/admin/properties',
    url: '/admin/properties',
    params: undefined,
    isExact: true,
  },
};

export const thinButtonFireEventTestId = {
  onClick: 'click-thin-button',
  onPress: 'click-thin-button',
};


/**
 * Primary mock stack for testing navigation in both web and mobile
 */
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


// Test params that are inserted into Route Object
const dummyTenantPropertyParam = '{"firstName":"Alex","lastName":"Kavanaugh","email":"alex@roopairs.com","phoneNumber":"838-034-3333"}';
const dummyPropIdParam = 'okwXExP';

// Object that should be the result of the tenantInfo parsed in the navigationRouterHandler object 
export const dummyTenantParamParsed : TenantInfo = {
  firstName: 'Alex',
  lastName: 'Kavanaugh',
  email: 'alex@roopairs.com',
  phoneNumber: '838-034-3333',
};


export type SetOptionalRouteParams = {
  /**
   * Tells function to include a propId param 
   */
  propId?: boolean;

  /**
   * tells function to include tenant param 
   */
  tenant?: boolean;
}

/**
 * ------------------------------------------
 * prepareRouteParams
 * ------------------------------------------
 * Sets up the route with the test params to be used in certain scenarios. Usefull for 
 * testing web components with parameters.
 * @param routeObject -original route object 
 * @param routeOptions -test params to be given to the route 
 */
function prepareRouteParams(routeObject:any, routeOptions: any){
  if(isNullOrUndefined(routeOptions))
    return routeObject;
  
  const navRouteObject = {...routeObject};
    const {propId, tenant} = routeOptions;
    let selectedOptions = {
      propId: propId ? dummyPropIdParam : null,
      tenant: tenant ? dummyTenantPropertyParam : null,
    };
    let selectedMatch = {
      propId: propId ? ':propId' : null,
      tenant: tenant ? ':tenant' : null,
    };

    // Remove any null or undefined objects 
    Object.keys(selectedOptions).forEach((key) => (selectedOptions[key] == null) && delete selectedOptions[key]);
    Object.keys(selectedMatch).forEach((key) => (selectedMatch[key] == null) && delete selectedMatch[key]);

    const fullRoute = prepareRoute(mockFirstRoute.location.pathname, selectedOptions);
    const matchRoute = prepareRoute(mockFirstRoute.location.pathname, selectedMatch);

    navRouteObject.location.pathname = fullRoute;
    navRouteObject.history.location.pathname = fullRoute;
    navRouteObject.match.path = fullRoute;
    navRouteObject.match = {
      ...navRouteObject.match, 
      params: selectedOptions,
    };
    navRouteObject.match.url = matchRoute;
    return navRouteObject;
}

/* Helper functions for getting the mock navigators */

/**
 * ------------------------------------------
 * prepareNavigationMock
 * ------------------------------------------
 * Returns a navigation Mock object with either a stack navigator for mobile 
 * or a router object with for web. Use the routeOptions parameters to give 
 * a route parameters for testing on web. 
 * @param routeOptions -test params to be given to the route 
 */
export function prepareNavigationMock(routeOptions?: SetOptionalRouteParams) : [NavigationRouteHandler, jest.Mock<any, [any?]>]{
  const navObj = prepareRouteParams(mockRoute, routeOptions);
  return Platform.OS === 'web' ? [new NavigationRouteHandler(navObj), mockRouterFunction ]
  : 
  [new NavigationRouteHandler(mockStackNavigation), navigationStackSpyFunction]; 
  
}

/**
 * ------------------------------------------
 * prepareNavigationSwitchMock
 * ------------------------------------------
 * Returns a navigation Mock object with either a switch navigator for mobile 
 * or a router object with for web. Use the routeOptions parameters to give 
 * a route parameters for testing on web. 
 * @param routeOptions -test params to be given to the route 
 */
export function prepareNavigationSwitchMock(routeOptions?: SetOptionalRouteParams): [NavigationRouteHandler, jest.Mock<any, [any?]>]{
  const navObj = prepareRouteParams(mockRoute, routeOptions);
  return Platform.OS === 'web' ? [new NavigationRouteHandler(navObj), mockRouterFunction ]
  : 
  [new NavigationRouteHandler(mockSwitchNavigation), navigationSwitchSpyFunction]; 
}

/**
 * ------------------------------------------
 * prepareNavigationStackFirstRouteMock
 * ------------------------------------------
 * Returns a navigation Mock object with either a stack navigator for mobile 
 * or a router object with for web. The navigator will be intialized with a route 
 * this is defined as a 'base' route that will cause the isFirstRoute to return true.
 * Use the routeOptions parameters to give 
 * a route parameters for testing on web. 
 * @param routeOptions -test params to be given to the route 
 */
export function prepareNavigationStackFirstRouteMock(routeOptions?: SetOptionalRouteParams): [NavigationRouteHandler, jest.Mock<any, [any?]>]{
  const navObj = prepareRouteParams(mockFirstRoute, routeOptions);
  return Platform.OS === 'web' ? [new NavigationRouteHandler(navObj), mockRouterFunction ]
  : 
  [new NavigationRouteHandler(mockStackNavigationFirstRoute), navigationStackSpyFunction]; 
}