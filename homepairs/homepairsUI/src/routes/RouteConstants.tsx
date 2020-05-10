import { MainAppStackType } from 'homepairs-types';

export const LOGIN = 'LoginScreen';
export const SIGNUP = 'SignUp';
export const ROOPAIRS_LOGIN = 'RoopairsLogin';
export const LOGIN_MODAL = 'LoggingInModal';
export const CREATE_ACCOUNT_MODAL = 'CreatingAccountModal';
export const ROOPAIRS_LOGIN_MODAL = 'RoopairsLoggingInModal';

export const PROPERTY_LIST = 'PropertiesScreen';
export const TENANT_PROPERTY = 'TenantProperty';
export const PROPERTY = 'SingleProperty';

export const ADD_PROPERTY_MODAL = '/admin/properties/add-property';
export const EDIT_PROPERTY_MODAL = '/admin/property/edit-property';
export const ADD_TENANT_MODAL = '/admin/property/add-tenant';
export const EDIT_TENANT_MODAL = '/admin/property/edit-tenant';
export const ADD_APPLIANCE_MODAL = '/admin/property/add-appliance';
export const EDIT_APPLIANCE_MODAL = '/admin/property/edit-appliance';


export const SERVICE_REQUEST = '/admin/service-requests';
export const NEW_SERVICE_REQUEST = '/admin/service-requests/new-service-requests';
export const SERVICE_REQUEST_INFO_MODAL = '/admin/service-requests/information';
export const ADD_SERVICE_PROVIDER_MODAL = '/admin/service-requests/add-service-provider';
export const PREFERRED_PROVIDER_MODAL = '/admin/service-requests/preferred-provider';

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
    ServiceRequestModal: 'SericeRequestModal',
    AddServiceProviderModal: 'AddServiceProviderModal',
    PreferredProviderModal: 'PreferredProviderModal',

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
    PropertiesScreen: 'PropertiesScreen',
    TenantProperty: 'TenantProperty',
    SingleProperty: 'SingleProperty',
    // Property Stack Modals 
    AddNewPropertyModal: 'AddNewPropertyModal',
    EditPropertyModal: 'EditPropertyModal',
    AddTenantModal: 'AddTenantModal',
    EditTenantModal: 'EditTenantModal',
    AddApplianceModal: 'AddApplianceModal', 
    EditApplianceModal: 'EditApplianceModal',
    AddServiceProviderModal: 'AddServiceProviderModal',
    PreferredProviderModal: 'PreferredProviderModal',

    // Service Request Pages
    ServiceRequestScreen: 'ServiceRequestScreen',
    NewRequest: 'NewRequest',
    ServiceRequestModal: 'ServiceRequestModal',

    // Account Settings Pages 
    AccountSettings: 'AccountSettings', 

    // Authentication Pages
    LoginScreen: 'LoginScreen',
    RoopairsLogin: 'RoopairsLogin',
    SignUpScreen: 'SignUpScreen',

    // Authentication Modals
    RoopairsLoggingInModal: 'RoopairsLoggingInModal',
    CreatingAccountModal: 'CreatingAccountModal',
    LoggingInModal: 'LoggingInModal', 

};


export const MainAppStack: Array<MainAppStackType> = [
    {
        title: 'My Properties',
        navigate: navigationPages.PropertiesScreen,
        key: 'My Properties',
        button: 'Add Property',
    },
    {
        title: 'Service Request',
        navigate: navigationPages.ServiceRequestScreen,
        key: 'Service Request',
        button: 'Request Service',
    },
    {
        title: 'Account Settings',
        navigate: navigationPages.AccountSettings,
        key: 'Account Settings',
    },
    {
        title: 'Log Out',
        navigate: navigationPages.LoginScreen,
        key: 'Log Out',
    },
];
