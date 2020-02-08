import {HeaderActions} from 'homepairs-redux-actions';
import { 
    ToggleMenuAction,
    SwitchDropDownNavBarAction,
    ShowGoBackOnButtonClick,
    UpdateSelectedPageAction,
    HeaderState,
} from 'homepairs-types';
import strings from 'homepairs-strings';
import { header, initialState } from '../../../src/state/header/reducer';
import MainAppStack from '../../../src/Routes/RouteConstants';


const types = HeaderActions.HEADER_ACTION_TYPES;
const prevState : HeaderState = {
    showMenu : false,
    isDropDown: false,
    currentPage: MainAppStack[0],
    showBackButton: true,
    menu: [
        strings.propertiesPage.title,
        strings.serviceRequestPage.title,
        strings.connectAccountPage.title,
        strings.logOut,
    ],
};

describe('Test suite for header reducer', () => {
    it('Test action with UNDEFINED type: Default State', () => {
        const action = { type: undefined, showMenu: true};
        const updatedHeader = header(undefined , action);
        expect(updatedHeader).toStrictEqual(initialState);
    });

    it('Test action with ToggleMenuAction type: Default State', () => {
        const action : ToggleMenuAction = { 
            type: types.TOGGLE_MENU, 
            showMenu: true,
        };
        const expectedValue = {...initialState, showMenu: true};
        const updatedHeader = header(undefined, action);
        expect(updatedHeader).toStrictEqual(expectedValue);
    });

    it('Test action with SwitchDropDownNavBar type: Defined State', () => {
        const action : SwitchDropDownNavBarAction = { 
            type: types.SWITCH_DROPDOWN_NAVBAR, 
            isDropDown: true,
        };
        const expectedValue = {...prevState, isDropDown: true};
        const updatedHeader = header(prevState, action);
        expect(updatedHeader).toStrictEqual(expectedValue);
    });

    it('Test action with ShowGoBackButton type: Defined State', () => {
        const action : ShowGoBackOnButtonClick = { 
            type: types.SHOW_GOBACK_BUTTON, 
            showBackButton: false,
        };
        const expectedValue = {...prevState, showBackButton: false};
        const updatedHeader = header(prevState, action);
        expect(updatedHeader).toStrictEqual(expectedValue);
    });

    it('Test action with UpdateSelectedPage type: Default State', () => {
        const selected = MainAppStack[2];
        const action : UpdateSelectedPageAction = { 
            type: types.UPDATE_SELECTED_PAGE, 
            selected,
        };
        const expectedValue = {...initialState, currentPage: selected};
        const updatedHeader = header(initialState, action);
        expect(updatedHeader).toStrictEqual(expectedValue);
    });
});