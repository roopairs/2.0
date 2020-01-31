import axios from 'axios';
import { 
  FetchUserAccountProfileAction, 
  LandlordAccount, 
  Account, 
  TenantAccount, 
  AccountState, 
  AccountTypes,
  HomePairsResponseKeys, 
} from '../types';
import { fetchProperty, fetchProperties } from '../property-list/actions';

const responseKeys = HomePairsResponseKeys;
const accountKeys = HomePairsResponseKeys.ACCOUNT_KEYS;
const responseStatus = HomePairsResponseKeys.STATUS_RESULTS;
const rolePM = 'pm';
const roleTenant = 'tenant';

export const FETCH_PROFILE_ACTION_TYPES = {
    FETCH_PROFILE: 'ACCOUNT/FETCH_PROFILE',
    GENERATE_ACCOUNT: 'ACCOUNT/GENERATE_ACCOUNT',
};


/**
 * ----------------------------------------------------
 * ChooseMainPage
 * ----------------------------------------------------
 * This function navigates to a specific page based on the Account 
 * Type passed int.  
 * @param {AccountType} accountType 
 * @param {any} navigation 
 */
export function ChooseMainPage(accountType: AccountTypes = AccountTypes.Tenant, navigation: any) {
  if(accountType === AccountTypes.Landlord){
    navigation.navigate('AccountProperties');  
    return;
  }
  navigation.navigate('TenantProperties');
}

/** 
 * Determines if the response given by the Homepairs server is 
 * a PropertyManger or a Landlord. Assummed the correct format as 
 * been submitted
*/
function getAccountType(accountJSON : any): AccountTypes{
  if(accountJSON[accountKeys.PM] != null){ 
    return AccountTypes.Landlord;
  }
    return AccountTypes.Tenant;
   
}

export const fetchAccountProfile = (accountJSON : any): FetchUserAccountProfileAction => {
  const accountType: AccountTypes = getAccountType(accountJSON) ;
  const profile = (accountType === AccountTypes.Landlord) ? accountJSON[accountKeys.PM] : accountJSON[accountKeys.TENANT]; 
  let fetchedProfile : AccountState ;
  const baseProfile : Account = {
        accountType,
        firstName: profile[accountKeys.FIRSTNAME],
        lastName: profile[accountKeys.LASTNAME],
        email: profile[accountKeys.EMAIL],
        phone: profile[accountKeys.PHONE],
        streetAddress: profile[accountKeys.ADDRESS], 
        city: profile[accountKeys.CITY],
        roopairsToken: accountJSON[responseKeys.ROOPAIRS_TOKEN],
    };
    if(profile[accountKeys.TENANTID] == null){
        const landLordProfile : LandlordAccount = { ...baseProfile,
            manId: profile[accountKeys.MANID],
        };
        // Make sure to change from Tenant Account to Landlord
        landLordProfile[accountKeys.TYPE] = AccountTypes.Landlord;
        fetchedProfile = landLordProfile;
    }else{
        const tenantProfile : TenantAccount = { ...baseProfile,
            tenantId: profile[accountKeys.TENANTID],
            propId: profile[accountKeys.PROPID],
        };
        fetchedProfile = tenantProfile;
    }
    return {
      type: FETCH_PROFILE_ACTION_TYPES.FETCH_PROFILE,
      profile: fetchedProfile,
    };
};

/* * Function makes async request to server and loads all information before app begins. * */
export const fetchAccount = (
    Email: String, Password: String, navigation: any, modalSetOffCallBack?: (error?:String) => void) => {
    return async (dispatch: (arg0: any) => void) => {
        const TENANT = 'tenant';

        // TODO: GET POST URL FROM ENVIRONMENT VARIABLE ON HEROKU SERVER ENV VARIABLE
        await axios.post('https://homepairs-alpha.herokuapp.com/API/login/', {
            email: Email,
            password: Password,
          })
          .then((response) => {
            //here is where we get our response from our heroku database.
            //console.log(response) //is an easy way to read error messages (invalid credentials, for example)"
            const accountType = getAccountType(response[responseKeys.DATA])
            if(!(response[responseKeys.DATA][responseKeys.STATUS] === responseStatus.FAILURE)){
              dispatch(fetchAccountProfile(response[responseKeys.DATA]))
              if(response[responseKeys.DATA][responseKeys.ROLE] === rolePM){
                dispatch(fetchProperties(response[responseKeys.DATA][responseKeys.PROPERTIES]))
              }
              else if(response[responseKeys.DATA][responseKeys.ROLE] === roleTenant){
                dispatch(fetchProperty(response[responseKeys.DATA][TENANT][responseKeys.PLACE]))
              }
              else{
                throw new Error("Role type not implemented!")
              }
              ChooseMainPage(accountType, navigation)
            }else{
              modalSetOffCallBack("Home Pairs was unable to log in. Please try again.");
            }
          })
          .catch((error) => {
            // console.log(error);
            modalSetOffCallBack("Unable to establish a connection with HomePairs servers");
          })
          .finally(() => {

          });
    };
};

export const loginForPM = (Email: String, Password: String, modalSetOffCallBack?: (error?:String) => void, navigateMainCallBack?: () => void) => {
  return async (dispatch: (arg0: any) => void) => {
    await axios.post('', {
      email: Email, 
      password: Password,
    })
    .then((response) => {
      if(!(response[responseKeys.DATA][responseKeys.STATUS] === responseStatus.FAILURE)){
        dispatch(fetchAccountProfile(response[responseKeys.DATA]));
        dispatch(fetchProperties(response[responseKeys.DATA][responseKeys.PROPERTIES]));
        navigateMainCallBack();
      }else{
        modalSetOffCallBack("Home Pairs was unable to log in. Please try again.");
      }
    }).catch((error) => {
      // console.log(error);
      modalSetOffCallBack("Connection to the server could not be established.");
    });
  };
};


export const generateAccountForTenant = (accountDetails: Account, password: String, navigation: any, modalSetOffCallBack?: (error?:String) => void) => {
  return async (dispatch: (arg0: any) => void) => {
      await axios.post('http://homepairs-alpha.herokuapp.com/API/register/tenant/', {
        firstName: accountDetails.firstName, 
        lastName: accountDetails.lastName,
        email: accountDetails.email, 
        phone: accountDetails.phone,
        streetAddress: accountDetails.streetAddress, 
        city: accountDetails.city,
        password, 
      })
      .then((response) => {
        if(!(response[responseKeys.DATA][responseKeys.STATUS] === responseStatus.FAILURE)){
          dispatch(fetchAccountProfile(response[responseKeys.DATA]))
          dispatch(fetchProperties(response[responseKeys.DATA][responseKeys.PROPERTIES]))
          ChooseMainPage(AccountTypes.Tenant, navigation);
        } else {
          modalSetOffCallBack("Home Pairs was unable to log in. Please try again.");
        }
      })
      .catch((error) => {
        // console.log(error);
        modalSetOffCallBack("Connection to the server could not be established.");
      });
  };
};

export const generateAccountForPM = (accountDetails: Account, password: String, navigation: any, modalSetOffCallBack?: (error?:String) => void) => {
    return async (dispatch: (arg0: any) => void) => {
      await axios.post('http://homepairs-alpha.herokuapp.com/API/register/pm/', {
          firstName: accountDetails.firstName, 
          lastName: accountDetails.lastName,
          email: accountDetails.email, 
          phone: accountDetails.phone,
          password,
        })
        .then((response) => {
          if(!(response[responseKeys.DATA][responseKeys.STATUS] === responseStatus.FAILURE)){
            dispatch(fetchAccountProfile(response[responseKeys.DATA]))
            dispatch(fetchProperties(response[responseKeys.DATA][responseKeys.PROPERTIES]))
            ChooseMainPage(AccountTypes.Landlord, navigation)
          }else{
            modalSetOffCallBack("Home Pairs was unable to log in. Please try again.");
          }
        })
        .catch((error) => {
          // console.log(error);
          modalSetOffCallBack("Connection to the server could not be established.");
        });
    };
};

