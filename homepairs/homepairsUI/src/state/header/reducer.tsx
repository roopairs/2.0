import { Dimensions } from 'react-native';
import strings from 'homepairs-strings';
import {MainAppStack} from 'homepairs-routes';
import { 
    HeaderState, 
    ToggleMenuAction,
    SwitchDropDownNavBarAction,
    ShowGoBackOnButtonClick,
    UpdateSelectedPageAction,
    HeaderAction,
    HomePairsDimensions,
} from '../types';
import { HEADER_ACTION_TYPES } from './actions';

/**
 * This function is intended be called when the application first loads. It 
 * will insure the that header is rendered correctly based on the dimensions 
 * of the window. This is specifically intended for the web since these can 
 * vary but this can help reduce rendering for mobile platforms.
 */
function determineInitialIsDropDown() {
    const {width} = Dimensions.get('window');
    if(width < HomePairsDimensions.DROP_MENU_WIDTH)
        return true;
    return false;  
}

export const initialState: HeaderState = {
    showMenu: false,
    isDropDown: determineInitialIsDropDown(),
    currentPage: MainAppStack[0],
    previousPagesStack: [],
    showBackButton: false,
    menu: [
        strings.propertiesPage.title,
        strings.serviceRequestPage.title,
        strings.connectAccountPage.title,
        strings.logOut,
    ],
};

export const header = (
    state: HeaderState = initialState,
    action: HeaderAction, 
) => {
    /* * NOTE: USE IMMUTABLE UPDATE FUNCTIONS FOR REDUCERS OR ELSE REDUX WILL NOT UPDATE!!! * */
    const newState = {...state};
    switch (action.type){
        case HEADER_ACTION_TYPES.TOGGLE_MENU:
            newState.showMenu = (action as ToggleMenuAction).showMenu;
            return newState;
        case HEADER_ACTION_TYPES.SHOW_GOBACK_BUTTON:
            newState.showBackButton = (action as ShowGoBackOnButtonClick).showBackButton;
            return newState;
        case HEADER_ACTION_TYPES.SWITCH_DROPDOWN_NAVBAR:
            newState.isDropDown = (action as SwitchDropDownNavBarAction).isDropDown;
            return newState;
        case HEADER_ACTION_TYPES.UPDATE_SELECTED_PAGE:
            newState.previousPagesStack.push(newState.currentPage);
            newState.currentPage = (action as UpdateSelectedPageAction).selected;
            return newState;
        case HEADER_ACTION_TYPES.ON_GO_BACK:
            newState.currentPage = newState.previousPagesStack.pop();
            return newState;
        default:
            return state;
    }
};