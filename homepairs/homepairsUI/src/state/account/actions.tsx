import { getAccountType} from 'homepairs-utilities';
import { 
  FetchUserAccountProfileAction, 
  PropertyManagerAccount, 
  Account, 
  TenantAccount, 
  AccountState, 
  AccountTypes,
  HomePairsResponseKeys, 
} from '../types';

const responseKeys = HomePairsResponseKeys;
const accountKeys = HomePairsResponseKeys.ACCOUNT_KEYS;


export const FETCH_PROFILE_ACTION_TYPES = {
    FETCH_PROFILE: 'ACCOUNT/FETCH_PROFILE',
    REHYDRATE_PROFILE: 'ACCOUNT/REHYDRATE_PROFILE',
};

/**
 * ----------------------------------------------------
 * parseAccount
 * ----------------------------------------------------
 * This function parses a json object returned from the homepairs 
 * backend into an AccountState object. This object is either 
 * a Tenant Account or a Landlord Account. The object is stored 
 * as a reducer action with the FETCH_PROFILE type.
 * 
 * @param {any} accountJSON -Json Object from backend response
 * */
export const parseAccount = (accountJSON : any): FetchUserAccountProfileAction => {
  const accountType: AccountTypes = getAccountType(accountJSON);
  const profile = (accountType === AccountTypes.PropertyManager) ? accountJSON[accountKeys.PM] : accountJSON[accountKeys.TENANT]; 
  let fetchedProfile : AccountState;
  const baseProfile : Account = {
        accountType,
        firstName: profile[accountKeys.FIRSTNAME],
        lastName: profile[accountKeys.LASTNAME],
        email: profile[accountKeys.EMAIL],
        address: profile[accountKeys.ADDRESS], 
        roopairsToken: accountJSON[responseKeys.ROOPAIRS_TOKEN],
    };
    if(accountType === AccountTypes.PropertyManager){
        const landLordProfile : PropertyManagerAccount = { ...baseProfile,
            pmId: profile[accountKeys.PM_ID],
        };
        // Make sure to change from Tenant Account to Landlord
        landLordProfile[accountKeys.TYPE] = AccountTypes.PropertyManager;
        fetchedProfile = landLordProfile;
    }else{
        const tenantProfile : TenantAccount = { ...baseProfile,
            tenantId: profile[accountKeys.TENANTID],
            propId: profile[accountKeys.PROPID],
        };
        fetchedProfile = tenantProfile;
    }
    console.log(fetchedProfile)
    return {
      type: FETCH_PROFILE_ACTION_TYPES.FETCH_PROFILE,
      profile: fetchedProfile,
    };
};
