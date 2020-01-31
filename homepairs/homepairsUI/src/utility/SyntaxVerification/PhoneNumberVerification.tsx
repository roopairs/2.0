
/* eslint-disable no-control-regex */

const expression = new RegExp(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im);

/**
 * -------------------------------------------------
 * Phone Number Verfication
 * -------------------------------------------------
 * @parm string 
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
export default function isPhoneNumberValid(phone:string){
    return expression.test(phone);
}