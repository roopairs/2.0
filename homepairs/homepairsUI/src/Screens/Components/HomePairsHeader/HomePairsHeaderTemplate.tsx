import { Dimensions } from 'react-native';
import React from 'react';
import { HeaderState, MainNavigationStackProps } from 'homepair-types';
import { HomePairsDimensions } from 'homepair-types';
import { DarkModeInjectedProps } from '../WithDarkMode/WithDarkMode';
import { NavigationInjectedProps, NavigationStackAction } from 'react-navigation';

/** 
 * This component is intended to hold all the functionality that should exits within any header 
 * regardless of Platform. 
*/

const DROP_MENU_WIDTH : number = HomePairsDimensions.DROP_MENU_WIDTH

export type HomePairsHeaderStateProps = {
    header: HeaderState,
    isDarkModeActive: boolean,
}
export type HomePairsHeaderDispatchProps = {
    onToggleMenu: (showMenu:boolean) => any,
    onShowGoBackbutton: (showBackButton: boolean) => any,
    onSwitchNavBar: (switchNavBar: boolean) => any,
    onUpdateSelected: (selected: MainNavigationStackProps) => any,
}
export type HomePairsHeaderProps = HomePairsHeaderDispatchProps & HomePairsHeaderStateProps & DarkModeInjectedProps 
& NavigationInjectedProps & NavigationStackAction

export default abstract class HomePairsHeaderTemplate extends React.Component<HomePairsHeaderProps> {
    constructor(props: Readonly<HomePairsHeaderProps>){
        super(props)
        this.toggleMenu = this.toggleMenu.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.changePage = this.changePage.bind(this)
    }
    
    toggleMenu() {
        this.props.onToggleMenu(!this.props.header.showMenu)
    }
    
    handleChange() {
        var width= Dimensions.get('window').width
        if(width < DROP_MENU_WIDTH){
            this.props.onSwitchNavBar(true)
        }else{
            this.props.onSwitchNavBar(false)
        }
    }

    /**Here we will add our window listener */
    componentDidMount(){
        var width = Dimensions.get('window').width
        if(width < DROP_MENU_WIDTH){
            this.props.onSwitchNavBar(true)
        }
        Dimensions.addEventListener("change", this.handleChange)
    }
    /**
     * Here we clean up our component by removing the listener
     */
    componentWillUnmount(){
        Dimensions.removeEventListener("change", this.handleChange)
    }
    changePage(page : MainNavigationStackProps) {
        this.props.onUpdateSelected(page)
    }
}
export {HomePairsHeaderTemplate}