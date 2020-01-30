import isEmailSyntaxValid from './SyntaxVerification/EmailSyntaxVerification';
import isEmptyOrSpaces, {isNumber}  from './SyntaxVerification/EmptyStringVerification';
import isPasswordValid from './SyntaxVerification/PasswordVerification';
import isPhoneNumberValid from './SyntaxVerification/PhoneNumberVerification';
import isAlphaCharacterOnly from './SyntaxVerification/AlphaCharacterVerfication';
import { isNullOrUndefined } from './ParameterChecker';

/**
 * ------------------------------------------
 * Utilities 
 * ------------------------------------------
 * This is an interface to be able to execute functions that do not provide 
 * specific based logic. Functions such long conditional checks, parsers, 
 * and validators should be included in this package. 
 */
export {isEmailSyntaxValid, isPasswordValid, isEmptyOrSpaces, isPhoneNumberValid, isAlphaCharacterOnly, isNullOrUndefined, isNumber};

