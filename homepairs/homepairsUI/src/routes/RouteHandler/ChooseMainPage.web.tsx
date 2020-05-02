import { AccountTypes } from "homepairs-types";
import { navigationPages } from '../RouteConstants';
import NavigationRouteHandler from './NavigationRouteHandler';

/**
 * ----------------------------------------------------
 * ChooseMainPage
 * ----------------------------------------------------
 * This function navigates to a specific page based on the Account Type passed in.  
 * @param {AccountTypes} accountType - Type passed in
 * @param {NavigationRouteHandler} navigation -navigator passed from calling component */
export default function ChooseMainPage(accountType: AccountTypes, navigation: NavigationRouteHandler) {
    if(accountType === AccountTypes.Tenant){
      navigation.replace(navigationPages.TenantProperty);
      return;
    }
    navigation.replace(navigationPages.PropertiesScreen);  
  }