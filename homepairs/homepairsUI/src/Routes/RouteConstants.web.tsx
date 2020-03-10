import { MainAppStackType } from 'homepairs-types';
import * as Endpoints from './RemoteEndpoints';

export {Endpoints};

export const LOGIN = '/authentication/login';
export const SIGNUP = '/authentication/sign-up';
export const ROOPAIRS_LOGIN = '/authentication/roopairs-login';
export const LOGIN_MODAL = '/authentication/logging-in';
export const CREATE_ACCOUNT_MODAL = '/authentication/creating-account';
export const ROOPAIRS_LOGIN_MODAL = '/authentication/logging-in-roopairs';

export const PROPERTY_LIST = '/admin/properties';
export const TENANT_PROPERTY = '/tenant/home';
export const PROPERTY = '/admin/property';

export const ADD_PROPERTY_MODAL = '/admin/properties/add-property';
export const EDIT_PROPERTY_MODAL = '/admin/property/edit-property';
export const ADD_TENANT_MODAL = '/admin/property/add-tenant';
export const EDIT_TENANT_MODAL = '/admin/property/edit-tenant';
export const ADD_APPLIANCE_MODAL = '/admin/property/add-appliance';
export const EDIT_APPLIANCE_MODAL = '/admin/property/edit-appliance';


export const SERVICE_REQUEST = '/admin/service-requests';
export const NEW_SERVICE_REQUEST = '/admin/service-requests/new-service-requests';
export const SERVICE_REQUEST_INFO_MODAL = '/admin/service-requests/information';

export const ACCOUNT_SETTINGS = '/admin/account-settings';


/**
 * All keys that can be mapped to any page in the react navigator should 
 * be stored here. This is so there changes to one key can be affect by all
 * files instead of use having to go and individually changing keys. 
 */
export const navigationKeys: {[id:string]: string} = {
    AccountPropertiesStack: 'AccountPropertiesStack',
    AddNewPropertyModal: 'AddNewPropertyModal',
    Loading: 'Loading',
    Main: 'Main',
    Auth: 'Auth',
    AuthStack: 'AuthStack',
    LoadingScreen: 'LoadingScreen',
    PropertiesScreen: 'PropertiesScreen',
    Login: 'Login',
    SignUp: 'SignUp',
    Connect: 'Connect',
    Properties: 'Properties',
    PropertyStack: 'PropertyStack',
    ServiceRequest: 'ServiceRequest',
    ServiceRequestScreen: 'ServiceRequestScreen',
    AccountSettings: 'AccountSettings', 
    Account: 'AccountStack',
    NewRequest: 'NewRequest',
    TenantProperty: 'TenantProperty',
    AccountProperties: 'AccountProperties',
    DetailedProperty: 'DetailedProperty',
    SingleProperty: 'SingleProperty',
    EditPropertyModal: 'EditPropertyModal',
    AddApplianceModal: 'AddApplianceModal', 
    EditApplianceModal: 'EditApplianceModal',


    RoopairsLogin: 'RoopairsLogin',
    RoopairsLoggingInModal: 'RoopairsLoggingInModal',

    SignUpScreen: 'SignUpScreen',
    CreatingAccountModal: 'CreatingAccountModal',

    LoginScreen: 'LoginScreen',
    LoggingInModal: 'LoggingInModal',

    ModalStack: 'ModalStack',

    AddTenantModal: 'AddTenantModal',
    EditTenantModal: 'EditTenantModal',
};

/**
 * These are were all leaves will be stored for quick reference. This should be used when 
 * directly navigating to a page. These leaves should also be stored in the navigationKeys 
 * object as well. 
 */
export const navigationPages = {
    // Property Pages
    PropertiesScreen: PROPERTY_LIST,
    TenantProperty: TENANT_PROPERTY,
    SingleProperty: PROPERTY,
    // Property Stack Modals 
    AddNewPropertyModal: ADD_PROPERTY_MODAL,
    EditPropertyModal: EDIT_PROPERTY_MODAL,
    AddTenantModal: ADD_TENANT_MODAL,
    EditTenantModal: EDIT_TENANT_MODAL,
    AddApplianceModal: ADD_APPLIANCE_MODAL, 
    EditApplianceModal: EDIT_APPLIANCE_MODAL,

    // Service Request Pages
    ServiceRequestScreen: SERVICE_REQUEST,
    NewRequest: NEW_SERVICE_REQUEST,
    ServiceRequestModal: SERVICE_REQUEST_INFO_MODAL,

    // Account Settings Pages 
    AccountSettings: ACCOUNT_SETTINGS, 

    // Authentication Pages
    LoginScreen: LOGIN,
    RoopairsLogin: ROOPAIRS_LOGIN,
    SignUpScreen: SIGNUP,

    // Authentication Modals
    RoopairsLoggingInModal: ROOPAIRS_LOGIN_MODAL,
    CreatingAccountModal: CREATE_ACCOUNT_MODAL,
    LoggingInModal: LOGIN_MODAL, 

};


export const MainAppStack: Array<MainAppStackType> = [
    {
        title: 'Properties',
        navigate: PROPERTY_LIST,
        key: 'Properties',
        button: 'Add Property',
    },
    {
        title: 'Service Request',
        navigate: navigationPages.ServiceRequestScreen,
        key: 'ServiceRequest',
        button: 'Request Service',
    },
    {
        title: 'Account Settings',
        navigate: navigationPages.AccountSettings,
        key: 'AccountSettings',
    },
    {
        title: 'Log Out',
        navigate: LOGIN,
        key: 'LogOut',
    },
];
