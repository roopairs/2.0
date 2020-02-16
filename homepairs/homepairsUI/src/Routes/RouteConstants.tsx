import { MainAppStackType } from 'homepairs-types';

const MainAppStack: Array<MainAppStackType> = [
    {
        title: 'Properties',
        navigate: 'AccountProperties',
        key: 'Properties',
        button: 'Add Property',
    },
    {
        title: 'Service Request',
        navigate: 'ServiceRequest',
        key: 'ServiceRequest',
        button: 'Request Service',
    },
    {
        title: 'Account Settings',
        navigate: 'Account',
        key: 'AccountSettings',
    },
    {
        title: 'Log Out',
        navigate: 'Auth',
        key: 'LogOut',
    },
];

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
    MainStack: 'MainStack',
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
    ServiceRequestStack: 'ServiceRequestStack',
    Account: 'Account', 
    AccountStack: 'AccountStack',
    NewRequest: 'NewRequest',
    TenantProperties: 'TenantProperties',
    AccountProperties: 'AccountProperties',
    DetailedProperty: 'DetailedProperty',
    SingleProperty: 'SingleProperty',
    EditPropertyModal: 'EditPropertyModal',

    RoopairsLogin: 'RoopairsLogin',
    RoopairsLoggingInModal: 'RoopairsLoggingInModal',

    SignUpScreen: 'SignUpScreen',
    CreatingAccountModal: 'CreatingAccountModal',

    LoginScreen: 'LoginScreen',
    LoggingInModal: 'LoggingInModal',

    ModalStack: 'ModalStack',
};

export default MainAppStack; 