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
import {
    StackActions,
    NavigationInjectedProps,
    NavigationStackAction,
    NavigationActions,
} from 'react-navigation';
import * as BaseStyles from 'homepairs-base-styles';
import { isNullOrUndefined } from 'homepairs-utilities';
import { HamburgerButton } from 'src/Elements';
import {
    HomePairsDimensions,
    HeaderState,
    MainAppStackType,
} from 'homepairs-types';
import { HomePairsHeaderTitle } from './HomePairsHeaderTitle';
import HomePairsMenu from './HomePairsHeaderMenu';
import { DarkModeInjectedProps } from '../WithDarkMode/WithDarkMode';
import { NavigationStackScreenProps } from 'react-navigation-stack';

const popAction = StackActions.pop({
    n: 1,
});
const backSymbol = '<';

const { DROP_MENU_WIDTH } = HomePairsDimensions;

export type HomePairsHeaderStateProps = {
    header: HeaderState;
    isDarkModeActive: boolean;
};
export type HomePairsHeaderDispatchProps = {
    onToggleMenu: (showMenu: boolean) => any;
    onShowGoBackbutton: (showBackButton: boolean) => any;
    onSwitchNavBar: (switchNavBar: boolean) => any;
    onUpdateSelected: (selected: MainAppStackType) => any;
};
export type HomePairsHeaderProps = HomePairsHeaderDispatchProps &
    HomePairsHeaderStateProps &
    NavigationStackScreenProps &
    NavigationStackAction;

function setColorTheme(colorScheme?: BaseStyles.ColorTheme) {
    const colors =
        isNullOrUndefined(colorScheme) ? BaseStyles.LightColorTheme : colorScheme;
    return StyleSheet.create({
        container: {
            shadowOpacity: 0.1,
            shadowRadius: 1,
            shadowOffset: { width: 0, height: 2 },
            elevation: 1,
            marginTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight,
            backgroundColor: colors.secondary,
            shadowColor: colors.shadow,
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
}

let styles = null;

class HomePairsHeaderBase extends React.Component<HomePairsHeaderProps> {
    colorScheme: any;

    constructor(props: Readonly<HomePairsHeaderProps>) {
        super(props);
        this.colorScheme = BaseStyles.LightColorTheme;
        styles = setColorTheme(this.colorScheme);
        this.toggleMenu = this.toggleMenu.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.changePage = this.changePage.bind(this);
        this.goBack = this.goBack.bind(this);
        this.renderHamburger = this.renderHamburger.bind(this);
    }


    // Here we will add our window listener
    componentDidMount() {
        const { width } = Dimensions.get('window');
        const { onSwitchNavBar } = this.props;

        if (width < DROP_MENU_WIDTH) {
            onSwitchNavBar(true);
        }
        Dimensions.addEventListener('change', this.handleChange);
    }
    
    // Here we clean up our component by removing the listener
    componentWillUnmount() {
        Dimensions.removeEventListener('change', this.handleChange);
    }

    changePage(page: MainAppStackType) {
        const { onUpdateSelected } = this.props;
        onUpdateSelected(page);
    }

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
        navigation.pop();

        // TODO: Bug here. Will need to adjust navigation to give us indices. Currently retuns undefined!!
        const navigationIndex = navigation.state.index;
        const isFirst = isNullOrUndefined(navigationIndex) || navigationIndex > 0;
        if (isFirst) {
            onShowGoBackbutton(false);
        }
        onToggleMenu(false);
    }

    showBackButton() {
        const { header } = this.props;
        return header.showBackButton ? (
            <TouchableOpacity onPress={this.goBack} style={styles.goBackButton}>
                <Text style={styles.goBackSymbol}>{backSymbol}</Text>
            </TouchableOpacity>
        ) : (
            <></>
        );
    }

    renderHeaderTitle() {
        const { header } = this.props;
        return (
            <HomePairsHeaderTitle
                showGoBackButton={header.showBackButton}
                toggleMenuCallBack={this.toggleMenu}
                isDropDown={header.isDropDown}
            />
        );
    }

    renderMenu() {
        const { header } = this.props;
        return (
            <HomePairsMenu
                selectedPage={header.currentPage}
                parentCallBack={this.changePage}
                toggleMenu={this.toggleMenu}
                isDropDown={header.isDropDown}
                showMenu={header.showMenu}
            />
        );
    }

    renderHamburger() {
        const { header } = this.props;
        if (header.isDropDown) {
            return (
                <View style={{ flex: 2 }}>
                    <HamburgerButton onClick={this.toggleMenu} />
                </View>
            );
        }
        return <></>;
    }

    render() {
        const { header } = this.props;
        return (
            <View style={styles.container}>
                <View
                    style={
                        header.isDropDown
                            ? { flexDirection: 'column' }
                            : { flexDirection: 'row' }
                    }>
                    <View
                        style={{
                            flexDirection: 'row',
                            backgroundColor: this.colorScheme.secondary,
                        }}>
                        {this.showBackButton()}
                        <View
                            style={{marginLeft: BaseStyles.MarginPadding.largeConst}}>
                            {this.renderHeaderTitle()}
                        </View>
                        {this.renderHamburger()}
                    </View>
                    {this.renderMenu()}
                </View>
            </View>
        );
    }
}
export default HomePairsHeaderBase;
