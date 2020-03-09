import axios from 'axios';
import { navigationPages } from 'src/Routes/RouteConstants';
import { AsyncStorage } from 'react-native';
import { NavigationRouteHandler } from 'homepairs-utilities';
import { 
  FetchUserAccountProfileAction, 
  PropertyManagerAccount, 
  Account, 
  TenantAccount, 
  AccountState, 
  AccountTypes,
  HomePairsResponseKeys, 
} from '../types';
import { fetchProperties, fetchPropertyAndPropertyManager } from '../property-list/actions';
import { setAccountAuthenticationState } from '../session/actions';


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
  * Store Account Data 
  * ----------------------------------------------------
  * An async function that stores in the account profile once recieved. 
  * This should initially be called upon user authentication. 
  * @param {Account} account 
  */
const storeAccountData = async (accountJSON: any) => {
  try {
    await AsyncStorage.setItem('profile', JSON.stringify(accountJSON));
  } catch (error) {
    // Error saving data
  }
};

/**
 * ----------------------------------------------------
 * ChooseMainPage
 * ----------------------------------------------------
 * This function navigates to a specific page based on the Account 
 * Type passed in.  
 * @param {AccountTypes} accountType
 * @param {NavigationRouteHandler} navigation -navigator passed from calling component */
export function ChooseMainPage(accountType: AccountTypes, navigation: NavigationRouteHandler) {
    if(accountType === AccountTypes.Tenant){
      navigation.navigate(navigationPages.TenantProperty);
      return;
    }
    navigation.navigate(navigationPages.PropertiesScreen);  
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
  if(accountJSON[responseKeys.ROLE] === PM){ 
    return AccountTypes.PropertyManager;
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
            manId: profile[accountKeys.MANID],
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
    storeAccountData(accountJSON);
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
 * @param {NavigationRouteHandler} navigation - navigator passed from the component
 * @param {modalSetOffCallBack} modalSetOffCallBack -optional callback */
export const fetchAccount = (
    Email: string, Password: string, navigation: NavigationRouteHandler, modalSetOffCallBack: (error?:String) => void = (error:String) => {}) => 
    {return async (dispatch: (arg0: any) => void) => {
        // TODO: GET POST URL FROM ENVIRONMENT VARIABLE ON HEROKU SERVER ENV VARIABLE
        await axios.post('https://homepairs-mytest.herokuapp.com/login/', {
            email: Email,
            password: Password,
          })
          .then((response) => {
            const {data} = response;
            const {status} = data;
            const accountType = getAccountType(response[responseKeys.DATA]);
            if(status === responseStatus.SUCCESS){
              // Set the login state of the application to authenticated
              dispatch(setAccountAuthenticationState(true));
              dispatch(fetchAccountProfile(response[responseKeys.DATA]));

              if(response[responseKeys.DATA][responseKeys.ROLE] === PM){ // role = property manager
                dispatch(fetchProperties(response[responseKeys.DATA][responseKeys.PROPERTIES]));
              }
              else { // Assume role = tenant
                const {properties, tenant} = data;
                const {pm} = tenant;
                const {pmInfo} = pm;
                dispatch(fetchPropertyAndPropertyManager(properties, pmInfo));
              }
              // Navigate page based on the Account Type
              ChooseMainPage(accountType, navigation);
            }else{
              modalSetOffCallBack("Home Pairs was unable to log in. Please try again.");
            }
          })
          .catch(() => {
            modalSetOffCallBack("Unable to establish a connection with HomePairs servers");
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
export const generateAccountForTenant = (accountDetails: Account, password: String, navigation: NavigationRouteHandler, modalSetOffCallBack?: (error?:String) => void) => {
  return async (dispatch: (arg0: any) => void) => {
      await axios.post('https://homepairs-alpha.herokuapp.com/tenant/register/', {
        firstName: accountDetails.firstName, 
        lastName: accountDetails.lastName,
        email: accountDetails.email, 
        address: accountDetails.address, 
        password, 
      })
      .then((response) => {
        if(response[responseKeys.DATA][responseKeys.STATUS] === responseStatus.SUCCESS){
          dispatch(setAccountAuthenticationState(true));
          dispatch(fetchAccountProfile(response[responseKeys.DATA]));

          const {properties, tenant} = response.data;
          const {pm} = tenant;
          const {pmInfo} = pm;

          dispatch(fetchPropertyAndPropertyManager(properties, pmInfo));
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
 * @param {modalSetOffCallBack} modalSetOffCallBack - *optional callback to close/navigate from the modal
 */
export const generateAccountForPM = (accountDetails: Account, password: String, navigation: NavigationRouteHandler, modalSetOffCallBack?: (error?:String) => void) => {
    return async (dispatch: (arg0: any) => void) => {
      await axios.post('https://homepairs-alpha.herokuapp.com/pm/register', {
          firstName: accountDetails.firstName, 
          lastName: accountDetails.lastName,
          email: accountDetails.email, 
          password,
        })
        .then((response) => {
          if(response[responseKeys.DATA][responseKeys.STATUS] === responseStatus.SUCCESS){
            dispatch(setAccountAuthenticationState(true));
            dispatch(fetchAccountProfile(response[responseKeys.DATA]));
            dispatch(fetchProperties(response[responseKeys.DATA][responseKeys.PROPERTIES]));
            ChooseMainPage(AccountTypes.PropertyManager, navigation);
          }else{
            modalSetOffCallBack("Home Pairs was unable create the account. Please try again.");
          }
        })
        .catch(() => {
          modalSetOffCallBack("Connection to the server could not be established.");
        });
    };
};

