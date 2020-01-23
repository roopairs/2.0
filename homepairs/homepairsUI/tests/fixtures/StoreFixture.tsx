import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { LandlordAccount, AccountTypes, AppState, Property, Header, MainNavigationStackProps, ConfigurationSettings, ServiceState } from 'homepair-types';

const middleWares = [thunk]
const mockStore = configureMockStore(middleWares);
const MainAppStack : Array<MainNavigationStackProps> = [
    { 
        title: 'Properties', 
        navigate: 'AccountProperties',
        key: 'Properties',
        button: 'Add Property',
        _onButtonClick: () => {return true}
    },
    { 
        title: 'Service Request', 
        navigate: 'ServiceRequest',
        key: 'ServiceRequest',
        button: 'Request Service'
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
    }
]
const navigationMenu : string[] = [
    'Properties',
    'Service Requests',
    'Account',
    'Log Out'
]

/** User Account data for testing!*/
const PropertyManagerAcount : LandlordAccount = {
    accountType: AccountTypes.Landlord,
    firstName: 'Darrel',
    lastName: 'Williams',
    email: 'dWilliams@SpeechGrammarList.com',
    phone: '51059344423',
    address: '21 Macalister Drive', 
    city: 'Oakland',
    companyName: "Peet's Coffee and Tea", 
    companyType: 'Retail', 
    roopairsToken: '',
    manId: 1000,
}
/** User Account data for testing!*/

/** Property data for testing!*/
const PropertyList1 : Property[] = [
    {
        address: '560 Hathway Ap. San Luis Obispo', 
        tenants : 3, 
        bedrooms: 3, 
        bathrooms: 3,
    },
    {
        address: '481 Del Sur Way, San Luis Obispo', 
        tenants : 5, 
        bedrooms: 3, 
        bathrooms: 2,
    }
]
/** Property data for testing!*/


/** Header data for testing!*/
const HeaderState1 : Header = {
    showMenu : false,
    isDropDown: true,
    currentPage: MainAppStack[1],
    showBackButton: false,
    menu: navigationMenu
}
/** Header data for testing!*/



/** Service Request data for testing!*/
const serviceRequest1: ServiceState = {
    requested: [],
    accepted: [],
    closed:[]
}
/** Service Request  data for testing!*/


/** Settings data for testing!*/
const ConfigurationSettings1 : ConfigurationSettings = {
    areNotificationsActive: true,
    isDarkModeActive: false,
}
/** Settings data for testing!*/

export const testStore1 : AppState = {
    propertyList: PropertyList1,
    accountProfile: PropertyManagerAcount,
    header: HeaderState1,
    serviceRequests: serviceRequest1,
    settings: ConfigurationSettings1,    
}

export const propertyManagerMock1 = mockStore(testStore1)