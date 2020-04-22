
import { AsyncStorage } from 'react-native';
import {AccountTypes} from 'homepairs-types';


const PM = 'pm';

/**
  * ----------------------------------------------------
  * Store Account Data 
  * ----------------------------------------------------
  * An async function that stores in the account profile once recieved. 
  * This should initially be called upon user authentication. 
  * @param {Account} account 
  */
 export const storeAccountData = async (accountJSON: any) => {
    try {
      await AsyncStorage.setItem('profile', JSON.stringify(accountJSON));
    } catch (error) {
      // Error saving data
    }
  };

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
