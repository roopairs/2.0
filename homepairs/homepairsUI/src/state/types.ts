import { Dimensions } from 'react-native';
import { NavigationSwitchProp } from 'react-navigation';
import { NavigationStackProp } from 'react-navigation-stack';


/* *-------------------Appliances-------------------* */

export enum ApplianceType {
    Plumbing, LightingAndElectric, HVAC, GeneralAppliance, None
};

export type Appliance = {
    applianceId: string,
    category: ApplianceType,
    appName: string,
    manufacturer: string, 
    modelNum: number, 
    serialNum: number, 
    location: string,
};

/* *-------------------Appliances-------------------* */

/* *-------------------Property Types-------------------* */

export type TenantInfo = {
    firstName: string,
    lastName: string,
    email: string,
    phoneNumber: string,
}

export type Property = {
    propId: string, 
    address: string, 
    tenants: number,
    bedrooms: number,
    bathrooms: number,
}

/**
 * A type alias that defines a property with a string attached. This is intended 
 * to be its propId
 */
export type PropertyDict = {[propId:string]:Property}

export type PropertyListState = 
{
    selectedPropertyId: string, 
    properties: PropertyDict,
    appliances: Appliance[],
    tenants: TenantInfo[],
    propertyManager?: Contact,
};

export type AddPropertyAction = {
    type: string;
    userData: Property;
};

export type AddApplianceAction = {
    type: string;
    userData: Appliance;
};

export type UpdateApplianceAction = {
    type: string;
    propId: string;
    userData: Appliance;
};

export type SetSelectedPropertyAction = {
    type: string;
    propId: string;
};
export type UpdatePropertyAction = {
    type: string;
    propId: string;
    userData: Property;
};
export type RemovePropertyAction = {
    type: string;
    propId: string;
};
export type FetchPropertyAction = {
    type: string;
    property: PropertyDict;
};
/* fetch the property along with the property manager that owns a given property (used for tenant login to fill PrimaryContactInfo) */
export type FetchPropertyAndPropertyManagerAction = {
    type: string;
    property: PropertyDict;
    propertyManager: Contact;
};
export type FetchPropertiesAction = {
    type: string;
    properties: PropertyDict;
};

export type StorePropertyApplianceAndTenantAction = {
    type: string,
    tenants: TenantInfo[],
    appliances: Appliance[],
}

/* Union type for the Property Lists. This will be used for the reducer. */
export type PropertyListAction =
    | AddPropertyAction
    | AddApplianceAction
    | UpdateApplianceAction
    | UpdatePropertyAction
    | RemovePropertyAction
    | SetSelectedPropertyAction
    | FetchPropertyAction
    | FetchPropertiesAction
    | StorePropertyApplianceAndTenantAction;
/* *-------------------Property Types-------------------* */


/* *-------------------Account Types-------------------* */

export enum AccountTypes {
    Tenant = 'tenant',
    PropertyManager = 'pm'
}

export type Account = {
    accountType: AccountTypes;
    firstName: string;
    lastName: string;
    email: string;
    address: string;
    roopairsToken: string;
};

export type PropertyManagerAccount = Account & {
    pmId: number;
};

export type TenantAccount = Account & {
    propId: number;
    tenantId: number;
};

export type AccountState = PropertyManagerAccount | TenantAccount;

export type FetchUserAccountAction = {
    type: string;
    username: string;
    password: string;
};

export type FetchUserAccountProfileAction = {
    type: string;
    profile: AccountState;
};

export type AccountStateAction =
    | FetchUserAccountProfileAction
    | FetchUserAccountProfileAction;

export type Contact = {
    accountType: AccountTypes;
    firstName: string;
    lastName: string;
    email: string;
}
/* *-------------------Account Types-------------------* */

/* *-------------------Service Types-------------------* */

export type ServiceRequest = {
    reqId: number,
    address: string, 
    technician?: string, 
    startDate: string, 
    poc?: string, 
    pocName?: string, 
    companyName: string, 
    details: string, 
    appliance: Appliance, 
    status: ServiceRequestStatus
};

export type NewServiceRequest = {
    token: string, 
    propId: string, 
    appId: string, 
    providerId: number, 
    serviceType: string,
    serviceCategory: string, 
    serviceDate: string, 
    details: string,
}

export type ServiceProvider = {
    provId: number,
    prefId?: string, // Optional param if preferred service provider
    name: string,
    email: string,
    phoneNum: string,
    contractLic: string, // contract license
    skills: string,
    founded: string, // date founded
    payRate: number, // amount per hour 
    timesHired: number, 
    earliestHire?: Date, // date of first job completed
    logo?: string, // optional image uri
};

export enum ServiceRequestCompletionStatus {
    Current = 'Current',
    Archived = 'Archived',
}

export enum ServiceRequestStatusEnums {
    WaitingApproval = 'WaitingApproval',
    Pending = 'Pending',
    Scheduled = 'Scheduled',
    InProgress = 'InProgress',
    Completed = 'Completed',
    Canceled = 'Canceled',
    Declined = 'Declined'
}

export type ServiceRequestStatus = ServiceRequestStatusEnums;

export type ServiceState = {
    serviceRequests: ServiceRequest[],
}

export type RequestServiceAction = {
    type: string;
    request: ServiceRequest;
};

export type AcceptServiceAction = {
    type: string;
    request: ServiceRequest;
};

export type DenyServiceAction = {
    type: string;
    request: ServiceRequest;
};

export type CancelServiceAction = {
    type: string;
    service: ServiceRequest;
};

export type CompleteServiceAction = {
    type: string;
    service: ServiceRequest;
};

export type ServiceAction =
    | RequestServiceAction
    | CompleteServiceAction
    | AcceptServiceAction
    | DenyServiceAction
    | CancelServiceAction;

/* *-------------------Service Types-------------------* */

/* *-------------------Preferred Service Provider Types-------------------* */
export type ProviderDictionary = {[phoneNum : string] : ServiceProvider}

export type RefreshServiceProvidersAction = {
    type: string;
    preferredServiceProviders: ServiceProvider[];
}

export type RemoveServiceProviderAction = {
    type: string;
    serviceProvider: ServiceProvider;
}

export type PreferredServiceProviderAction = 
    | RefreshServiceProvidersAction
    | RemoveServiceProviderAction;


export type PreferredServiceProviderState = {
    serviceProviders: { [phoneNum:string] : ServiceProvider}
}
/* *-------------------Preferred Service Provider Types-------------------* */



/* *-------------------Header Types-------------------* */
export type MainAppStackType = {
    /**
     * Text that will be presented in the header
     */
    title: string;

    /**
     * Value that allows the navigator to navigate to this page if 
     * a collection of these pages were to be stored.
     */
    navigate: string;

    /**
     * Unique value intended to distinguish each instance of this object
     */
    key: string;

    /**
     * Name of the button in the header. If none is defined, a button will not 
     * be rendered.
     */
    button?: string;

    /**
     * Callback method for when the button is clicked. This callback is intended for 
     * page navigation when the button is clicked as opposed to revealing a modal. 
     * To override modal visibility, set the doesButtonUseNavigate prop to true
     */
    onNavButtonClick?: (arg0?: any) => any;

    /**
     * Value that indicates to the page that a defined button should use onNavButtonClick
     * instead of onChangeModalVisibility
     */
    doesButtonUseNavigate?: boolean;
};

export type Header = {
    showMenu: boolean;
    isDropDown: boolean;
    currentPage: MainAppStackType;
    previousPagesStack: MainAppStackType[];
    showBackButton: boolean;
    menu: string[];
};

export type HeaderState = Header;

export type ToggleMenuAction = {
    type: string;
    showMenu: boolean;
};

export type SwitchDropDownNavBarAction = {
    type: string;
    isDropDown: boolean;
};

export type ShowGoBackOnButtonClick = {
    type: string;
    showBackButton: boolean;
};

export type UpdateSelectedPageAction = {
    type: string;
    selected: MainAppStackType;
};

export type OnGoBackAction = {
    type: string;
};

export type HeaderAction =
    | ToggleMenuAction
    | SwitchDropDownNavBarAction
    | ShowGoBackOnButtonClick
    | UpdateSelectedPageAction
    | OnGoBackAction;
/* *-------------------Header Types-------------------* */

/* *-------------------Setting Types-------------------* */
export type ConfigurationSettings = {
    areNotificationsActive: boolean;
    isDarkModeActive: boolean;
    apiKey: string | null;
};

export type SettingsState = ConfigurationSettings;

export type ToggleNotificationActivationAction = {
    type: string;
    areNotificationsActive: boolean;
};

export type ToggleDarkModeActivationAction = {
    type: string;
    isDarkModeActive: boolean;
};

export type AddGoogleApiKeyAction = {
    type: string;
    apiKey: string;
};

export type SettingsActions = ToggleDarkModeActivationAction &
    ToggleNotificationActivationAction & AddGoogleApiKeyAction;
/* *-------------------Setting Types-------------------* */

/* *-------------------SessionTypes-------------------* */
export type AuthenticationState = {
    authed: boolean,
};

export type SetAccountAuthenticationStateAction = {
    type: string;
    authed: boolean;
};

export type SessionAction = SetAccountAuthenticationStateAction;
/* *-------------------SessionTypes-------------------* */


/* *-------------------App State-------------------* */
export type AppState = {
    properties: PropertyListState;
    accountProfile: AccountState;
    header: HeaderState;
    serviceRequests: ServiceState;
    settings: SettingsState;
    authenticated: AuthenticationState;
    preferredProviders: PreferredServiceProviderState;
    // add future state slices here
}
/* *-------------------App State-------------------* */


/* *-------------------Misc Types-------------------* */
export type NavigationPropType = NavigationSwitchProp | NavigationStackProp

export type AddNewPropertyState = {
    email: string;
    roopairsToken: string;
}

export type EditPropertyState = {
    email: string;
    propId: string;
    oldProp: Property;
    roopairsToken: string;
}

export type AddApplianceState = {
    property: Property;
    token: string;
}

export type EditApplianceState = {
    oldAppliance: Appliance;
    // propId: number;d
}

export enum HomePairsDimensions {
    DROP_MENU_WIDTH = 700,
    MAX_PALLET = 700,
    MIN_PALLET = 360,
    MAX_CONTENT_SIZE = 500,
    MIN_CONTENT_SIZE = 300,
    MAX_BUTTON_WIDTH = 300,
    MIN_BUTTON_WIDTH = 200,
    MIN_PALLET_HEIGHT = Dimensions.get('window').height
}

enum HOMEPAIRS_ACCOUNT_KEYS {
    TYPE = 'accountType',
    PM = 'pm',
    TENANT = 'tenant',
    FIRSTNAME = 'firstName',
    LASTNAME = 'lastName',
    EMAIL = 'email',
    PM_ID = 'pmId',
    PASSWORD = 'password',
    ADDRESS = 'address',
    PLACE = 'place',
    PROPID = 'propId',
    TENANTID = 'tenantID',
}

enum HOMEPAIRS_LOGIN_STATUS {
    SUCCESS = 'success',
    FAILURE = 'failure',
}

enum HOMEPAIRS_PROPERTY_KEYS {
    PROPERTYID = 'propId',
    ADDRESS = 'streetAddress',
    TENANTS = 'maxTenants',
    BEDROOMS = 'numBed',
    BATHROOMS = 'numBath',
}

export enum HomepairsPropertyAttributes {
    ADDRESS = 'address',
    TENANTS = 'tenants',
    BEDROOMS = 'bedrooms',
    BATHROOMS = 'bathrooms',
    CITY = 'city',
    STATE = 'state',
}

export const HomePairsResponseKeys = {
    DATA: 'data',
    ACCOUNT_KEYS: HOMEPAIRS_ACCOUNT_KEYS,
    PROPERTIES: 'properties',
    PROPERTY_KEYS: HOMEPAIRS_PROPERTY_KEYS,
    ROLE: 'role',
    ROOPAIRS_TOKEN: 'token',
    STATUS: 'status',
    STATUS_RESULTS: HOMEPAIRS_LOGIN_STATUS,
    ERROR: 'error',
    ID: 'id',
    PROPID: 'propId',
};

export type DarkModeProperties = {
    isDarkModeActive?: boolean;
};
