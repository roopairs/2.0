
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

// eslint-disable-next-line import/prefer-default-export
export function getAccountType(accountJSON : any): AccountTypes{
    const {role} = accountJSON;
    if(role === PM){ 
      return AccountTypes.PropertyManager;
    }
      return AccountTypes.Tenant; 
}