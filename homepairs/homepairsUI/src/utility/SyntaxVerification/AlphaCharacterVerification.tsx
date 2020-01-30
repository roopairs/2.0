
const expression = /^[A-Za-z]+$/;

/**
 * -------------------------------------------------
 * Alpha Character Verification 
 * -------------------------------------------------
 * @parm string 
 * Test to see if the string is on contains alphabetical characters 
 * 
 */
export default function isAlphaCharacterOnly(input: string){
    return expression.test(input.toString());
}