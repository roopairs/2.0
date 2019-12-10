import { FetchUserAccountProfileAction, LandlordAccount, Account, TenantAccount, AccountState } from '../types';
import axios from 'axios'
import { fetchProperties } from '../property-list/actions';

const DATA = 'data'

const PMINFO = 'pmInfo'
const FIRSTNAME = 'FirstName'
const LASTNAME = 'LastName'
const EMAIL = 'email'
const MANID = 'manId'
const PASSWORD = 'password'
const PHONE = 'phone'
const PROPID = 'propId'
const TENANTID = 'tenantID'

const PROPERTIES = 'properties'
const ROOPAIRS = 'roopairs'
const STATUS = 'status'

const SUCCESS = 'success'
const FAILURE = 'failure'

export enum FETCH_PROFILE_ACTION_TYPES {
    FETCH_PROFILE = 'ACCOUNT/FETCH_PROFILE',
}

export const fetchAccountProfile = (accountJSON : any): FetchUserAccountProfileAction => {
    let profile = accountJSON[PMINFO]
    let fetchedProfile : AccountState 
    let baseProfile : Account = {
        firstName: profile[FIRSTNAME],
        lastName: profile[LASTNAME],
        email: profile[EMAIL],
        phone: profile[PHONE],
        roopairsToken: accountJSON[ROOPAIRS]
    }
    if(profile[TENANTID] == null){
        var landLordProfile : LandlordAccount = { ...baseProfile,
            manId: profile[MANID],
        }
        fetchedProfile = landLordProfile
    }else{
        var tenantProfile : TenantAccount = { ...baseProfile,
            tenantId: profile[TENANTID],
            propId: profile[PROPID],
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
    Username: String, Password: String, modalSetOffCallBack?: (error?:String) => void, navigateMainCallBack?: () => void) => {
    return async (dispatch: (arg0: any) => void) => {
        return await axios.post('http://vertical-proto-homepairs.herokuapp.com/verticalAPI/', {
            username: Username,
            password: Password,
          } )
          .then((response) => {
            if(!(response[DATA][STATUS] === FAILURE)){
              dispatch(fetchAccountProfile(response[DATA]))
              dispatch(fetchProperties(response[DATA][PROPERTIES]))
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

