import { getAccountType} from 'src/utility';
import { 
  FetchUserAccountProfileAction, 
  PropertyManagerAccount, 
  TenantAccount, 
  AccountTypes,
} from '../types';


export const FETCH_PROFILE_ACTION_TYPES = {
    FETCH_PROFILE: 'ACCOUNT/FETCH_PROFILE',
    REHYDRATE_PROFILE: 'ACCOUNT/REHYDRATE_PROFILE',
};

/**
 * Helper function that handles getting the proper data from the backend into 
 * the correct profile information. This method assumes that the object passed 
 * is for that of a Property Manager.
 * @param pmObject -Object to be parsed
 */
function parsePropertyManagerAccount(pmObject : any): PropertyManagerAccount{
    const {pm, token} = pmObject;
    return {...pm, token, accountType: AccountTypes.PropertyManager };
}

/**
 * Helper function that handles getting the proper data from the backend into 
 * the correct tenant profile information. This method assumes that the object 
 * passed for a tenant account. 
 * @param tenantObject -tenant object to be parsed
 */
function parseTenantAccount(tenantObject : any): TenantAccount{
    const {tenant, properties} = tenantObject;

    // Gather the information for the tenant account 
    const {email, firstName, lastName, phoneNumber, pm} = tenant;
    const {pmId} = pm[0]; 

    // Get the address and propId from single property returned from the 
    // repsonse.
    const {streetAddress, propId} = properties[0];
    return {
        accountType: AccountTypes.Tenant,
        email,
        firstName,
        lastName, 
        phoneNumber,
        pmId,
        address: streetAddress,
        propId,
    };
}

/**
 * ----------------------------------------------------
 * parseAccount
 * ----------------------------------------------------
 * This function parses a json object returned from the homepairs backend into 
 * an AccountState object. This object is either a Tenant Account or a 
 * Property Manager Account. The object is stored as a reducer action with the 
 * FETCH_PROFILE type.
 * 
 * @param {any} accountJSON -Json Object from backend response
 * */
export const parseAccount = (accountJSON : any): FetchUserAccountProfileAction => {
    console.log(accountJSON);
    const isTenant: boolean = getAccountType(accountJSON) === AccountTypes.Tenant;
    const profile = isTenant 
        ? parseTenantAccount(accountJSON) 
        : parsePropertyManagerAccount(accountJSON);
    return {
        type: FETCH_PROFILE_ACTION_TYPES.FETCH_PROFILE,
        profile,
    };
};
