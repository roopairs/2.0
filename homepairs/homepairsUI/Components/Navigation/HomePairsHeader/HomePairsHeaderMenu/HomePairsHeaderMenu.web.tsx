import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react'
import { NavigationProps } from '../../../../utility/NavigationProps';

/**
 * Unlike the native Menus, the web menu is capable of rendering two separate 
 * components that can change based on the browsers window size. Since browsers 
 * allow window changing, we provide a webPage view when sufficeintly large and a
 * mobile friendly view when the page is tiny. 
 */
interface HomePairsMenuProps extends NavigationProps {
    selectedPage : number;
    parentCallBack?: (arg0?: any) => any;
    isDropDown?: boolean;
    showMenu?: boolean;
    parentCloseMenu?: (arg0?:any) => any;
}
interface HomePairsMenuState {
    currentPage : number;
    pages : {title: String, navigationFunction: () => void } []
}

export default class HomePairsMenu extends React.Component<HomePairsMenuProps, HomePairsMenuState>{
    nav: any;
    selectedPage? : number;
    focusListener: any;
    constructor(props: Readonly<HomePairsMenuProps>) {
        super(props);
        this.nav= this.props.navigation
        this.selectedPage = (this.props.selectedPage == null) ? 0 : this.props.selectedPage
        this.state = {
            currentPage : this.selectedPage ,
            pages : [
                {
                    title: 'Properties', 
                    navigationFunction: this.navProperties, 
                }, 
                {
                    title: 'Service Request', 
                    navigationFunction: this.navServiceRequest, 
                }, 
                {
                    title: 'Account Settings',
                    navigationFunction: this.navAccount,
                },
                {
                    title: 'Log Out', 
                    navigationFunction: this.navAuth, 
                },
            ]
        }
    }



    setSelected = (index : number) => {this.selectedPage = index};
    navAuth = () => { this.nav.navigate('Auth') };
    navServiceRequest = () => { 
        this.setSelected(1)
        this.nav.navigate('ServiceRequest')
        this.closeMenu()
    };
    navProperties = () => { 
        this.setSelected(0)
        this.nav.navigate('AccountProperties')
        //console.log(this.nav.getChildNavigator('AccountProperties'))
        this.closeMenu()
    };
    navAccount = () => {
        this.setSelected(2)
        this.nav.navigate('Account')
        this.closeMenu()
    }

    /**
     * This function renders the drop down . This rendering 
     * is dependant on the parent. To change the width (or height) that the drop down 
     * menu occurs, refer to ../HomepairsHeaderTitle/HomePairsHeaderTitle.tsx and adjust the 
     * value in MIN_MENU_DROP_WIDTH
     */
    displayCorrectMenu =  (currentPage:number) => {
        if(this.props.isDropDown){
            if(!this.props.showMenu){
                return (
                    <></>
                )
            }
        }
        return this.buttonFormat(currentPage)
    }
    closeMenu = () => {
        if(this.props.isDropDown === true)
            this.props.parentCloseMenu();
    }

    /**This function renders all the selections of a button in the format the we want. 
     * Notice the use of the maps function. This function requires that we iterate through a list 
     * of objects with a specific key. Each key must be unique in the array/list.*/         
    buttonFormat(currentPage:number){
        return this.state.pages.map(function(page, i){
            return(
                <View key={i} style={{marginHorizontal: 10, justifyContent: 'center'}}>
                    <TouchableOpacity
                    onPress={page.navigationFunction}>
                        <Text 
                        style={currentPage === i ? styles.menuSelectedText : styles.menuText}>
                            {page.title}
                        </Text>
                    </TouchableOpacity>
                </View>
            )
        });
    }

    render() {
        return (
            <View style={ !this.props.isDropDown ? styles.container : styles.containerDropDown}>
                {this.displayCorrectMenu(this.selectedPage)}
             </View>
        )
    }
}

const styles = StyleSheet.create({
    container : {
        backgroundColor: '#fff',
        flexDirection: 'row',
        width: '100%',
        maxHeight: 150,
        minWidth: 500,
    },
    containerDropDown: {
        backgroundColor: '#fff',
        flexDirection: 'column',
        width: '100%',
        minWidth: 500,
    },
    menuText: {
        fontFamily: 'nunito-regular',
        paddingVertical: '3%',
        maxHeight: 50,
        fontSize: 14,
        color: '#9BA0A2',
    },
    menuSelectedText: {
        fontFamily: 'nunito-regular',
        paddingVertical: '3%',
        maxHeight: 50,
        fontSize: 14,
        alignSelf: 'baseline',
    }
})