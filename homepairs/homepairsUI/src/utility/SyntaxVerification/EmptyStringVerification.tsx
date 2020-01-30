/**
 * -------------------------------------------------
 * isEmptyString
 * -------------------------------------------------
 * @param {String} str
 * Test to see if the string has no visible characters. 
 * Strings of empty spaces characters, tabs, and strings 
 * with not values all fall under this category
 * 
 */
export default function isEmptyOrSpaces(str:String) : boolean {
    return str === null || str.match(/^\s*$/) !== null;
}


/**
 * -------------------------------------------------
 * isNumberString
 * -------------------------------------------------
 * @param {String} str
 * Test to see if the string is a string of digits. 
 * Returns a boolean based on the results
 * 
 */
export function isNumber(str: String) : boolean {
    return str === null || str.match(/^[0-9]*$/) !== null;
}