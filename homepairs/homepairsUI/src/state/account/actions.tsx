import { 
  FetchUserAccountProfileAction, 
  LandlordAccount, 
  Account, 
  TenantAccount, 
  AccountState, 
  AccountTypes,
  HomePairsResponseKeys, 
} from '../types';
import axios from 'axios'
import { fetchProperties } from '../property-list/actions';

let responseKeys = HomePairsResponseKeys;
let accountKeys = HomePairsResponseKeys.ACCOUNT_KEYS;
let responseStatus = HomePairsResponseKeys.STATUS_RESULTS;

export enum FETCH_PROFILE_ACTION_TYPES {
    FETCH_PROFILE = 'ACCOUNT/FETCH_PROFILE',
    GENERATE_ACCOUNT = 'ACCOUNT/GENERATE_ACCOUNT'
}

export const fetchAccountProfile = (accountJSON : any): FetchUserAccountProfileAction => {
    let profile = accountJSON[accountKeys.PM]
    console.log(accountJSON[accountKeys.PM])
    let fetchedProfile : AccountState 
    let baseProfile : Account = {
        accountType: AccountTypes.Tenant,
        firstName: profile[accountKeys.FIRSTNAME],
        lastName: profile[accountKeys.LASTNAME],
        email: profile[accountKeys.EMAIL],
        phone: profile[accountKeys.PHONE],
        roopairsToken: accountJSON[responseKeys.ROOPAIRS]
    }
    if(profile[accountKeys.TENANTID] == null){
        var landLordProfile : LandlordAccount = { ...baseProfile,
            manId: profile[accountKeys.MANID],
        }
        //Make sure to change from Tenant Account to Landlord
        landLordProfile[accountKeys.TYPE] = AccountTypes.Landlord
        fetchedProfile = landLordProfile
    }else{
        var tenantProfile : TenantAccount = { ...baseProfile,
            tenantId: profile[accountKeys.TENANTID],
            propId: profile[accountKeys.PROPID],
        }
        fetchedProfile = tenantProfile
    }
    return {
      type: FETCH_PROFILE_ACTION_TYPES.FETCH_PROFILE,
      profile: fetchedProfile,
    }
};

/** Function makes async request to server and loads all information before app begins.**/
export const fetchAccount = (
    Email: String, Password: String, modalSetOffCallBack?: (error?:String) => void, navigateMainCallBack?: () => void) => {
    return async (dispatch: (arg0: any) => void) => {
        //TODO: GET POST URL FROM ENVIRONMENT VARIABLE ON HEROKU SERVER ENV VARIABLE
<<<<<<< HEAD
        return await axios.post('https://homepairs-alpha.herokuapp.com/API/login/', {
=======
        return await axios.post('https://homepairs-alpha.herokuapp.com/API/login/tenant/', {
>>>>>>> 0b2231fcfac44cb281312bca32ce3fcb6258097d
            email: Email,
            password: Password,
          })
          .then((response) => {
            //here is where we get our response from our heroku database.
            //console.log(response) //is an easy way to read error messages (invalid credentials, for example)"
            console.log(response[responseKeys.DATA])
            if(!(response[responseKeys.DATA][responseKeys.STATUS] === responseStatus.FAILURE)){
              dispatch(fetchAccountProfile(response[responseKeys.DATA]))
              dispatch(fetchProperties(response[responseKeys.DATA][responseKeys.PROPERTIES]))
              navigateMainCallBack()
            }else{
              modalSetOffCallBack("Home Pairs was unable to log in. Please try again.")
            }
          })
          .catch((error) => {
            console.log(error);
            modalSetOffCallBack("Connection to the server could not be established.")
          })
          .finally(() => {

          });
    };
};

export const loginForPM = (Username: String, Password: String, modalSetOffCallBack?: (error?:String) => void, navigateMainCallBack?: () => void) => {
  return async (dispatch: (arg0: any) => void) => {
    return await axios.post('', {
      username: Username, 
      password: Password,
    })
    .then((response) => {
      if(!(response[responseKeys.DATA][responseKeys.STATUS] === responseStatus.FAILURE)){
        dispatch(fetchAccountProfile(response[responseKeys.DATA]))
        dispatch(fetchProperties(response[responseKeys.DATA][responseKeys.PROPERTIES]))
        navigateMainCallBack()
      }else{
        modalSetOffCallBack("Home Pairs was unable to log in. Please try again.")
      }
    }).catch((error) => {
      console.log(error);
      modalSetOffCallBack("Connection to the server could not be established.")
    });
  };
}


export const generateAccountForTenant = (accountDetails: Account, password: String, modalSetOffCallBack?: (error?:String) => void, navigateMainCallBack?: () => void) => {
  return async (dispatch: (arg0: any) => void) => {
      return await axios.post('', {
        firstName: accountDetails.firstName, 
        lastName: accountDetails.lastName,
        username: accountDetails.email, 
        password: password, 
      })
      .then((response) => {
        if(!(response[responseKeys.DATA][responseKeys.STATUS] === responseStatus.FAILURE)){
          dispatch(fetchAccountProfile(response[responseKeys.DATA]))
          dispatch(fetchProperties(response[responseKeys.DATA][responseKeys.PROPERTIES]))
          navigateMainCallBack()
        }else{
          modalSetOffCallBack("Home Pairs was unable to log in. Please try again.")
        }
      })
      .catch((error) => {
        console.log(error);
        modalSetOffCallBack("Connection to the server could not be established.")
      });
  };
}

export const generateAccountForPM = (accountDetails: Account, password: String, modalSetOffCallBack?: (error?:String) => void, navigateMainCallBack?: () => void) => {
    return async (dispatch: (arg0: any) => void) => {
      return await axios.post('', {
          firstName: accountDetails.firstName, 
          lastName: accountDetails.lastName,
          username: accountDetails.email, 
          password: password, 
        })
        .then((response) => {
          if(!(response[responseKeys.DATA][responseKeys.STATUS] === responseStatus.FAILURE)){
            dispatch(fetchAccountProfile(response[responseKeys.DATA]))
            dispatch(fetchProperties(response[responseKeys.DATA][responseKeys.PROPERTIES]))
            navigateMainCallBack()
          }else{
            modalSetOffCallBack("Home Pairs was unable to log in. Please try again.")
          }
        })
        .catch((error) => {
          console.log(error);
          modalSetOffCallBack("Connection to the server could not be established.")
        });
    };
}

