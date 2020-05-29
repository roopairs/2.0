import React from 'react';
import { 
    propertyManagerMock1, 
    HeaderMockStores,
    prepareNavigationStackFirstRouteMock, 
    prepareNavigationMock } from 'homepairs-test';
import { fireEvent, render } from 'react-native-testing-library';
import { Provider } from 'react-redux';
import { HEADER_ACTION_TYPES } from 'homepairs-redux-actions';
import { 
    HeaderAction, 
    UpdateSelectedPageAction, 
    SwitchDropDownNavBarAction, 
    ToggleMenuAction,
    MainAppStackType,
} from 'homepairs-types';
import { TouchableOpacity, Platform} from 'react-native';
import { BrowserRouter as Router } from 'react-router-dom';
import { navigationPages } from 'src/routes';
import HomePairsHeader from '../HomePairsHeader';


const [mockStackNavigation, navigationStackSpyFunction] = prepareNavigationMock();
const [mockStackNavigationFirstRoute] = prepareNavigationStackFirstRouteMock();

const mockStore = propertyManagerMock1;
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
const CLICK_HAMBURGER = 'click-hamburger-button';
const HOMEPAIRS_HEADER_TEST = 'homepairs-header-base';

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


// TODO: Fix tests to account for removal of GoBack Button 
describe('HomePairsHeader Integration Test for DropDownMenu', () => {
    beforeEach(()=>{
        navigationStackSpyFunction.mockClear();
    });


    it('Test for basic rendering', () => {
        const expectedHandleChangeActions: HeaderAction[] = [
            {
                type: HEADER_ACTION_TYPES.SWITCH_DROPDOWN_NAVBAR,
                isDropDown: true,
            },
            {
                type: HEADER_ACTION_TYPES.SWITCH_DROPDOWN_NAVBAR,
                isDropDown: true,
            },
            {
                type: HEADER_ACTION_TYPES.SWITCH_DROPDOWN_NAVBAR,
                isDropDown: true,
            },
        ];
        const HeaderComponent = Platform.OS === 'web' ? (
            <Provider store={mockStore}><Router><HomePairsHeader navigation={mockStackNavigation}/></Router></Provider>
        ) : (
            <Provider store={mockStore}><HomePairsHeader navigation={mockStackNavigation}/></Provider>
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

        // Now change the dimensions to return a new value. This should change which 
        // action is invoked
        handleChange();
        
        expect(mockStore.getActions()).toStrictEqual(expectedHandleChangeActions);
    
    });

    it('Test for dropDown hidden and no goBackButton', () => {
        const expectedSwitchNavBarAction: SwitchDropDownNavBarAction = {
            type: HEADER_ACTION_TYPES.SWITCH_DROPDOWN_NAVBAR,
            isDropDown: true,
        };
        const expectedToggleMenuAction: ToggleMenuAction = {
            type: HEADER_ACTION_TYPES.TOGGLE_MENU,
            showMenu: true,
        };
        const expectedActions = [
            expectedSwitchNavBarAction,
            expectedToggleMenuAction, 
        ];

        const store = navigationHeaderMockStores.dropDownHiddenNoBack;
        const HeaderComponent = Platform.OS === 'web' ? (
            <Provider store={store}><Router><HomePairsHeader navigation={mockStackNavigation}/></Router></Provider>
        ) : (
            <Provider store={store}><HomePairsHeader navigation={mockStackNavigation}/></Provider>
        );
        const rendered = render(HeaderComponent);
        const {getByTestId, queryByTestId} = rendered;

        expect(getByTestId(HOMEPAIRS_MENU_TEST)).toBeDefined();
        expect(getByTestId(HOMEPAIRS_TITLE_TEST)).toBeDefined();
        expect(queryByTestId(GO_BACK_BUTTON_TEST)).toBeNull();

        // Now test to see if hamburger functionality works
        const hamburgerPressable = getByTestId(CLICK_HAMBURGER);
        fireEvent.press(hamburgerPressable);

        expect(store.getActions()).toStrictEqual(expectedActions);

    });

    describe('Test for dropDown hidden and with goBackButton', () =>{
        const store = navigationHeaderMockStores.dropDownHiddenWithBack;
        const HeaderComponent = Platform.OS === 'web' ? (
            <Provider store={store}><Router><HomePairsHeader navigation={mockStackNavigation}/></Router></Provider>
        ) : (
            <Provider store={store}><HomePairsHeader navigation={mockStackNavigation}/></Provider>
        );
        const rendered = render(HeaderComponent);
        const {getByTestId, queryByTestId} = rendered;
        
        beforeEach(() => {
            store.clearActions();
            navigationStackSpyFunction.mockClear();
        });

        it('Test that Proper Child Components have rendered', () => {
            expect(getByTestId(HOMEPAIRS_MENU_TEST)).toBeDefined();
            expect(getByTestId(HOMEPAIRS_TITLE_TEST)).toBeDefined();
            expect(queryByTestId(GO_BACK_BUTTON_TEST)).toBeDefined();
        });

        it('Test Hamburger Button', () => {
            const expectedHamburgerAction: HeaderAction = {
                type: HEADER_ACTION_TYPES.TOGGLE_MENU,
                showMenu: true,
            };
            // Now test to see if hamburger functionality works
            const hamburgerPressable = getByTestId(CLICK_HAMBURGER);
            fireEvent.press(hamburgerPressable);
            expect(store.getActions()[0]).toStrictEqual(expectedHamburgerAction);
        
        });

        it('Test GoBack button', () => {
            const expectedBackAction: HeaderAction[] = [      
                {
                    type: HEADER_ACTION_TYPES.TOGGLE_MENU,
                    showMenu: false,
                },
            ];
            // Test to see if go Back button invokes the proper actions 
            const goBackPressable = getByTestId(GO_BACK_BUTTON_TEST);
            fireEvent.press(goBackPressable);
            expect(navigationStackSpyFunction).toHaveBeenCalled();

            // NOTE: Since the navigation object is mock, it will not actually reduce the index of the
            // navigation.state by one. So we will simply have to test as if pop() does not reduce the index 
            // by one. For the purposes of testing, this will suffice. 
            expect(store.getActions()).toStrictEqual(expectedBackAction);
        });
    });

    describe('Test for dropDown revealed and no goBackButton', () =>{
        const store = navigationHeaderMockStores.dropDownRevealedNoBack;
        const HeaderComponent = Platform.OS === 'web' ? (
            <Provider store={store}><Router><HomePairsHeader navigation={mockStackNavigation}/></Router></Provider>
        ) : (
            <Provider store={store}><HomePairsHeader navigation={mockStackNavigation}/></Provider>
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
            expect(queryByTestId(GO_BACK_BUTTON_TEST)).toBeNull();
        });

        it('Test Hamburger Button', () => {
            const expectedHamburgerAction: HeaderAction = {
                type: HEADER_ACTION_TYPES.TOGGLE_MENU,
                showMenu: false,
            };
            // Now test to see if hamburger functionality works
            const hamburgerPressable = getByTestId(CLICK_HAMBURGER);
            fireEvent.press(hamburgerPressable);
            expect(store.getActions()[0]).toStrictEqual(expectedHamburgerAction);
        
        });

        it('Test Menu Option', () => {
            const expectedShowGoBackAction: HeaderAction = {
                type: HEADER_ACTION_TYPES.SHOW_GOBACK_BUTTON,
                showBackButton: false,
            };
            const expectedSelectedPage: UpdateSelectedPageAction = {
                type: HEADER_ACTION_TYPES.UPDATE_SELECTED_PAGE,
                selected: mockMainAppStack[2],
            };
            const expectedToggleMenu: ToggleMenuAction = {
                type: HEADER_ACTION_TYPES.TOGGLE_MENU,
                showMenu: false,
            };
            const expectedActions : HeaderAction[] = [
                expectedShowGoBackAction, 
                expectedSelectedPage, 
                expectedToggleMenu,
            ];
            // Now test to see if hamburger functionality works
            const menuPressables = getAllByType(TouchableOpacity);
            
            // Recall that we have a hamburger button. The testID seems to not work on web 
            // so this is a workaround.
            fireEvent.press(menuPressables[3]);

            expect(store.getActions()).toStrictEqual(expectedActions);
            expect(navigationStackSpyFunction).toHaveBeenCalledWith(mockMainAppStack[2].navigate);
        
        });
    });

    describe('Test for dropDown revealed and with goBackButton, this will also test navigation rendering base on route', () =>{
        const store = navigationHeaderMockStores.dropDownRevealedWithBack;
        const HeaderComponent = Platform.OS === 'web' ? (
            <Provider store={store}><Router><HomePairsHeader navigation={mockStackNavigationFirstRoute}/></Router></Provider>
        ) : (
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
            expect(queryByTestId(GO_BACK_BUTTON_TEST)).toBeDefined();
        });

        it('Test Hamburger Button', () => {
            const expectedHamburgerAction: HeaderAction = {
                type: HEADER_ACTION_TYPES.TOGGLE_MENU,
                showMenu: false,
            };
            // Now test to see if hamburger functionality works
            const hamburgerPressable = getByTestId(CLICK_HAMBURGER);
            fireEvent.press(hamburgerPressable);
            expect(store.getActions()[0]).toStrictEqual(expectedHamburgerAction);
        
        });

        it('Test GoBack button', () => {
            const expectedBackAction: HeaderAction[] = [
                {
                    type: HEADER_ACTION_TYPES.SHOW_GOBACK_BUTTON,
                    showBackButton: false,
                },     
                {
                    type: HEADER_ACTION_TYPES.TOGGLE_MENU,
                    showMenu: false,
                },
            ];
            // Test to see if go Back button invokes the proper actions 
            const goBackPressable = getAllByType(GO_BACK_BUTTON_TEST);
            fireEvent.press(goBackPressable);
            expect(navigationStackSpyFunction).toHaveBeenCalled();

            // NOTE: Since the navigation object is mock, it will not actually reduce the index of the
            // navigation.state by one. So we will simply have to test as if pop() does not reduce the index 
            // by one. For the purposes of testing, this will suffice. 
            expect(store.getActions()).toStrictEqual(expectedBackAction);
        });

        it('Test Menu Option', () => {
            const expectedShowGoBackAction: HeaderAction = {
                type: HEADER_ACTION_TYPES.SHOW_GOBACK_BUTTON,
                showBackButton: false,
            };
            const expectedSelectedPage: UpdateSelectedPageAction = {
                type: HEADER_ACTION_TYPES.UPDATE_SELECTED_PAGE,
                selected: mockMainAppStack[2],
            };
            const expectedToggleMenu: ToggleMenuAction = {
                type: HEADER_ACTION_TYPES.TOGGLE_MENU,
                showMenu: false,
            };
            const expectedActions : HeaderAction[] = [
                expectedShowGoBackAction, 
                expectedSelectedPage, 
                expectedToggleMenu,
            ];
            // Now test to see if hamburger functionality works
            const menuPressables = getAllByType(TouchableOpacity);
            
            // Recall that we have a hamburger button and a goBackButton. The testID seems to not work on web 
            // so this is a workaround. We must offset the pressables by 2
            fireEvent.press(menuPressables[4]);

            expect(store.getActions()).toStrictEqual(expectedActions);
            expect(navigationStackSpyFunction).toHaveBeenCalledWith(mockMainAppStack[2].navigate);
        
        });
    });

});
