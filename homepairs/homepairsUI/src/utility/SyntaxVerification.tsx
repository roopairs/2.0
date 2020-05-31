/* eslint-disable no-useless-escape */
/* eslint-disable no-control-regex */

/**
 * -------------------------------------------------
 * Phone Number Verfication
 * -------------------------------------------------
 * @param {string} phone 
 * 
 * Test to see if the string is in the a valid telephone 
 * number format. This is global and not specific to the US
 * 
 * Valid formats:
 * (123) 456-7890
 * (123)456-7890
 * 123-456-7890
 * 123.456.7890
 * 1234567890
 * +31636363634
 * 075-63546725
 */
export function isPhoneNumberValid(phone:string){
    const expression = new RegExp(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im);
    return expression.test(phone);
}

/**
 * -------------------------------------------------
 * Password Verification
 * -------------------------------------------------
 * @param {string} input 
 * Test to see if the string fulfils password constraints. 
 * Passwords for homepairs only be alphanumeric with some special characters and they are 
 * between 6 and 50 characters long. This is subject to change in the future
 */
export function isPasswordValid(input:string) : boolean {
    const reg = new RegExp("^([a-zA-Z0-9!@#$%^&*\-]{6,32})$");
    return reg.test(input);
}

/**
 * -------------------------------------------------
 * isEmptyString
 * -------------------------------------------------
 * @param {string} str
 * Test to see if the string has no visible characters. 
 * Strings of empty spaces characters, tabs, and strings 
 * with not values all fall under this category
 * 
 */
export function isEmptyOrSpaces(str:string) : boolean {
    const expr = /^\s*$/ ;
    return expr.test(str);
}


/**
 * -------------------------------------------------
 * isPositiveWholeNumber
 * -------------------------------------------------
 * Test to see if the string is a string of digits. 
 * Returns a boolean based on the results
 * 
 * @param {string} str
 * 
 */
export function isPositiveWholeNumber(str: string) : boolean {
    const expr = /^[0-9]*$/;
    return expr.test(str);
}

/**
 * -------------------------------------------------
 * isNotPositiveWholeNumber
 * -------------------------------------------------
 * Test to see if the string is NOT a string of digits. 
 * Returns a boolean based on the results
 * @param {string}str 
 */
export function isNotPositiveWholeNumber(str: string) : boolean {
    return !isPositiveWholeNumber(str);
}

/**
 * -------------------------------------------------
 * Email Syntax Valid 
 * -------------------------------------------------
 * @param {string} email 
 * Returns a boolean dependant of whether a string matches the 
 * valid email format. 
 * 
 * Examples: 
 * aaa@gmail.com 
 * 394;0@gmail.com
 * jimBrown@hotmail.live.com
 * 
 */
export function isEmailSyntaxValid(email: string) : Boolean {
    // how to work with strings in JS https://www.digitalocean.com/community/tutorials/how-to-work-with-strings-in-javascript
    const expression = /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
    return expression.test(email);
}

/**
 * -------------------------------------------------
 * Alpha Character Verification 
 * -------------------------------------------------
 * @param {string} input
 * Test to see if the string is on contains alphabetical characters 
 * 
 */
export function isAlphaCharacterOnly(input: string){
    const expression = /^[A-Za-z]+$/;
    return expression.test(input.toString());
}