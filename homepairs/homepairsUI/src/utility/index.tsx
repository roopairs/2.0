import isEmailSyntaxValid from './SyntaxVerification/EmailSyntaxVerification';
import isEmptyOrSpaces, {isPositiveWholeNumber}  from './SyntaxVerification/EmptyStringVerification';
import isPasswordValid from './SyntaxVerification/PasswordVerification';
import isPhoneNumberValid from './SyntaxVerification/PhoneNumberVerification';
import isAlphaCharacterOnly from './SyntaxVerification/AlphaCharacterVerification';
import { isNullOrUndefined } from './ParameterChecker';
import { categoryToString, stringToCategory } from './ApplianceCategories';

/**
 * ------------------------------------------
 * Utilities 
 * ------------------------------------------
 * This is an interface to be able to execute functions that do not provide 
 * specific based logic. Functions such long conditional checks, parsers, 
 * and validators should be included in this package. 
 */
export {categoryToString, stringToCategory, isEmailSyntaxValid, isPasswordValid, isEmptyOrSpaces, isPhoneNumberValid, isAlphaCharacterOnly, isNullOrUndefined, isPositiveWholeNumber};

