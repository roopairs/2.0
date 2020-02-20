import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
    LandlordAccount,
    AccountTypes,
    AppState,
    Property,
    Header,
    MainAppStackType,
    ConfigurationSettings,
    ServiceState,
    PropertyListState,
} from 'homepairs-types';

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
const PropertyManagerAcount: LandlordAccount = {
    accountType: AccountTypes.Landlord,
    firstName: 'Darrel',
    lastName: 'Williams',
    email: 'dWilliams@SpeechGrammarList.com',
    streetAddress: '21 Macalister Drive',
    city: 'Oakland',
    roopairsToken: '',
    manId: 1000,
};
/** User Account data for testing! */

/** Property data for testing! */
export const PropertyList1: Property[] = [
    {
        streetAddress: '560 Hathway Ap. 2',
        city: 'San Luis Obispo',
        state: 'Ca',
        tenants: 3,
        bedrooms: 3,
        bathrooms: 3,
    },
    {
        streetAddress: '481 Del Sur Way',
        city: 'San Luis Obispo',
        state: 'Ca',
        tenants: 5,
        bedrooms: 3,
        bathrooms: 2,
    },
];

const propertyListState : PropertyListState = {
    selectedPropertyIndex: 0,
    properties: PropertyList1,
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

export const testStore1: AppState = {
    properties: propertyListState,
    accountProfile: PropertyManagerAcount,
    header: HeaderState1,
    serviceRequests: serviceRequest1,
    settings: ConfigurationSettings1,
};

export const propertyManagerMock1 = mockStore(testStore1);

export const HeaderMockStores = {
    dropDownHiddenNoBack: mockStore({
        properties: propertyListState,
        accountProfile: PropertyManagerAcount,
        header: HeaderState1,
        serviceRequests: serviceRequest1,
        settings: ConfigurationSettings1,
    }),
    dropDownHiddenWithBack: mockStore({
        properties: propertyListState,
        accountProfile: PropertyManagerAcount,
        header: HeaderState2,
        serviceRequests: serviceRequest1,
        settings: ConfigurationSettings1,
    }),
    navBarNoBack: mockStore({
        properties: propertyListState,
        accountProfile: PropertyManagerAcount,
        header: HeaderState3,
        serviceRequests: serviceRequest1,
        settings: ConfigurationSettings1,
    }),
    navBarWithBack: mockStore({
        properties: propertyListState,
        accountProfile: PropertyManagerAcount,
        header: HeaderState4,
        serviceRequests: serviceRequest1,
        settings: ConfigurationSettings1,
    }),
    dropDownRevealedWithBack: mockStore({
        properties: propertyListState,
        accountProfile: PropertyManagerAcount,
        header: HeaderState5,
        serviceRequests: serviceRequest1,
        settings: ConfigurationSettings1,
    }),
    navBarOnChangeDropDownRevealMenu: mockStore({
        properties: propertyListState,
        accountProfile: PropertyManagerAcount,
        header: HeaderState6,
        serviceRequests: serviceRequest1,
        settings: ConfigurationSettings1,
    }),
    dropDownRevealedNoBack: mockStore({
        properties: propertyListState,
        accountProfile: PropertyManagerAcount,
        header: HeaderState7,
        serviceRequests: serviceRequest1,
        settings: ConfigurationSettings1,
    }),
};