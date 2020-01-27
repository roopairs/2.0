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
<<<<<<< HEAD
import axios from 'axios';
=======
>>>>>>> 6c0abe500170f7c4f80d6b59e196169385a97584
import { fetchProperties } from '../property-list/actions';

const responseKeys = HomePairsResponseKeys;
const accountKeys = HomePairsResponseKeys.ACCOUNT_KEYS;
const responseStatus = HomePairsResponseKeys.STATUS_RESULTS;

export const FETCH_PROFILE_ACTION_TYPES = {
    FETCH_PROFILE: 'ACCOUNT/FETCH_PROFILE',
    GENERATE_ACCOUNT: 'ACCOUNT/GENERATE_ACCOUNT',
};

export const fetchAccountProfile = (accountJSON : any): FetchUserAccountProfileAction => {
    let profile: { [x: string]: any; };
    if(accountJSON[accountKeys.PM] != null){ profile = accountJSON[accountKeys.PM]; } // it's a PM
    else{ profile = accountJSON[accountKeys.TENANT]; } // it's a Tenant
    let fetchedProfile : AccountState; 
    const baseProfile : Account = {
        accountType: AccountTypes.Landlord,
        firstName: profile[accountKeys.FIRSTNAME],
        lastName: profile[accountKeys.LASTNAME],
        email: profile[accountKeys.EMAIL],
        phone: profile[accountKeys.PHONE],
        address: profile[accountKeys.ADDRESS], 
        city: profile[accountKeys.CITY],
<<<<<<< HEAD
        roopairsToken: accountJSON[responseKeys.ROOPAIRS]
    }
=======
        companyName: profile[accountKeys.COMPANY_NAME], 
        companyType: profile[accountKeys.COMPANY_TYPE],
        roopairsToken: accountJSON[responseKeys.ROOPAIRS],
    };
>>>>>>> 6c0abe500170f7c4f80d6b59e196169385a97584
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
    Email: String, Password: String, modalSetOffCallBack?: (error?:String) => void, navigateMainCallBack?: () => void) => {
    return async (dispatch: (arg0: any) => void) => {
        // TODO: GET POST URL FROM ENVIRONMENT VARIABLE ON HEROKU SERVER ENV VARIABLE
        await axios.post('https://homepairs-alpha.herokuapp.com/API/login/', {
            email: Email,
            password: Password,
          })
          .then((response) => {
            // here is where we get our response from our heroku database.
            // console.log(response) //is an easy way to read error messages (invalid credentials, for example)"
            if(!(response[responseKeys.DATA][responseKeys.STATUS] === responseStatus.FAILURE)){
              dispatch(fetchAccountProfile(response[responseKeys.DATA]));
              dispatch(fetchProperties(response[responseKeys.DATA][responseKeys.PROPERTIES]));
              navigateMainCallBack();
            }else{
              modalSetOffCallBack("Home Pairs was unable to log in. Please try again.");
            }
          })
          .catch((_error) => {
            modalSetOffCallBack("Unable to establish a connection with HomePairs servers");
          })
          .finally(() => {

          });
    };
};

<<<<<<< HEAD
export const generateAccountForTenant = (accountDetails: Account, password: String, modalSetOffCallBack?: (error?:String) => void, navigateMainCallBack?: () => void) => {
  return async (dispatch: (arg0: any) => void) => {
    console.log(accountDetails)
      return await axios.post('http://homepairs-alpha.herokuapp.com/API/register/tenant/', {
=======
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
    }).catch((_error) => {
      modalSetOffCallBack("Connection to the server could not be established.");
    });
  };
};


export const generateAccountForTenant = (accountDetails: Account, password: String, modalSetOffCallBack?: (error?:String) => void, navigateMainCallBack?: () => void) => {
  return async (dispatch: (arg0: any) => void) => {
      await axios.post('http://homepairs-alpha.herokuapp.com/API/register/tenant/', {
>>>>>>> 6c0abe500170f7c4f80d6b59e196169385a97584
        firstName: accountDetails.firstName, 
        lastName: accountDetails.lastName,
        email: accountDetails.email, 
        phone: accountDetails.phone,
        streetAddress: accountDetails.address, 
        city: accountDetails.city,
<<<<<<< HEAD
        password: password, 
=======
        email: accountDetails.email, 
        phone: accountDetails.phone, 
        password, 
>>>>>>> 6c0abe500170f7c4f80d6b59e196169385a97584
      })
      .then((response) => {
        if(!(response[responseKeys.DATA][responseKeys.STATUS] === responseStatus.FAILURE)){
          dispatch(fetchAccountProfile(response[responseKeys.DATA]));
          dispatch(fetchProperties(response[responseKeys.DATA][responseKeys.PROPERTIES]));
          navigateMainCallBack();
        } else {
<<<<<<< HEAD
          console.log(response)
          modalSetOffCallBack("Home Pairs was unable to log in. Please try again.")
=======
          modalSetOffCallBack("Home Pairs was unable to log in. Please try again.");
>>>>>>> 6c0abe500170f7c4f80d6b59e196169385a97584
        }
      })
      .catch((_error) => {
        modalSetOffCallBack("Connection to the server could not be established.");
      });
  };
};

export const generateAccountForPM = (accountDetails: Account, password: String, modalSetOffCallBack?: (error?:String) => void, navigateMainCallBack?: () => void) => {
    return async (dispatch: (arg0: any) => void) => {
      await axios.post('http://homepairs-alpha.herokuapp.com/API/register/pm/', {
          firstName: accountDetails.firstName, 
          lastName: accountDetails.lastName,
          email: accountDetails.email, 
          phone: accountDetails.phone,
<<<<<<< HEAD
          password: password, 
=======
          companyName: accountDetails.companyName, 
          companyType: accountDetails.companyType,
          password, 
>>>>>>> 6c0abe500170f7c4f80d6b59e196169385a97584
        })
        .then((response) => {
          if(!(response[responseKeys.DATA][responseKeys.STATUS] === responseStatus.FAILURE)){
            dispatch(fetchAccountProfile(response[responseKeys.DATA]));
            dispatch(fetchProperties(response[responseKeys.DATA][responseKeys.PROPERTIES]));
            navigateMainCallBack();
          }else{
            modalSetOffCallBack("Home Pairs was unable to log in. Please try again.");
          }
        })
        .catch((_error) => {
          modalSetOffCallBack("Connection to the server could not be established.");
        });
    };
};

