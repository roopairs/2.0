const reg = new RegExp("^([A-Za-z0-9]{6,25})$");

/**
 * -------------------------------------------------
 * Password Verification
 * -------------------------------------------------
 * @parm string 
 * Test to see if the string fulfils password constraints. 
 * Passwords for homepairs only be alphanumerica and they are 
 * between 6 and 25 characters long. This is subject to change in 
 * the future
 * 
 */
export default function isPasswordValid(input:string) : boolean {
    return reg.test(input);
}