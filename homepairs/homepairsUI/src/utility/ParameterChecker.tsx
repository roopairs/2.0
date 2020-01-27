/** 
 * ------------------------------------------------------------
 * Parameter Checkers
 * ------------------------------------------------------------
 * These functions are intended to be helper functions for the 
 * use of comparison operations.   
*/

export function isNullOrUndefined(arg: any): boolean {
    return typeof arg === 'undefined' || arg == null;
}

/**
 * 
 * @param arg 
 * @param onStringValue 
 * @param onObjectValue 
 * Takes in a single argument and two call back functions. Dependent 
 * on the value, it executes the function of the type matching the 
 * argument.   
 */
export function executeWhenStringAndObject(
    arg: string | object,
    onStringValue: (arg: string) => any,
    onObjectValue: (arg: Object) => any,
) {
    return typeof arg === 'string' ? onStringValue(arg) : onObjectValue(arg);
}