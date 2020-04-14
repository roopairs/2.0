import { 
    ToggleMenuAction,
    SwitchDropDownNavBarAction,
    ShowGoBackOnButtonClick,
    UpdateSelectedPageAction,
    MainAppStackType,
} from '../types';

export enum HEADER_ACTION_TYPES {
    TOGGLE_MENU = 'HEADER/TOGGLE_MENU',
    SWITCH_DROPDOWN_NAVBAR = 'HEADER/SWITHC_DROPDOWN_NAVBAR',
    SHOW_GOBACK_BUTTON = 'HEADER/SHOW_GOBACK_BUTTON',
    UPDATE_SELECTED_PAGE = 'HEADER/UPDATE_SELECTED_PAGE',
}

/**
 * ----------------------------------------------------
 * toggleMenu
 * ----------------------------------------------------
 * A simple action that sets header drop down state. This persists even 
 * if the header is not in dropdown view.
 * @param {boolean} showMenu -sets header to render the drop down menu or to hide it.
 */
export const toggleMenu = (showMenu: boolean): ToggleMenuAction => {
    return {
      type: HEADER_ACTION_TYPES.TOGGLE_MENU,
      showMenu,
    };
};

/**
 * ----------------------------------------------------
 * switchDropdownNavbar
 * ----------------------------------------------------
 * Indicates to the header if the menu should be rendered as a dropdown or a wide menu
 * @param {boolean} isDropDown -sets header to drop down or wide menus 
 */
export const switchDropdownNavbar = (isDropDown: boolean): SwitchDropDownNavBarAction =>{
    return {
      type : HEADER_ACTION_TYPES.SWITCH_DROPDOWN_NAVBAR,
      isDropDown,
    };
};

/**
 * ----------------------------------------------------
 * showBackButton
 * ----------------------------------------------------
 * Indicates to the header if the menu should render a goBack button 
 * @param {boolean} showBackButton -sets header to show back button
 */
export const showGoBackButton = (showBackButton: boolean): ShowGoBackOnButtonClick =>{
    return {
      type : HEADER_ACTION_TYPES.SHOW_GOBACK_BUTTON,
      showBackButton,
    };
};

/**
 * ----------------------------------------------------
 * updateSelectedPage
 * ----------------------------------------------------
 * Indicates to the header which selection should be rendered a slightly different color 
 * than the other options. This is intended to indicate to the user what page they are on.
 * @param {MainAppStackType} selectedPage - current page that will be highlighted for the menu 
 */
export const updateSelectedPage = (selectedPage: MainAppStackType): UpdateSelectedPageAction =>{
    return {
      type : HEADER_ACTION_TYPES.UPDATE_SELECTED_PAGE,
      selected: selectedPage,
    };
};