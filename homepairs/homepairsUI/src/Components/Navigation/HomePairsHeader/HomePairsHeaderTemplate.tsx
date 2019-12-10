import { StyleSheet, Platform, Dimensions } from 'react-native';
import React from 'react'
import { NavigationProps } from '../../../utility/NavigationProps';
import { HeaderState } from '../../../state/types';


/** 
 * This component is intended to hold all the functionality that should exits within any header 
 * regardless of Platform. 
*/

const DROP_MENU_WIDTH : number = 700

type HomePairsHeaderProps = NavigationProps & {
    header: HeaderState,
    onToggleMenu: (showMenu:boolean) => any,
    onShowGoBackbutton: (showBackButton: boolean) => any,
    onSwitchNavBar: (switchNavBar: boolean) => any,
    onUpdateSelected: (selected: number) => any, 
}

export default abstract class HomePairsHeaderTemplate extends React.Component <HomePairsHeaderProps> {
    
    toggleMenu = () => {
        this.props.onToggleMenu(!this.props.header.showMenu) //Flips true/false
    }
    
    handleChange = () => {
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

    changePage = (arg0 : number) => {
        this.props.onUpdateSelected(arg0) //Flips true/false
    }
}

const HeaderStyles = StyleSheet.create({
    container: {
        width:'100%',
        backgroundColor: '#1177B0',
        alignContent: 'center'
    },
    text: {
       fontSize: 30,
       alignSelf: 'center',
       color: 'red'
    },
    headerStyle: { 
        width:'100%',
        backgroundColor: '#fff',
        alignContent: 'center'
    },      


 })

export {HeaderStyles, HomePairsHeaderTemplate}