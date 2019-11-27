import { StyleSheet, Platform } from 'react-native';
import React from 'react'
import { NavigationProps } from '../../../utility/NavigationProps';
import NavigationActions from 'react-navigation'

interface HomePairsHeaderProps extends NavigationProps {
    currentPage?: number,
}
interface HomePairsHeaderState{
   showMenu : boolean,
   isDropDown?: boolean,
   currentPage?: number,
}

export default abstract class HomePairsHeaderTemplate extends React.Component <HomePairsHeaderProps, HomePairsHeaderState> {

    constructor(props:any) {
        super(props);
        this.state = {
            showMenu : false,
        };
    }
    toggleMenu = () => {
        this.setState({showMenu : !this.state.showMenu}) //Flips true/false
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