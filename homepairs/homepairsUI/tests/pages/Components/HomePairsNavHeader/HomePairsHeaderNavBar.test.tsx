
import React from 'react';
import { HeaderMockStores } from 'tests/fixtures/StoreFixture';
import { HomePairsHeader } from 'homepairs-components';
import { mockStackNavigationFirstRoute, navigationStackSpyFunction } from 'tests/fixtures/DummyComponents';
import { fireEvent, render } from 'react-native-testing-library';
import { Provider } from 'react-redux';
import { HEADER_ACTION_TYPES } from 'src/state/header/actions';
import { 
    HeaderAction, 
    UpdateSelectedPageAction, 
    ShowGoBackOnButtonClick, 
    ToggleMenuAction,
    MainAppStackType,
} from 'homepairs-types';
import { TouchableOpacity} from 'react-native';
import { navigationPages } from 'src/Routes/RouteConstants';


const navigationHeaderMockStores = HeaderMockStores;
const mockMainAppStack: MainAppStackType[] = [
    {
        title: 'Properties',
        navigate: navigationPages.PropertiesScreen,
        key: 'Properties',
        button: 'Add Property',
    },
    {
        title: 'Service Request',
        navigate: navigationPages.ServiceRequestScreen,
        key: 'ServiceRequest',
        button: 'Request Service',
    },
    {
        title: 'Account Settings',
        navigate: navigationPages.AccountSettings,
        key: 'AccountSettings',
    },
    {
        title: 'Log Out',
        navigate: navigationPages.LoginScreen,
        key: 'LogOut',
    },
];
const HOMEPAIRS_MENU_TEST= 'homepairs-header-menu';
const HOMEPAIRS_TITLE_TEST = 'homepairs-header-title';
const GO_BACK_BUTTON_TEST = 'homepairs-header-go-back';
const HAMBURGER_TEST= 'homepairs-header-hamburger-button';
const HOMEPAIRS_HEADER_TEST = 'homepairs-header-base';
const mockAddEventListener = jest.fn();
const mockRemoveEventListener = jest.fn();

// Mock the test envirnment that would initially render a navBar
jest.mock('react-native', () => {
    const ReactNative = jest.requireActual('react-native');
    return Object.defineProperty(ReactNative,'Dimensions', {
        get: jest.fn(() => {
            return {
                get: jest.fn().mockReturnValue({width: 800, height:500}),
                addEventListener: mockAddEventListener,
                removeEventListener: mockRemoveEventListener,
            };
        }),
    });
});

describe('HomePairsHeader Integration Test for NavBarMenu', () => {
    beforeEach(()=>{
        navigationStackSpyFunction.mockClear();
    });
   
    describe('Test for navBar and no goBackButton', () =>{
        const store = navigationHeaderMockStores.navBarNoBack;
        const HeaderComponent = (
            <Provider store={store}><HomePairsHeader navigation={mockStackNavigationFirstRoute}/></Provider>
        );
        const rendered = render(HeaderComponent);
        const {getByTestId, queryByTestId, getAllByType} = rendered;
        beforeEach(() => {
            store.clearActions();
            navigationStackSpyFunction.mockClear();
        });

        it('Test that Proper Child Components have rendered', () => {
            expect(getByTestId(HOMEPAIRS_MENU_TEST)).toBeDefined();
            expect(getByTestId(HOMEPAIRS_TITLE_TEST)).toBeDefined();
            expect(queryByTestId(HAMBURGER_TEST)).toBeNull();
            expect(queryByTestId(GO_BACK_BUTTON_TEST)).toBeNull();
        });

        it('Test Menu Option', () => {
            const expectedShowBackButton: ShowGoBackOnButtonClick = {
                type: HEADER_ACTION_TYPES.SHOW_GOBACK_BUTTON,
                showBackButton: false,
            };
            const expectedSelectedPage: UpdateSelectedPageAction = {
                type: HEADER_ACTION_TYPES.UPDATE_SELECTED_PAGE,
                selected: mockMainAppStack[2],
            };
            const expectedToggleMenu: ToggleMenuAction = {
                type: HEADER_ACTION_TYPES.TOGGLE_MENU,
                showMenu: true,
            };
            const expectedActions : HeaderAction[] = [
                expectedShowBackButton,
                expectedSelectedPage, 
                expectedToggleMenu,
            ];
            // Now test to see if hamburger functionality works
            const menuPressables = getAllByType(TouchableOpacity);
            
            // Since no other TouchableOpacity exists, there should only be at most four rendered.
            fireEvent.press(menuPressables[2]);
            expect(store.getActions()).toStrictEqual(expectedActions);
            expect(navigationStackSpyFunction).toHaveBeenCalledWith(mockMainAppStack[2].navigate);
        });
    });

    // Need to speparate this test from the others since it umounts the test. So we need to render 
    // a component specifically for testing the handle change function
    it('Test Handle Change Function', () =>{
        const store = navigationHeaderMockStores.navBarNoBack;
        const HeaderComponent = (
            <Provider store={store}><HomePairsHeader navigation={mockStackNavigationFirstRoute}/></Provider>
        );
        const rendered = render(HeaderComponent);
        const {getByTestId, queryByTestId} = rendered;
      
        // Check to see if proper subComponents are rendered 
        expect(getByTestId(HOMEPAIRS_MENU_TEST)).toBeDefined();
        expect(getByTestId(HOMEPAIRS_TITLE_TEST)).toBeDefined();
        expect(queryByTestId(GO_BACK_BUTTON_TEST)).toBeNull();
        
        // Test the handleChange method 
        const {handleChange} = getByTestId(HOMEPAIRS_HEADER_TEST).instance;
        handleChange();

        rendered.unmount();

        expect(mockAddEventListener).toHaveBeenCalled();
        expect(mockRemoveEventListener).toHaveBeenCalled();
    });

});