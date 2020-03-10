import isEmailSyntaxValid from './SyntaxVerification/EmailSyntaxVerification';
import isEmptyOrSpaces, {isPositiveWholeNumber}  from './SyntaxVerification/EmptyStringVerification';
import isPasswordValid from './SyntaxVerification/PasswordVerification';
import isPhoneNumberValid from './SyntaxVerification/PhoneNumberVerification';
import isAlphaCharacterOnly from './SyntaxVerification/AlphaCharacterVerification';
import { isNullOrUndefined } from './ParameterChecker';
import NavigationRouteHandler, {withNavigationRouteHandler, prepareNavigationHandlerComponent, prepareRoute} from './NavigationRouterHandler';
import { categoryToString, stringToCategory } from './ApplianceCategories';

/**
 * ------------------------------------------
 * Utilities 
 * ------------------------------------------
 * This is an interface to be able to execute functions that do not provide 
 * specific based logic. Functions such long conditional checks, parsers, 
 * and validators should be included in this package. 
 */
export {isEmailSyntaxValid, isPasswordValid, isEmptyOrSpaces, isPhoneNumberValid, isAlphaCharacterOnly, 
    isNullOrUndefined, isPositiveWholeNumber, NavigationRouteHandler, withNavigationRouteHandler,
    prepareNavigationHandlerComponent, categoryToString, stringToCategory, prepareRoute,
};


export type NavigationRouteScreenProps = {
    /**
     * navigation object that is able to handle navigating for react-routes and react-navigation. 
     * Is meant to be used for components that are wrapped with a withNavigationRouteHandler HOC
     */
    navigation: NavigationRouteHandler,
}
