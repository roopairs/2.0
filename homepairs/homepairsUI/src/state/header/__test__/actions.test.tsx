import { MainAppStack}  from 'homepairs-routes';
import { 
    ToggleMenuAction,
    SwitchDropDownNavBarAction,
    ShowGoBackOnButtonClick,
    UpdateSelectedPageAction,
} from '../../types';
import * as HeaderActions from '../actions';


const types = HeaderActions.HEADER_ACTION_TYPES;

describe('Test suite for header Actions', () => {
    describe('Test Toggle Menu', () => {
        const type = types.TOGGLE_MENU;
        const expectedValues: {[id:string] : ToggleMenuAction} = {
            TRUE: { type, showMenu: true},
            FALSE: {type, showMenu: false },
        };
        it('For true', () => {
            expect(HeaderActions.toggleMenu(true)).toStrictEqual(expectedValues.TRUE);
        });
        it('For false', () => {
            expect(HeaderActions.toggleMenu(false)).toStrictEqual(expectedValues.FALSE);
        });
    });

    describe('Test SwitchDropDownNavBar Menu', () => {
        const type = types.SWITCH_DROPDOWN_NAVBAR;
        const expectedValues: {[id:string] : SwitchDropDownNavBarAction} = {
            TRUE: { type, isDropDown: true},
            FALSE: {type, isDropDown: false },
        };
        it('For true', () => {
            expect(HeaderActions.switchDropdownNavbar(true)).toStrictEqual(expectedValues.TRUE);
        });
        it('For false', () => {
            expect(HeaderActions.switchDropdownNavbar(false)).toStrictEqual(expectedValues.FALSE);
        });
    });

    describe('Test ShowGoBackButton', () => {
        const type = types.SHOW_GOBACK_BUTTON;
        const expectedValues: {[id:string] : ShowGoBackOnButtonClick} = {
            TRUE: { type, showBackButton: true},
            FALSE: {type, showBackButton: false },
        };
        it('For true', () => {
            expect(HeaderActions.showGoBackButton(true)).toStrictEqual(expectedValues.TRUE);
        });
        it('For false', () => {
            expect(HeaderActions.showGoBackButton(false)).toStrictEqual(expectedValues.FALSE);
        });
    });

    describe('Test UpdateSelectedPage', () => {
        const type = types.UPDATE_SELECTED_PAGE;
        const selected = MainAppStack[0];
        const expectedValue: UpdateSelectedPageAction = {type, selected};
        it('Test to see if action is returned', () => {
            expect(HeaderActions.updateSelectedPage(selected)).toStrictEqual(expectedValue);
        });
    });

});

