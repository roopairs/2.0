
/**
 * ------------------------------------------------------------
 * Is Null or Undefined 
 * ------------------------------------------------------------
 * @param any
 * Takes in a single argument and returns if that have has been 
 * assigned null or has been undefined. 
 */
export function isNullOrUndefined(arg: any): boolean {
    return typeof arg === 'undefined' || arg == null;
}

/** 
 * ------------------------------------------------------------
 * Parameter Checkers
 * ------------------------------------------------------------
 * These functions are intended to be helper functions for the 
 * use of comparison operations.  
 * 
 * Methods:
 *      isNullOrUndefined( arg: any ) => boolean 
*/
const ParameterCheckers = {isNullOrUndefined};
export default ParameterCheckers;