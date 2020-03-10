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
import { MainAppStack } from '../../../src/Routes/RouteConstants';

/**
 * This entire test suite may seem redundant. That is because under normal circumstances, it is. 
 * However, the only way to get full test coverage using by mocking a React Native Module is by 
 * mocking it in a separate module and conducting the test again with added changes. In this 
 * case, the Dimensions module. 
 */
const types = HeaderActions.HEADER_ACTION_TYPES;
const prevState : HeaderState = {
    showMenu : false,
    isDropDown: true,
    currentPage: MainAppStack[0],
    showBackButton: true,
    menu: [
        strings.propertiesPage.title,
        strings.serviceRequestPage.title,
        strings.connectAccountPage.title,
        strings.logOut,
    ],
};

// Here, we mock the Dimensions module to simulate our environment. In this case
// one that would render a dropDown Menu
jest.mock('react-native', () => {
    const ReactNative = jest.requireActual('react-native');
    return Object.defineProperty(ReactNative,'Dimensions', {
        get: jest.fn(() => {
            return {
                get: jest.fn().mockReturnValue({width: 500, height:500}),
                addEventListener: jest.fn(),
                removeEventListener: jest.fn(),
            };
        }),
    });
});

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