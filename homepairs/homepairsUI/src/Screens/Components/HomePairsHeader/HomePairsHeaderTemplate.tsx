import { Dimensions } from 'react-native';
import React from 'react';
import {
    HeaderState,
    MainAppStackType,
    HomePairsDimensions,
} from 'homepair-types';
import {
    NavigationInjectedProps,
    NavigationStackAction,
} from 'react-navigation';
import { DarkModeInjectedProps } from '../WithDarkMode/WithDarkMode';

/**
 * This component is intended to hold all the functionality that should exits within any header
 * regardless of Platform.
 */

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
    DarkModeInjectedProps &
    NavigationInjectedProps &
    NavigationStackAction;

export default abstract class HomePairsHeaderTemplate extends React.Component<
    HomePairsHeaderProps
> {
    constructor(props: Readonly<HomePairsHeaderProps>) {
        super(props);
        this.toggleMenu = this.toggleMenu.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.changePage = this.changePage.bind(this);
    }

    /* * Here we will add our window listener */

    componentDidMount() {
        const { width } = Dimensions.get('window');
        const { onSwitchNavBar } = this.props;

        if (width < DROP_MENU_WIDTH) {
            onSwitchNavBar(true);
        }
        Dimensions.addEventListener('change', this.handleChange);
    }
    /**
     * Here we clean up our component by removing the listener
     */

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
}
export { HomePairsHeaderTemplate };
