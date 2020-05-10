
import {AccountTypes} from 'homepairs-types';


const PM = 'pm';

/**
 * ----------------------------------------------------
 * getAccountType
 * ----------------------------------------------------
 * Determines if the response given by the Homepairs server is 
 * a PropertyManger or a Landlord. Assummed the correct format as 
 * been submitted 
 * @param {any} accountJSON -data object returned by the api request
 * */
export function getAccountType(accountJSON : any): AccountTypes{
    const {role} = accountJSON;
    if(role === PM){ 
      return AccountTypes.PropertyManager;
    }
      return AccountTypes.Tenant; 
}

/**
 * ----------------------------------------------------
 * convertObjectValuesToArray
 * ----------------------------------------------------
 * Converts an object into a list of its values. It removes the 
 * key from each pair. 
 * @param {[key: string] : any} dict -The object to remove the 
 * keys from and make a list out of.
 */
export function convertObjectValuesToArray<T>(dict: {[val:string] : T}) : T[]{
  const arrayVals: T[] = Object.entries(dict).map(([,value]) => {
    return value;
  });
  return arrayVals.length === 0 ? [] : arrayVals;
}
