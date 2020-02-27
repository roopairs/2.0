import { MainAppStackType } from 'homepairs-types';

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
    ServiceRequestModal: 'ServiceRequestModal',


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


const MainAppStack: Array<MainAppStackType> = [
    {
        title: 'Properties',
        navigate: navigationPages.PropertiesScreen,
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
        navigate: navigationPages.LoginScreen,
        key: 'LogOut',
    },
];
export default MainAppStack; 