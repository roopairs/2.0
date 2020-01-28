/**
 * -------------------------------------------------
 * isEmptyString
 * -------------------------------------------------
 * @parm string 
 * Test to see if the string has no visible characters. 
 * Strings of empty spaces characters, tabs, and strings 
 * with not values all fall under this category
 * 
 */
export default function isEmptyOrSpaces(str:String){
    return str === null || str.match(/^\s*$/) !== null;
}