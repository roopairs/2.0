/**
 * Here, we will define all endpoints of the different API's that the 
 * application will be connecting to. Any, endpoint that this application will be 
 * using should be put and referenced from this file.  
 */
import axios from 'axios';
import { getAccountType, categoryToString, isNullOrUndefined } from 'homepairs-utilities';
import { NavigationRouteHandler, ChooseMainPage, navigationPages} from 'homepairs-routes';
import * as HomePairsStateActions from 'homepairs-redux-actions';
import { AsyncStorage } from 'react-native';
import { 
    AccountTypes, 
    Account, 
    Property, 
    AddNewPropertyState, 
    EditPropertyState, 
    Appliance, 
    AddApplianceState, 
    NewServiceRequest, 
    ServiceProvider,
} from 'homepairs-types';
import {
    HOMEPAIRS_APPLIANCE_ENDPOINT, 
    HOMEPAIRS_LOGIN_ENDPOINT, 
    HOMEPAIRS_PROPERTY_ENDPOINT, 
    HOMEPAIRS_REGISTER_PM_ENDPOINT, 
    HOMEPAIRS_REGISTER_TENANT_ENDPOINT,
    HOMEPAIRS_SERVICEPROVIDER_GET_ENDPOINT,
    HOMEPAIRS_SERVICE_REQUEST_ENDPOINT,
    HOMEPAIRS_TENANT_EDIT_ENDPOINT,
    HOMEPAIRS_PREFERRED_PROVIDER_ENDPOINT,
} from './constants';


const {AccountActions, PropertyListActions, SessionActions, PreferredProviderActions} = HomePairsStateActions;
const {parseAccount} = AccountActions;
const {fetchProperties, fetchPropertyAndPropertyManager, addProperty, updateProperty} = PropertyListActions;
const {setAccountAuthenticationState} = SessionActions;
const {refreshServiceProviders, removeServiceProvider} = PreferredProviderActions;

/* * JSON KEYS * */
const SUCCESS = 'success';
const FAILURE = 'failure';
const PREFERRED_PROVIDERS = 'TODO: Change this key to that returned from the backend';
const PM = 'pm';
/* * JSON KEYS * */


const {SingleProperty, ServiceRequestScreen} = navigationPages;

/**
 * ----------------------------------------------------
 * parsePreferredProviders
 * ---------------------------------------------------- 
 * A helper function that takes in a json array that is intended to have the information recieved 
 * from the fetch request for preferred providers. 
 * @param {any[]} preferredServiceProviderJSON -The array of json objects
 */
export const parsePreferredProviders: (preferredServiceProviderJSON: any[]) => ServiceProvider[] = 
(preferredServiceProviderJSON: any[]) => {
    return preferredServiceProviderJSON.map(serviceProvider => {
        const {provId, name, email, phoneNum, prefId,contractLic, skills, 
            founded, payRate, timesHired, earliestHire, logo} = serviceProvider;
        // TODO: Handle loading the logo image asset recieved from the backend response
        return {
            provId, name, email, prefId,
            phoneNum, contractLic, skills, 
            founded, payRate, timesHired, 
            earliestHire: isNullOrUndefined(earliestHire) ? undefined : new Date(earliestHire), 
            logo,
        };
    });
};

/** 
* ----------------------------------------------------
* fetchPreferredProviders
* ---------------------------------------------------- 
* Makes a get request to the homepairs backend retrieving all preferred provider from the account 
* associatted with the account Email. This function calls the dispatch method and updates the store 
* upon success.
* 
* @param {ServiceProvider} serviceProvider -The object holding in the service provider to be removed
* @param {string} accountEmail -The email of the associated account. This is used to by the backend to 
* determine which account needs the specified provider to be removed
* @param {(error:string) => any} onError -An optional callback function that will handle an error 
* thrown if the api request fails
*/
export const fetchPreferredProviders = (pmId: string) => {
    const endpoint = `${HOMEPAIRS_PREFERRED_PROVIDER_ENDPOINT}${pmId}/`;
    return async (dispatch: (func: any) => void) => {
        await axios.get(endpoint)
        .then(result => {
            const {data} = result;
            const {providers} = data;
            console.log(providers)
            AsyncStorage.setItem('preferredProviders', JSON.stringify(data));
            const parsedProviders = parsePreferredProviders(providers);
            dispatch(refreshServiceProviders(parsedProviders as ServiceProvider[]));
            return result;
        })
        .catch(error => {
            return Promise.reject(error);
        });
    };
};

/**
 * ----------------------------------------------------
 * postPreferredProvider
 * ---------------------------------------------------- 
 * Makes a post request to the homepairs backend adding a preferred provider from the account 
 * associatted with the account Email. Returns the result of the request upon completion. 
 * 
 * @param {string} accountEmail -The email of the associated account. This is used to by the backend to 
 * determine which account needs the specified provider to be added.
 * @param {ServiceProvider} serviceProvider -The object holding in the service provider to be added.
 * @param {(error:string) => any} onError -An optional callback function that will handle an error 
 * thrown if the api request fails.
 */
export const postPreferredProvider = async (
    pmId: number, phoneNum: string,  onError: (error:string) => any = console.log) => {
    const endpoint = `${HOMEPAIRS_PREFERRED_PROVIDER_ENDPOINT}`;
    await axios.post(endpoint, {phoneNum, pmId: String(pmId)})
    .then(response => {
        const {data} = response;
        const {status} = data;
        if(status === SUCCESS){
            fetchPreferredProviders(String(pmId));
        }else{
            const {error} = data;
            onError(error);
        }
    }).catch(
        error => {
            onError(error);
    });
};

 
/**
 * ----------------------------------------------------
 * deletePreferredProvider
 * ---------------------------------------------------- 
 * Makes a delete request to the homepairs backend removing a preferred provider from the account 
 * associatted with the account Email. Returns the result upon completion. This function calls 
 * a dispatch method and removes the service provider from the store upon success and handles the 
 * error upon failure.
 * 
 * @param {string} accountEmail -The email of the associated account. This is used to by the backend to 
 * determine which account needs the specified provider to be removed
 * @param {ServiceProvider} serviceProvider -The object holding in the service provider to be removed
 * @param {(error:string) => any} onError -An optional callback function that will handle an error 
 * thrown if the api request fails
 */
export const deletePreferredProvider = (
    serviceProvider: ServiceProvider, onError: (error:string) => any = console.log) => {
    const {prefId} = serviceProvider;
    const endpoint = `${HOMEPAIRS_PREFERRED_PROVIDER_ENDPOINT}`;
    // Simply print the error if no error function was defined, otherwise use the defined function
    return async (dispatch: (func: any) => void) => { 
        await axios.delete(endpoint, {data: {prefId}})
        .then(response => {
            const {data} = response;
            const {status} = data;
            console.log(response)
            if(status === SUCCESS){
                dispatch(removeServiceProvider(serviceProvider));
            }else{
                const {error} = data;
                console.log(error)
                onError(error);
            }
        }).catch(error => {
            onError(error);
        });
    };
};


/**
 * ----------------------------------------------------
 * updateTenant
 * ---------------------------------------------------- 
 * Makes an POST request to the homepairs backend overwriting a tenants information.
 * Upon completion the result of the request is printed to the console.
 * 
 * @param {object} props -List of information used to define the tenant. Expected 
 * information follows: propId, email, firstName, lastName, phoneNumber
 */
export const updateTenant = async ({...props}) => {
    const {propId, email, firstName, lastName, phoneNumber} = props;
    await axios.post(HOMEPAIRS_TENANT_EDIT_ENDPOINT, 
        {email, propId, firstName, lastName, phoneNumber}).then((result) =>{
        console.log(result);
    }).catch(error =>{
        console.log(error);
    });
};

/**
 * ----------------------------------------------------
 * fetchServiceRequests
 * ---------------------------------------------------- 
 * Makes a GET request to the homepairs backend and retrieves as list of service 
 * request objects for a specified property
 * 
 * @param {string} propId -Identity of the the property service request will fetch
 */
export const fetchServiceRequests = async (propId: string) => {
    const completedEndpoint = `${HOMEPAIRS_SERVICE_REQUEST_ENDPOINT}${propId}/`;
    const results = await axios.get(completedEndpoint);
    return results;
};

/**
 * ----------------------------------------------------
 * fetchAccount
 * ----------------------------------------------------
 * Sends a post requests to the homepairs login endpoint. Upon success, this 
 * function will dispatch the parseAccount action and then navigate to a 
 * different page. If not, it will call the the modalSetOffCallBack method if 
 * defined and return to the parent component.
 * 
 * Dispatches to redux store. No need to make it async!!
 * 
 * @param {string} Email -Credential passed to the endpoint
 * @param {string} Password -Credential passed to the endpoint
 * @param {NavigationRouteHandler} navigation -Navigator passed from the component
 * @param {modalSetOffCallBack} modalSetOffCallBack -Optional callback that will close 
 * the calling modal if it exists
 * */
export const fetchAccount = (
    Email: string, Password: string, navigation: NavigationRouteHandler, 
    modalSetOffCallBack: (error?:String) => void = (error: String) => {}) => 
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
            console.log(data)
            if(status === SUCCESS){
                // Set the login state of the application to authenticated
                dispatch(setAccountAuthenticationState(true));
                dispatch(parseAccount(data));
                
                if(role === PM){ // role = property manager
                    const {properties, pm} = data;
                    const {pmId} = pm; 
                    dispatch(fetchProperties(properties));
                    dispatch(fetchPreferredProviders(pmId));
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
 * 
 * Dispatches to redux store. No need to make it async!!
 * 
 * @param {Account} accountDetails -Details passed from user input 
 * @param {String} password - Password input that the user want for their account
 * @param {NavigationPropType} navigation -Navigation prop passed from component
 * @param {modalSetOffCallBack} modalSetOffCallBack - *Optional callback that will close 
 * the calling modal if it exists
 */
export const generateAccountForTenant = (accountDetails: Account, password: String, 
    navigation: NavigationRouteHandler, modalSetOffCallBack?: (error?:String) => void) => {
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
            console.log(status);
            modalSetOffCallBack("Home Pairs was unable create the account. Please try again.");
          }
        })
        .catch(error => {
          console.log(error);
          modalSetOffCallBack("Connection to the server could not be established.");
        });
    };
  };
  
  /**
   * ----------------------------------------------------
   * generateAccountForPM
   * ----------------------------------------------------
   * Takes in information from the component and sends a request to the 
   * homepairs django api. This specifically will generate a property 
   * manager account and then return a response allowing the user access 
   * to the API.
   * 
   * Dispatches to redux store. No need to make it async!!
   * 
   * @param {Account} accountDetails - Details passed from user input 
   * @param {String} password - Password input that the user want for their account
   * @param {NavigationPropType} navigation - Navigation prop passed from component
   * @param {modalSetOffCallBack} modalSetOffCallBack - *Optional callback to 
   * close/navigate from the modal
   */
  export const generateAccountForPM = (accountDetails: Account, password: String, 
    navigation: NavigationRouteHandler, modalSetOffCallBack?: (error?:String) => void) => {
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
 * Dispatches to redux store. No need to make it async!!
 * 
 * @param {Property} newProperty -Property to add to the homepairs database
 * @param {AddNewPropertyState} info -Information used to indicate the property manager of the property
 * @param {setIntialState} setInitialState -Sets state of calling component to its original state. Should be used for forms
 * @param {onChangeModalVisibility} onChangeModalVisibility -Changes the visibility of the modal of the calling component
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
            .then(response => {
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
            .catch(error => console.log(error));
    };
};

/**
 * ----------------------------------------------------
 * postUpdatedProperty
 * ----------------------------------------------------
 * Sends a request to the homepairs API to update a selected property. On success,
 * it updates the redux-store and invokes a callback intended to close the modal
 * of the calling component. Upon failure, an error message should be sent.
 * 
 * Dispatches to redux store. No need to make it async!!
 * 
 * @param {Property} editProperty -Contents of the property to be updated
 * @param {EditPropertyState} info -Information passed to the api to help determine which property in the
 * servers to update
 * @param {onChangeModalVisibility} onChangeModalVisibility -Changes the visibility of the modal
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
                    navigation.resolveModalReplaceNavigation(SingleProperty, 
                        {propId: editProperty.propId});
                    dispatch(updateProperty(editProperty));
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
 * @param {boolean} check -Determines if the components modal should be visible */

// make docs
export const postNewAppliance = async (
    newAppliance: Appliance,
    info: AddApplianceState,
    setInitialState: () => void,
    displayError: (msg: string) => void,
    navigation: NavigationRouteHandler,
) => {
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
            if (status === SUCCESS) {
                const {property} = info;
                const {propId} = property;
                setInitialState();
                navigation.resolveModalReplaceNavigation(SingleProperty, {propId});
            } else {
                const {error} = data;
                displayError(error);
            }
        })
        .catch(error => console.log(error));
};

/**
 * ----------------------------------------------------
 * postUpdatedProperty
 * ----------------------------------------------------
 * Sends a request to the homepairs API to update a selected property. On success,
 * it updates the redux-store and invokes a callback intended to close the modal
 * of the calling component. Upon failure, an error message should be sent.
 * @param {Property} editProperty -contents of the property to be updated
 * @param {EditPropertyState} info -information passed to the api to help 
 * determine which property in the servers to update
 * @param {onChangeModalVisibility} onChangeModalVisibility -changes the 
 * visibility of the modal of the calling component
 */
export const postUpdatedAppliance = async (
    propId: string,
    editAppliance: Appliance,
    displayError: (msg: string) => void,
    navigation: NavigationRouteHandler,
) => {
        await axios
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
                  navigation.resolveModalReplaceNavigation(SingleProperty, {propId});
                } else {
                    const {error} = data;
                    displayError(error);
                }
            })
            .catch(error => console.log(error));
};

export const postNewServiceRequest = async (
    newServiceRequest: NewServiceRequest, 
    displayError: (msg: string) => void, 
    navigation: NavigationRouteHandler,
) => {
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
                navigation.resolveModalReplaceNavigation(ServiceRequestScreen);
            } else {
                const {error} = data;
                displayError(error);
            }
        }).catch(error => {
            console.log(error);
        });
};