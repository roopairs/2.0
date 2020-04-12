/**
 * Here, we will define all endpoints of the different API's that the 
 * application will be connecting to. Any, endpoint that this application will be 
 * using should be put and referenced from this file.  
 */
import axios from 'axios';
import { NavigationRouteHandler, getAccountType, categoryToString } from 'homepairs-utilities';
import * as HomePairsStateActions from 'homepairs-redux-actions';
import { AccountTypes, Account, Property, AddNewPropertyState, EditPropertyState, Appliance, AddApplianceState, NewServiceRequest } from 'homepairs-types';
import { navigationPages } from './RouteConstants';
import { ChooseMainPage } from './Routes';

export const HOMEPAIRS_LOGIN_ENDPOINT = 'https://homepairs-mytest.herokuapp.com/login/';
export const HOMEPAIRS_REGISTER_TENANT_ENDPOINT = 'https://homepairs-mytest.herokuapp.com/tenant/register/';
export const HOMEPAIRS_REGISTER_PM_ENDPOINT = 'https://homepairs-mytest.herokuapp.com/pm/register';

export const HOMEPAIRS_PROPERTY_ENDPOINT = 'https://homepairs-mytest.herokuapp.com/property/';
export const HOMEPAIRS_APPLIANCE_ENDPOINT = 'https://homepairs-mytest.herokuapp.com/appliances/';
export const HOMEPAIRS_TENANT_EDIT_ENDPOINT = "https://homepairs-mytest.herokuapp.com/tenant/update/";
export const HOMEPAIRS_SERVICEPROVIDER_GET_ENDPOINT = "https://homepairs-mytest.herokuapp.com/serviceprovider/";

export const HOMEPAIRS_SERVICE_REQUEST_ENDPOINT = 'https://homepairs-mytest.herokuapp.com/servicerequest/';


const {AccountActions, PropertyListActions, ServiceActions, SessionActions} = HomePairsStateActions;
const {parseAccount} = AccountActions;
const {fetchProperties, fetchPropertyAndPropertyManager, addProperty, updateProperty} = PropertyListActions;
const {setAccountAuthenticationState} = SessionActions;

const SUCCESS = 'success';
const FAILURE = 'failure';
const PM = 'pm';

// console.log(navigationPages);

const {SingleProperty, ServiceRequestScreen} = navigationPages;

export const updateTenant = async ({...props}) => {
    const {propId, email, firstName, lastName, phoneNumber} = props;
    await axios.post(HOMEPAIRS_TENANT_EDIT_ENDPOINT, {email, propId, firstName, lastName, phoneNumber}).then((result) =>{
        console.log(result);
    }).catch(error =>{
        console.log(error);
    });
};

export const fetchServiceRequests = async (propId: string) => {
    const completedEndpoint = `${HOMEPAIRS_SERVICE_REQUEST_ENDPOINT}${propId}/`;
    const results = await axios.get(completedEndpoint);
    return results;
};

/**
 * ----------------------------------------------------
 * fetchAccount
 * ----------------------------------------------------
 * Sends a post requests to the homepairs login endpoint. Upon 
 * success, this function will dispatch the parseAccount 
 * action and then navigate to a different page. If not, it will 
 * call the the modalSetOffCallBack method if defined and return 
 * to the parent component.
 * @param {string} Email - credential passed to the endpoint
 * @param {string} Password - credential passed to the endpoint
 * @param {NavigationRouteHandler} navigation - navigator passed from the component
 * @param {modalSetOffCallBack} modalSetOffCallBack -optional callback */
export const fetchAccount = (
    Email: string, Password: string, navigation: NavigationRouteHandler, modalSetOffCallBack: (error?:String) => void = (error:String) => {}) => 
    {
        return async (dispatch: (arg0: any) => void) => {
        // TODO: GET POST URL FROM ENVIRONMENT VARIABLE ON HEROKU SERVER ENV VARIABLE
        await axios.post(HOMEPAIRS_LOGIN_ENDPOINT, {
            email: Email,
            password: Password,
            })
            .then((response) => {
            const {data} = response;
            const {status, role} = data;
            const accountType = getAccountType(data);
            if(status === SUCCESS){
                // Set the login state of the application to authenticated
                dispatch(setAccountAuthenticationState(true));
                dispatch(parseAccount(data));
                
                if(role === PM){ // role = property manager
                    const {properties} = data;
                    dispatch(fetchProperties(properties));
                } else { // Assume role = tenant
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
            .catch((error) => {
                modalSetOffCallBack("Unable to establish a connection with HomePairs servers");
                console.log(error);
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
    const {firstName, lastName, email, address} = accountDetails;
    return async (dispatch: (arg0: any) => void) => {
        await axios.post(HOMEPAIRS_REGISTER_TENANT_ENDPOINT, {
          firstName, 
          lastName,
          email, 
          address, 
          password, 
        })
        .then((response) => {
          const {data} = response;
          const {status} = data;
          if(status === SUCCESS){
            dispatch(setAccountAuthenticationState(true));
            dispatch(parseAccount(data));
            /* same as 
               dispatch(fetchProperty(response[responseKeys.DATA][TENANT][responseKeys.PROPERTIES]));
            */
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
        await axios.post(HOMEPAIRS_REGISTER_PM_ENDPOINT, {
            firstName: accountDetails.firstName, 
            lastName: accountDetails.lastName,
            email: accountDetails.email, 
            password,
          })
          .then((response) => {
            const {data} = response;
            const {status, properties} = data;
            if(status === SUCCESS){
              dispatch(setAccountAuthenticationState(true));
              dispatch(parseAccount(data));
              dispatch(fetchProperties(properties));
              ChooseMainPage(AccountTypes.PropertyManager, navigation);
            }else{
              modalSetOffCallBack("Home Pairs was unable create the account. Please try again.");
            }
          })
          .catch((error) => {
            console.log(error);
            modalSetOffCallBack("Connection to the server could not be established.");
          });
      };
  };

  /**
 * ----------------------------------------------------
 * postNewProperty
 * ----------------------------------------------------
 * Sends an request to the homepairs backend attempting to mutate the data of an exisiting property. It takes in
 * the previous property (TODO: Update this to be propId when backend resolves properties from propId) and sends this 
 * data to backend in order for it to resolve which property is to be updated. The intitial state of the component is invoked 
 * and the modal navigates to back to the previous page upon a success. 
 * 
 * @param {Property} newProperty -property to add to the homepairs database
 * @param {AddNewPropertyState} info -information used to indicate the property manager of the property
 * @param {setIntialState} setInitialState -sets state of calling component to its original state. Should be used for forms
 * @param {onChangeModalVisibility} onChangeModalVisibility -changes the visibility of the modal of the calling component
 */
export const postNewProperty = (
    newProperty: Property,
    info: AddNewPropertyState,
    setInitialState: () => void,
    displayError: (msg: string) => void,
    navigation: NavigationRouteHandler,
) => {
    return async (dispatch: (arg0: any) => void) => {
        await axios
            .post( HOMEPAIRS_PROPERTY_ENDPOINT,
                {
                    streetAddress: newProperty.address,
                    numBed: newProperty.bedrooms,
                    numBath: newProperty.bathrooms,
                    maxTenants: newProperty.tenants,
                    pm: info.email,
                    token: info.roopairsToken,
                },
            )
            .then( response => {
                const {data} = response;
                const {status, propId} = data;
                if ( status === SUCCESS ) {
                    const newProp : Property = {
                      propId,
                      address: newProperty.address,
                      bedrooms: newProperty.bedrooms, 
                      bathrooms: newProperty.bathrooms, 
                      tenants: newProperty.tenants,
                    };
                    dispatch(addProperty(newProp));
                    setInitialState();
                    navigation.goBack();
                } else {
                    const {error} = data;
                    displayError(error);
                }
            })
            .catch(() => {});
    };
};

/**
 * ----------------------------------------------------
 * postUpdatedProperty
 * ----------------------------------------------------
 * Sends a request to the homepairs API to update a selected property. On success,
 * it updates the redux-store and invokes a callback intended to close the modal
 * of the calling component. Upon failure, an error message should be sent.
 * @param {Property} editProperty -contents of the property to be updated
 * @param {EditPropertyState} info -information passed to the api to help determine which property in the
 * servers to update
 * @param {onChangeModalVisibility} onChangeModalVisibility -changes the visibility of the modal
 * of the calling component
 */
export const postUpdatedProperty = (
    editProperty: Property,
    info: EditPropertyState,
    displayError: (msg: string) => void,
    navigation: any,
) => {
    return async (dispatch: (arg0: any) => void) => {
        return axios
            .put( HOMEPAIRS_PROPERTY_ENDPOINT,
                {
                  propId: editProperty.propId,
                  streetAddress: editProperty.address,
                  numBed: editProperty.bedrooms,
                  numBath: editProperty.bathrooms,
                  maxTenants: editProperty.tenants,
                  pm: info.email,
                  token: info.roopairsToken,
                },
            )
            .then(response => {
                const {data} = response;
                const {status} = data;
                if ( status === SUCCESS) {
                    navigation.replace(SingleProperty, {propId: editProperty.propId});
                    dispatch(updateProperty(info.index, editProperty));
                } else {
                    const {error} = data;
                    displayError(error);
                }
            })
            .catch((error) => {
              console.log(error);
            });
    };
};

/**
 * Callback is intended to set the input forms of the component used to send
 * the request back to the base values. This could be empty or predetermined.
 * @callback setInitialState */
/**
 * Callback is intended to change the state of a modal of the calling component
 * after the request has been sent. This should be optional.
 * @callback onChangeModalVisibility
 * @param {boolean} check -determines if the components modal should be visible */

// make docs
export const postNewAppliance = (
    newAppliance: Appliance,
    info: AddApplianceState,
    setInitialState: () => void,
    displayError: (msg: string) => void,
    navigation: NavigationRouteHandler,
) => {
    return async () => {
        await axios
            .post(HOMEPAIRS_APPLIANCE_ENDPOINT,
                {
                    propId: info.property.propId,
                    token: info.token,
                    name: newAppliance.appName, 
                    manufacturer: newAppliance.manufacturer, 
                    category: categoryToString(newAppliance.category),
                    modelNum: newAppliance.modelNum, 
                    serialNum: newAppliance.serialNum, 
                    location: newAppliance.location, 
                },
            )
            .then(response => {
                const {data} = response;
                const {status} = data;
                if ( status === SUCCESS) {
                    const {property} = info;
                    const {propId} = property;
                    setInitialState();
                    navigation.replace(SingleProperty, {propId});
                } else {
                    const {error} = data;
                    displayError(error);
                }
            })
            .catch();
    };
};

/**
 * ----------------------------------------------------
 * postUpdatedProperty
 * ----------------------------------------------------
 * Sends a request to the homepairs API to update a selected property. On success,
 * it updates the redux-store and invokes a callback intended to close the modal
 * of the calling component. Upon failure, an error message should be sent.
 * @param {Property} editProperty -contents of the property to be updated
 * @param {EditPropertyState} info -information passed to the api to help determine which property in the
 * servers to update
 * @param {onChangeModalVisibility} onChangeModalVisibility -changes the visibility of the modal
 * of the calling component
 */
export const postUpdatedAppliance = (
    propId: string,
    editAppliance: Appliance,
    displayError: (msg: string) => void,
    navigation: NavigationRouteHandler,
) => {
    return async () => {
        return axios
            .put( HOMEPAIRS_APPLIANCE_ENDPOINT,
                {
                    appId: editAppliance.applianceId,
                    newName: editAppliance.appName, 
                    newManufacturer: editAppliance.manufacturer, 
                    newCategory: categoryToString(editAppliance.category),
                    newModelNum: editAppliance.modelNum, 
                    newSerialNum: editAppliance.serialNum, 
                    newLocation: editAppliance.location,
                },
            )
            .then(response => {
                const {data} = response;
                const {status} = data;
                if (status === SUCCESS) {
                  navigation.replace(SingleProperty, {propId});
                } else {
                    const {error} = data;
                    displayError(error);
                }
            })
            .catch(() => {});
    };
};

export const postNewServiceRequest = (
    newServiceRequest: NewServiceRequest, 
    displayError: (msg: string) => void, 
    navigation: NavigationRouteHandler,
) => {
    return async () => {
        await axios
            .post(HOMEPAIRS_SERVICE_REQUEST_ENDPOINT, 
            {
                token: newServiceRequest.token, 
                propId: newServiceRequest.propId, 
                appId: newServiceRequest.appId, 
                provId: newServiceRequest.providerId, 
                serviceType: newServiceRequest.serviceType,
                serviceCategory: newServiceRequest.serviceCategory, 
                serviceDate: newServiceRequest.serviceDate, 
                details: newServiceRequest.details,
            })
            .then(response => {
                const {data} = response;
                const {status} = data;
                if (status === SUCCESS) {
                    // navigation go to confirmation screen
                    navigation.replace(ServiceRequestScreen);
                } else {
                    const {error} = data;
                    displayError(error);
                }
            });
    };
};