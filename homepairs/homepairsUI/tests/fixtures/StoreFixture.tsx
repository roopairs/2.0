import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
    PropertyManagerAccount,
    AccountTypes,
    AppState,
    PropertyDict,
    Header,
    MainAppStackType,
    ConfigurationSettings,
    ServiceState,
    PropertyListState,
    Contact,
    AuthenticationState,
    ServiceProvider,
    ProviderDictionary,
    PreferredServiceProviderState,
} from 'homepairs-types';
import {bolt} from 'homepairs-images';

const middleWares = [thunk];
const mockStore = configureMockStore(middleWares);
export const mockMainAppStack: Array<MainAppStackType> = [
    {
        title: 'Properties',
        navigate: 'AccountProperties',
        key: 'Properties',
        button: 'Add Property',          
        onNavButtonClick: () => {
            return true;
        },
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
const navigationMenu: string[] = [
    'Properties',
    'Service Requests',
    'Account',
    'Log Out',
];

/** User Account data for testing! */
const PropertyManagerAcount: PropertyManagerAccount = {
    accountType: AccountTypes.PropertyManager,
    firstName: 'Darrel',
    lastName: 'Williams',
    email: 'dWilliams@SpeechGrammarList.com',
    address: '21 Macalister Drive, Oakland, California',
    token: '',
    manId: 1000,
};
/** User Account data for testing! */

/** Property data for testing! */
export const testPropertyListKey1 = '1';
export const testPropertyListKey2 = '2';
export const PropertyList1: PropertyDict = {
    [testPropertyListKey1] : {
        propId: testPropertyListKey1,
        address: '560 Hathway Ap. 2, San Luis Obispo, California',
        tenants: 3,
        bedrooms: 3,
        bathrooms: 3,
    },
    [testPropertyListKey2] : {
        propId: testPropertyListKey2,
        address: '481 Del Sur Way, San Luis Obispo, California',
        tenants: 5,
        bedrooms: 3,
        bathrooms: 2,
    },
};

/** Property data for testing! */
const PropertyManager1: Contact  =
    {
        accountType: AccountTypes.PropertyManager,
        firstName: 'Darrel',
        lastName: 'Williams',
        email: 'dWilliams@SpeechGrammarList.com',
    };

const propertyListState : PropertyListState = {
    selectedPropertyId: testPropertyListKey2,
    properties: PropertyList1,
    propertyManager: PropertyManager1,
    appliances: [],
};
/** Property data for testing! */

/** Header data for testing! */

// Header should be rendered as a drop menu with no back button
// and its contents hidden. 
const HeaderState1: Header = {
    showMenu: false,
    isDropDown: true,
    currentPage: mockMainAppStack[1],
    showBackButton: false,
    menu: navigationMenu,
};

// Header should be rendered as a dropMenu with a back button and its 
// contents hidden 
const HeaderState2: Header = {
    showMenu: false,
    isDropDown: true,
    currentPage: mockMainAppStack[1],
    showBackButton: true,
    menu: navigationMenu,
};

// Header should be rendered as a navHeader with not other buttons
const HeaderState3: Header = {
    showMenu: false,
    isDropDown: false,
    currentPage: mockMainAppStack[1],
    showBackButton: false,
    menu: navigationMenu,
};

// Header should be rendered as a navHeader with a back button
const HeaderState4: Header = {
    showMenu: false,
    isDropDown: false,
    currentPage: mockMainAppStack[1],
    showBackButton: true,
    menu: navigationMenu,
};

// Header should be rendered as a dropMenu with its menu revealed and a 
// go back button rendered. 
const HeaderState5: Header = {
    showMenu: true,
    isDropDown: true,
    currentPage: mockMainAppStack[1],
    showBackButton: true,
    menu: navigationMenu,
};

// If on a change of Dimensions that sets the isDropDown to true, 
// the header should render the showmenu as well.
const HeaderState6: Header = {
    showMenu: true,
    isDropDown: false,
    currentPage: mockMainAppStack[1],
    showBackButton: true,
    menu: navigationMenu,
};

const HeaderState7: Header = {
    showMenu: true,
    isDropDown: true,
    currentPage: mockMainAppStack[1],
    showBackButton: false,
    menu: navigationMenu,
};

/** Header data for testing! */

/** Service Request data for testing! */
const serviceRequest1: ServiceState = {
    requested: [],
    accepted: [],
    closed: [],
};
/** Service Request  data for testing! */

/** Settings data for testing! */
const ConfigurationSettings1: ConfigurationSettings = {
    areNotificationsActive: true,
    isDarkModeActive: false,
};
/** Settings data for testing! */

/** Checking to see if user has been authenticated. May be deprecated soon. */
export const authenticationState: AuthenticationState ={
    authed: true,
};
/** Checking to see if user has been authenticated. May be deprecated soon. */


/** Example Preferred Providers to test store */
const serviceProviderList : ServiceProvider[] = [
    {
        provId: 9255770000,
        name: 'Bob the Builder',
        email: 'billybob@yahoo.com',
        phoneNum: '999-999-9999',
        contractLic: '#12345678',
        skills: 'Hot Equipment, Flood Prevention, Pest Control',
        founded: 'string',
        payRate: 35.25,
        timesHired: 202, 
        earliestHire: new Date(2018, 10, 17),
        logo: 'Fake',
    },
    {
        provId: 9294,
        name: 'Electro Bud',
        email: 'ebuds@ebuddy.org',
        phoneNum: '888-888-8888',
        contractLic: '#123456',
        skills: 'Hot Equipment, Lighting, Power',
        founded: 'string',
        payRate: 40.25,
        timesHired: 33, 
        earliestHire: new Date(2020, 1, 3),
        logo: undefined,
    },
];

const serviceProviderDict: ProviderDictionary = {
    [serviceProviderList[0].phoneNum] : serviceProviderList[0],
    [serviceProviderList[1].phoneNum] : serviceProviderList[1],
};

const prefferedProviderStore: PreferredServiceProviderState = {
    serviceProviders: serviceProviderDict,
};
/** Example Preferred Providers to test store */

export const testStore1: AppState = {
    properties: propertyListState,
    accountProfile: PropertyManagerAcount,
    header: HeaderState1,
    serviceRequests: serviceRequest1,
    settings: ConfigurationSettings1,
    authenticated: authenticationState,
    preferredProviders: prefferedProviderStore,
};

export const propertyManagerMock1 = mockStore(testStore1);

export const HeaderMockStores = {
    dropDownHiddenNoBack: mockStore({
        properties: propertyListState,
        accountProfile: PropertyManagerAcount,
        header: HeaderState1,
        serviceRequests: serviceRequest1,
        settings: ConfigurationSettings1,
        authenticated: authenticationState,
        preferredProviders: prefferedProviderStore,
    }),
    dropDownHiddenWithBack: mockStore({
        properties: propertyListState,
        accountProfile: PropertyManagerAcount,
        header: HeaderState2,
        serviceRequests: serviceRequest1,
        settings: ConfigurationSettings1,
        authenticated: authenticationState,
        preferredProviders: prefferedProviderStore,
    }),
    navBarNoBack: mockStore({
        properties: propertyListState,
        accountProfile: PropertyManagerAcount,
        header: HeaderState3,
        serviceRequests: serviceRequest1,
        settings: ConfigurationSettings1,
        authenticated: undefined,
        preferredProviders: prefferedProviderStore,
    }),
    navBarWithBack: mockStore({
        properties: propertyListState,
        accountProfile: PropertyManagerAcount,
        header: HeaderState4,
        serviceRequests: serviceRequest1,
        settings: ConfigurationSettings1,
        authenticated: authenticationState,
        preferredProviders: prefferedProviderStore,
    }),
    dropDownRevealedWithBack: mockStore({
        properties: propertyListState,
        accountProfile: PropertyManagerAcount,
        header: HeaderState5,
        serviceRequests: serviceRequest1,
        settings: ConfigurationSettings1,
        authenticated: authenticationState,
        preferredProviders: prefferedProviderStore,
    }),
    navBarOnChangeDropDownRevealMenu: mockStore({
        properties: propertyListState,
        accountProfile: PropertyManagerAcount,
        header: HeaderState6,
        serviceRequests: serviceRequest1,
        settings: ConfigurationSettings1,
        authenticated: authenticationState,
        preferredProviders: prefferedProviderStore,
    }),
    dropDownRevealedNoBack: mockStore({
        properties: propertyListState,
        accountProfile: PropertyManagerAcount,
        header: HeaderState7,
        serviceRequests: serviceRequest1,
        settings: ConfigurationSettings1,
        authenticated: authenticationState,
        preferredProviders: prefferedProviderStore,
    }),
};