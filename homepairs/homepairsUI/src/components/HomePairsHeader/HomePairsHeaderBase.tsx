/* eslint-disable react/static-property-placement */
import {
    View,
    Platform,
    TouchableOpacity,
    Text,
    Dimensions,
    ScrollView,
} from 'react-native';
import React from 'react';
import {
    HomePairsDimensions,
    HeaderState,
    MainAppStackType,
    AccountTypes,
} from 'homepairs-types';
import { NavigationRouteHandler, navigationPages } from 'homepairs-routes';
import {isNullOrUndefined} from 'homepairs-utilities';
import HamburgerButton from './HamburgerButton/HamburgerButton';
import { HomePairsHeaderTitle } from './HomePairsHeaderTitle/HomePairsHeaderTitle';
import HomePairsMenu from './HomePairsHeaderMenu/HomePairsHeaderMenu';
import styles from './styles';
import { PreferredProviderFlatList } from '../PreferredProviderFlatList';


const backSymbol = '<';
const { DROP_MENU_WIDTH } = HomePairsDimensions;

/**
 * These are a list of all pages the define a root of a stack navigation
 * Users in mobile should not be able to navigate backwards from these 
 * pages. However, web should permit these pages.
 */
const HeaderNavigators: string[] = [
    navigationPages.PropertiesScreen,
    navigationPages.ServiceRequestScreen,
    navigationPages.AccountSettings,
    navigationPages.LoginScreen,
    navigationPages.TenantProperty,
];

export type HomePairsHeaderStateProps = {
    header: HeaderState;
    accountType: AccountTypes
};
export type HomePairsHeaderDispatchProps = {
    onToggleMenu: (showMenu: boolean) => any;
    onShowGoBackbutton: (showBackButton: boolean) => any;
    onSwitchNavBar: (switchNavBar: boolean) => any;
    onUpdateSelected: (selected: MainAppStackType) => any;
    onLogOut: (authed:boolean) => any;
    onClickBackButton: () => any;
};
export type HomePairsHeaderProps = 
& HomePairsHeaderDispatchProps 
& HomePairsHeaderStateProps 
& NavigationRouteHandler 
& {
    /**
     * Used to indicate an instance of this component when testing
     */
    testID?: string,

    children?: any,
};

/**
 * ---------------------------------------------------
 * HomePairs Header Base
 * ---------------------------------------------------
 * The main component used for the homepairs header navigator. It is capable of rendering 
 * itself based on the dimension size of the window. It renders as a dropdown menu when below 
 * DROP_MENU_WIDTH and as a navBar when larger. It is intended to have functionality with the 
 * redux store's header reducer.
 * 
 * Children Components: 
 *  HomePairsHeaderMenu
 *  HomePairsTitle
 */
export default class HomePairsHeaderBase extends React.Component<HomePairsHeaderProps> {

    static defaultProps = {
        testID: 'homepairs-header-base',
    };

    constructor(props: Readonly<HomePairsHeaderProps>) {
        super(props);
        this.toggleMenu = this.toggleMenu.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.changePage = this.changePage.bind(this);
        this.goBack = this.goBack.bind(this);
        this.renderHamburger = this.renderHamburger.bind(this);
    }

    componentDidMount() {        
        // Here we will add our window listener
        const { width } = Dimensions.get('window');
        const { onSwitchNavBar } = this.props;
        if (width < DROP_MENU_WIDTH) {
            onSwitchNavBar(true);
        }
        Dimensions.addEventListener('change', this.handleChange);
    }
    
    componentWillUnmount() {
        // Here we clean up our component by removing the listener
        Dimensions.removeEventListener('change', this.handleChange);
    }

    changePage(page: MainAppStackType) {
        const { onUpdateSelected } = this.props;
        onUpdateSelected(page);
    }

    /**
     * Callback function to be passed into the Dimensions eventlistenter. It will 
     * invoke a state change to this component based on the width of the window. 
     * TODO: Search for a cleaner way of doing this specifically for web platforms. 
     */
    handleChange() {
        const { width } = Dimensions.get('window');
        const { onSwitchNavBar } = this.props;

        if (width < DROP_MENU_WIDTH) {
            onSwitchNavBar(true);
        } else {
            onSwitchNavBar(false);
        }
    }

    toggleMenu() {
        const { onToggleMenu, header } = this.props;
        onToggleMenu(!header.showMenu);
    }

    /**
     * This function navigates to the previous screen and then hides the goBack button
     * if the screen is the first in the navigation stack.
     *
     * Navigation Stack stores its indices in the state. If the index is not defined or
     * if the index is 0, then we are at the beggining of the stack.
     * */
    goBack() {
        const { navigation, onToggleMenu, onClickBackButton } = this.props;
        navigation.goBack();
        onClickBackButton();
        onToggleMenu(false);
    }

    showBackButton() {
        const { header } = this.props;
        const showBackButton = !(header.currentPage != null && HeaderNavigators.includes(header.currentPage.navigate));
        
        // If header is not dropdown and is on a web platform, do not show the back button.
        if (!header.isDropDown && Platform.OS === 'web'){
            return <></>;
        } 

        // If on mobile, show the back button when the showBackButton is set. Otherwise, we are at a drop down menu on web
        // which implies a mobile view on web. Always render the back button in this case.
        return (showBackButton || Platform.OS === 'web') ? (
            <TouchableOpacity 
                testID='homepairs-header-go-back'
                onPress={this.goBack} 
                style={styles.goBackButton}>
                <Text style={styles.goBackSymbol}>{backSymbol}</Text>
            </TouchableOpacity>
        ) : (
            <View 
                testID='homepairs-header-go-back-disabled'
                style={styles.goBackButtonEnd}>
                 <Text style={styles.goBackSymbol}>{backSymbol}</Text>
                </View>
        );
    }

    renderHamburger() {
        const { header } = this.props;
        if (header.isDropDown) {
            return (
                <View style={styles.hamburgerContainer}>
                    <HamburgerButton 
                        testID='homepairs-header-hamburger-button' 
                        onClick={this.toggleMenu} />
                </View>
            );
        }
        return <></>;
    }

    render() {
        const { header, navigation, accountType, onLogOut, children } = this.props;
        return (
            <>
            <View style={styles.container}>
                <View
                    style={header.isDropDown ? styles.dropDownFlexDirection : styles.navBarFlexDirection}>
                    <View
                        style={styles.titleBackContainer}>
                        {this.showBackButton()}
                        <View
                            style={styles.titleContainer}>
                            <HomePairsHeaderTitle
                                testID='homepairs-header-title'
                                isDropDown={header.isDropDown}/>
                        </View>
                        {this.renderHamburger()}
                    </View>
                    <HomePairsMenu
                        testID='homepairs-header-menu'
                        navigation={navigation}
                        selectedPage={header.currentPage}
                        parentCallBack={this.changePage}
                        toggleMenu={this.toggleMenu}
                        isDropDown={header.isDropDown}
                        showMenu={header.showMenu}
                        setAuthenticatedState={(authed:boolean) => onLogOut(authed)}
                        accountType={accountType}/>
            </View>
            { 
                accountType === AccountTypes.PropertyManager
                && header.currentPage.navigate === HeaderNavigators[1] 
                ? <PreferredProviderFlatList /> 
                : <></>
            }
            { console.log(header.currentPage.navigate) }
            { console.log(HeaderNavigators[1]) }
            </View>
            {
                isNullOrUndefined(children) 
                ? <></>
                : <ScrollView style={{flex: 1}} contentContainerStyle={{flexGrow: 1}}>
                    {children}
                  </ScrollView>
            }
            </>
        );
    }
}
