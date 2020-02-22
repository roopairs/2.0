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
export default function isEmptyOrSpaces(str:string) : boolean {
    const expr = /^\s*$/ ;
    return expr.test(str);
}


/**
 * -------------------------------------------------
 * isPositiveWholeNumber
 * -------------------------------------------------
 * @param {string} str
 * Test to see if the string is a string of digits. 
 * Returns a boolean based on the results
 * 
 */
export function isPositiveWholeNumber(str: string) : boolean {
    const expr = /^[0-9]*$/;
    return expr.test(str);
}
