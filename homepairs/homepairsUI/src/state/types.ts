
/**-------------------Property Types-------------------**/
export type Property = {
    address: String, 
    tenants : number, 
    bedrooms: number, 
    bathrooms: number,
}

export type PropertyListState = Property[];

export type AddPropertyAction = {
    type: string;
    userData: Property;
}
export type UpdatePropertyAction = {
    type: string;
    index: number;
    userData: Property;
}
export type RemovePropertyAction  = {
    type: string;
    index: number;
}

export type FetchPropertyAction = {
    type: string;
    properties: PropertyListState,
}

/*Union type for the Property Lists. This will be used for the reducer.*/
export type PropertyListAction = AddPropertyAction | UpdatePropertyAction | RemovePropertyAction | FetchPropertyAction;
/**-------------------Property Types-------------------**/

/**-------------------Account Types-------------------**/
export type Account = {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    roopairsToken: string;
}

export type LandlordAccount = Account & {
    manId: number;
}

export type TenantAccount = Account & {
    propId : number;
    tenantId: number;
}

export type AccountState = LandlordAccount | TenantAccount

export type FetchUserAccountAction = {
    type: string;
    username: string;
    password: string
}

export type FetchUserAccountProfileAction = {
    type: string;
    profile: AccountState;
}

export type AccountStateAction = FetchUserAccountProfileAction | FetchUserAccountProfileAction
/**-------------------Account Types-------------------**/


/**-------------------Header Types-------------------**/
export type Header = {
    showMenu : boolean,
    isDropDown: boolean,
    currentPage: number,
    showBackButton: boolean,
    menu: string[]
}

export type HeaderState = Header

export type ToggleMenuAction = {
    type: string,
    showMenu: boolean,
}

export type SwitchDropDownNavBarAction = {
    type: string,
    isDropDown: boolean
}

export type ShowGoBackButtonAction = {
    type: string, 
    showBackButton: boolean
}

export type UpdateSelectedPageAction = {
    type: string,
    selected: number,
}

export type HeaderAction = ToggleMenuAction | SwitchDropDownNavBarAction 
| ShowGoBackButtonAction | UpdateSelectedPageAction
/**-------------------Header Types-------------------**/


/**-------------------App State-------------------**/
export type AppState = {
    propertyList: PropertyListState,
    accountProfile: AccountState,
    header: HeaderState,
    // add future state slices here
}
/**-------------------App State-------------------**/
