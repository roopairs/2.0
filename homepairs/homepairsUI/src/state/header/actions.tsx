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

export const toggleMenu = (showMenu: boolean): ToggleMenuAction => {
    return {
      type: HEADER_ACTION_TYPES.TOGGLE_MENU,
      showMenu,
    };
};

export const switchDropdownNavbar = (isDropDown: boolean): SwitchDropDownNavBarAction =>{
    return {
      type : HEADER_ACTION_TYPES.SWITCH_DROPDOWN_NAVBAR,
      isDropDown,
    };
};

export const showGoBackButton = (showBackButton: boolean): ShowGoBackOnButtonClick =>{
    return {
      type : HEADER_ACTION_TYPES.SHOW_GOBACK_BUTTON,
      showBackButton,
    };
};

export const updateSelectedPage = (selectedPage: MainAppStackType): UpdateSelectedPageAction =>{
    return {
      type : HEADER_ACTION_TYPES.UPDATE_SELECTED_PAGE,
      selected: selectedPage,
    };
};