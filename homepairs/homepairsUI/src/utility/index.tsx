import NavigationRouteHandler from './NavigationRouterHandler';

/**
 * ------------------------------------------
 * Utilities 
 * ------------------------------------------
 * This is an interface to be able to execute functions that do not provide 
 * specific based logic. Functions such long conditional checks, parsers, 
 * and validators should be included in this package. 
 */
export * from './SyntaxVerification';
export * from './ParameterChecker';
export * from './OtherUtilities';
export {default as NavigationRouteHandler} from './NavigationRouterHandler';
export * from './NavigationRouterHandler';
export * from './ApplianceCategories';

export type NavigationRouteScreenProps = {
    /**
     * navigation object that is able to handle navigating for react-routes and react-navigation. 
     * Is meant to be used for components that are wrapped with a withNavigationRouteHandler HOC
     */
    navigation: NavigationRouteHandler,
}
