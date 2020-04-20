/* eslint-disable react/static-property-placement */
import {
    View,
    StyleSheet,
    StatusBar,
    Platform,
    TouchableOpacity,
    Text,
    Dimensions,
} from 'react-native';
import React from 'react';
import * as BaseStyles from 'homepairs-base-styles';
import { HamburgerButton } from 'homepairs-elements';
import {
    HomePairsDimensions,
    HeaderState,
    MainAppStackType,
    AccountTypes,
} from 'homepairs-types';
import {NavigationRouteHandler, isNullOrUndefined} from 'homepairs-utilities';
import { HomePairsHeaderTitle } from './HomePairsHeaderTitle';
import HomePairsMenu from './HomePairsHeaderMenu';

const backSymbol = '<';
const { DROP_MENU_WIDTH } = HomePairsDimensions;

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
};
export type HomePairsHeaderProps = HomePairsHeaderDispatchProps &
    HomePairsHeaderStateProps &
    NavigationRouteHandler & 
    {
        /**
         * Used to indicate an instance of this component when testing
         */
        testID?: string,
    };


const colorScheme = BaseStyles.LightColorTheme;

const styles = StyleSheet.create({
    container: {
        shadowOpacity: 0.1,
        shadowRadius: 1,
        shadowOffset: { width: 0, height: 2 },
        elevation: 1,
        marginTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight,
        backgroundColor: colorScheme.secondary,
        shadowColor: colorScheme.shadow,
        minHeight: 50,
    },
    homePairsTitle: {
        fontFamily: BaseStyles.FontTheme.primary,
        fontSize: BaseStyles.FontTheme.title,
        color: colorScheme.primary,
        flex: 1,
    },
    goBackSymbol: {
        fontFamily: BaseStyles.FontTheme.primary,
        fontSize: BaseStyles.FontTheme.lg,
        color: colorScheme.primary,
        flex: 1,
    },
    goBackButton: {
        backgroundColor: colorScheme.secondary,
        padding: BaseStyles.MarginPadding.mediumConst,
        paddingTop: 20,
        alignItems: 'center',
        position: 'absolute',
        zIndex: 1,
    },
});

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
        const {navigation, onUpdateSelected} = this.props;
        const startingOption = navigation.getCurrentRouteStack();
        if(!isNullOrUndefined(startingOption))
            onUpdateSelected(startingOption);

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
        const { navigation, onToggleMenu, onShowGoBackbutton } = this.props;
        navigation.goBack();
        if (navigation.isNavigatorAtBaseRoute()) {
            onShowGoBackbutton(false);
        }
        onToggleMenu(false);
    }

    showBackButton() {
        const { header } = this.props;
        return (header.showBackButton && Platform.OS !== 'web') ? (
            <TouchableOpacity 
                testID='homepairs-header-go-back'
                onPress={this.goBack} 
                style={styles.goBackButton}>
                <Text style={styles.goBackSymbol}>{backSymbol}</Text>
            </TouchableOpacity>
        ) : (
            <></>
        );
    }

    renderHamburger() {
        const { header } = this.props;
        if (header.isDropDown) {
            return (
                <View style={{ flex: 2 }}>
                    <HamburgerButton 
                        testID='homepairs-header-hamburger-button' 
                        onClick={this.toggleMenu} />
                </View>
            );
        }
        return <></>;
    }

    render() {
        const { header, navigation, accountType, onLogOut } = this.props;
        return (
            <View style={styles.container}>
                <View
                    style={header.isDropDown ? { flexDirection: 'column' } : { flexDirection: 'row' }}>
                    <View
                        style={{flexDirection: 'row',backgroundColor: colorScheme.secondary}}>
                        {this.showBackButton()}
                        <View
                            style={{marginLeft: BaseStyles.MarginPadding.largeConst}}>
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
            </View>
        );
    }
}
