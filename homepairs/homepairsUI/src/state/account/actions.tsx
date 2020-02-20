import axios from 'axios';
import { 
  FetchUserAccountProfileAction, 
  LandlordAccount, 
  Account, 
  TenantAccount, 
  AccountState, 
  AccountTypes,
  HomePairsResponseKeys, 
  NavigationPropType,
} from '../types';
import { fetchProperty, fetchProperties } from '../property-list/actions';
import { navigationPages } from 'src/Routes/RouteConstants';

const responseKeys = HomePairsResponseKeys;
const accountKeys = HomePairsResponseKeys.ACCOUNT_KEYS;
const responseStatus = HomePairsResponseKeys.STATUS_RESULTS;
const PM = 'pm';
const TENANT = 'tenant';

export const FETCH_PROFILE_ACTION_TYPES = {
    FETCH_PROFILE: 'ACCOUNT/FETCH_PROFILE',
};

/**
 * This callback is intended to set toggle a modal if the 
 * invoking parent has a modal. 
 * @callback modalSetOffCallBack
 * @param {string} error -optional string to pass back to parent */


/**
 * ----------------------------------------------------
 * ChooseMainPage
 * ----------------------------------------------------
 * This function navigates to a specific page based on the Account 
 * Type passed in.  
 * @param {AccountTypes} accountType
 * @param {NavigationPropType} navigation -navigator passed from calling component */
export function ChooseMainPage(accountType: AccountTypes, 
  navigation: NavigationPropType) {
  if(accountType === AccountTypes.Landlord){
    navigation.navigate(navigationPages.PropertiesScreen);  
    return;
  }
  navigation.navigate(navigationPages.TenantProperty);
}


/**
 * ----------------------------------------------------
 * getAccountType
 * ----------------------------------------------------
 * Determines if the response given by the Homepairs server is 
 * a PropertyManger or a Landlord. Assummed the correct format as 
 * been submitted 
 * @param {any} accountJSON -data object returned by the api request
 * */
function getAccountType(accountJSON : any): AccountTypes{
  if(accountJSON[accountKeys.PM] != null){ 
    return AccountTypes.Landlord;
  }
    return AccountTypes.Tenant; 
}


/**
 * ----------------------------------------------------
 * fetchAccountProfile
 * ----------------------------------------------------
 * This function parses a json object returned from the homepairs 
 * backend into an AccountState object. This object is either 
 * a Tenant Account or a Landlord Account. The object is stored 
 * as a reducer action with the FETCH_PROFILE type.
 * 
 * @param {any} accountJSON -Json Object from backend response
 * */
export const fetchAccountProfile = (accountJSON : any): FetchUserAccountProfileAction => {
  const accountType: AccountTypes = getAccountType(accountJSON) ;
  const profile = (accountType === AccountTypes.Landlord) ? accountJSON[accountKeys.PM] : accountJSON[accountKeys.TENANT]; 
  let fetchedProfile : AccountState ;
  const baseProfile : Account = {
        accountType,
        firstName: profile[accountKeys.FIRSTNAME],
        lastName: profile[accountKeys.LASTNAME],
        email: profile[accountKeys.EMAIL],
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

/**
 * ----------------------------------------------------
 * fetchAccountProfile
 * ----------------------------------------------------
 * Sends a post requests to the homepairs login endpoint. Upon 
 * success, this function will dispatch the fetchAccountProfile 
 * action and then navigate to a different page. If not, it will 
 * call the the modalSetOffCallBack method if defined and return 
 * to the parent component.
 * @param {string} Email - credential passed to the endpoint
 * @param {string} Password - credential passed to the endpoint
 * @param {NavigationPropType} navigation - navigator passed from the component
 * @param {modalSetOffCallBack} modalSetOffCallBack -optional callback */
export const fetchAccount = (
    Email: string, Password: string, navigation: NavigationPropType, modalSetOffCallBack: (error?:String) => void = (error:String) => {}) => 
    {return async (dispatch: (arg0: any) => void) => {
        // TODO: GET POST URL FROM ENVIRONMENT VARIABLE ON HEROKU SERVER ENV VARIABLE
        await axios.post('https://homepairs-alpha.herokuapp.com/API/login/', {
            email: Email,
            password: Password,
          })
          .then((response) => {
            const accountType = getAccountType(response[responseKeys.DATA]);
            if(response[responseKeys.DATA][responseKeys.STATUS] === responseStatus.SUCCESS){
              dispatch(fetchAccountProfile(response[responseKeys.DATA]));
              if(response[responseKeys.DATA][responseKeys.ROLE] === PM){
                dispatch(fetchProperties(response[responseKeys.DATA][responseKeys.PROPERTIES]));
              }
              else { // Assume the role of the tenant 
                dispatch(fetchProperty(response[responseKeys.DATA][TENANT][responseKeys.PLACE]));
              }
              ChooseMainPage(accountType, navigation);
            }else{
              modalSetOffCallBack("Home Pairs was unable to log in. Please try again.");
            }
          })
          .catch((error) => {
            modalSetOffCallBack("Unable to establish a connection with HomePairs servers");
          })
          .finally(() => {
          });
        }; 
};

/**
 * ----------------------------------------------------
 * generateAccountForTenant
 * ----------------------------------------------------
 * Takes in information from the component and sends a request to the 
 * homepairs django api. This specifically will generate a tenant account and 
 * then return a response allowing the user access to the API.
 * @param {Account} accountDetails - Details passed from user input 
 * @param {String} password - Password input that the user want for their account
 * @param {NavigationPropType} navigation - navigation prop passed from component
 * @param {modalSetOffCallBack} modalSetOffCallBack - *optional callback
 */
export const generateAccountForTenant = (accountDetails: Account, password: String, navigation: NavigationPropType, modalSetOffCallBack?: (error?:String) => void) => {
  return async (dispatch: (arg0: any) => void) => {
      await axios.post('http://homepairs-alpha.herokuapp.com/tenant/register/', {
        firstName: accountDetails.firstName, 
        lastName: accountDetails.lastName,
        email: accountDetails.email, 
        streetAddress: accountDetails.streetAddress, 
        city: accountDetails.city,
        password, 
      })
      .then((response) => {
        if(response[responseKeys.DATA][responseKeys.STATUS] === responseStatus.SUCCESS){
          dispatch(fetchAccountProfile(response[responseKeys.DATA]));
          dispatch(fetchProperty(response[responseKeys.DATA][TENANT][responseKeys.PLACE]));
          ChooseMainPage(AccountTypes.Tenant, navigation);
        } else {
          modalSetOffCallBack("Home Pairs was unable create the account. Please try again.");
        }
      })
      .catch(() => {
        modalSetOffCallBack("Connection to the server could not be established.");
      });
  };
};

/**
 * ----------------------------------------------------
 * generateAccountForPM
 * ----------------------------------------------------
 * Takes in information from the component and sends a request to the 
 * homepairs django api. This specifically will generate a property manager account and 
 * then return a response allowing the user access to the API.
 * @param {Account} accountDetails - Details passed from user input 
 * @param {String} password - Password input that the user want for their account
 * @param {NavigationPropType} navigation - navigation prop passed from component
 * @param {modalSetOffCallBack} modalSetOffCallBack - *optional callback
 */
export const generateAccountForPM = (accountDetails: Account, password: String, navigation: NavigationPropType, modalSetOffCallBack?: (error?:String) => void) => {
    return async (dispatch: (arg0: any) => void) => {
      await axios.post('http://homepairs-alpha.herokuapp.com/pm/register', {
          firstName: accountDetails.firstName, 
          lastName: accountDetails.lastName,
          email: accountDetails.email, 
          password,
        })
        .then((response) => {
          if(response[responseKeys.DATA][responseKeys.STATUS] === responseStatus.SUCCESS){
            dispatch(fetchAccountProfile(response[responseKeys.DATA]));
            dispatch(fetchProperties(response[responseKeys.DATA][responseKeys.PROPERTIES]));
            ChooseMainPage(AccountTypes.Landlord, navigation);
          }else{
            modalSetOffCallBack("Home Pairs was unable create the account. Please try again.");
          }
        })
        .catch(() => {
          modalSetOffCallBack("Connection to the server could not be established.");
        });
    };
};

