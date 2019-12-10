import { 
    HeaderState, 
    ToggleMenuAction,
    SwitchDropDownNavBarAction,
    ShowGoBackButtonAction,
    UpdateSelectedPageAction,
    HeaderAction} from '../types';
import { HEADER_ACTION_TYPES } from './actions';
import { Dimensions } from 'react-native';


const DROP_MENU_WIDTH = 700;

/**
 * This function is intended be called when the application first loads. It 
 * will insure the that header is rendered correctly based on the dimensions 
 * of the window. This is specifically intended for the web since these can 
 * vary but this can help reduce rendering for mobile platforms.
 */
function determineInitialIsDropDown() {
    var width= Dimensions.get('window').width
    if(width < DROP_MENU_WIDTH){
        return true
    }else{
        return false  
    }
}

export const initialState: HeaderState = {
    showMenu : false,
    isDropDown: determineInitialIsDropDown(),
    currentPage: 0,
    showBackButton: false,
    menu: [
        'Properties', 
        'Service Request', 
        'Account Settings',
        'Log Out', 
    ]
};

export const header = (
    state: HeaderState = initialState,
    action: HeaderAction 
) => {
    /**NOTE: USE IMMUTABLE UPDATE FUNCTIONS FOR REDUCERS OR ELSE REDUX WILL NOT UPDATE!!! */
    const newState = {...state, modalOpen: true };
    switch (action.type){
        case HEADER_ACTION_TYPES.TOGGLE_MENU:
            newState.showMenu = (action as ToggleMenuAction).showMenu
            return newState
        case HEADER_ACTION_TYPES.SHOW_GOBACK_BUTTON:
            newState.showBackButton = (action as ShowGoBackButtonAction).showBackButton
            return newState
        case HEADER_ACTION_TYPES.SWITCH_DROPDOWN_NAVBAR:
            newState.isDropDown = (action as SwitchDropDownNavBarAction).isDropDown
            return newState
        case HEADER_ACTION_TYPES.UPDATE_SELECTED_PAGE:
            newState.currentPage = (action as UpdateSelectedPageAction).selected
            return newState 
        default:
            return newState;
    }
}