import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react'
import { NavigationProps } from '../../../../utility/NavigationProps';

type HomePairsMenuProps = NavigationProps & {
    selectedPage : number;
    parentCallBack?: (arg0?: any) => any;
    isDropDown?: boolean;
    showMenu?: boolean;
    parentCloseMenu?: (arg0?:any) => any;
}

export default class HomePairsMenu extends React.Component<HomePairsMenuProps>{
    nav: any;
    pages : any[]
    constructor(props: Readonly<HomePairsMenuProps>) {
        super(props);
        this.nav= this.props.navigation
        this.pages = [
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
    

    navAuth = () => { 
        this.nav.navigate('Auth') 
        this.setSelected(0);
    };
    navServiceRequest = () => { 
        this.setSelected(1);
        this.closeMenu();
        this.nav.navigate('ServiceRequest')
    };
    navProperties = () => { 
        this.setSelected(0);
        this.closeMenu();
        this.nav.navigate('AccountProperties')
    };
    navAccount = () => { 
        this.setSelected(2);
        this.closeMenu();
        this.nav.navigate('Account') 
    };
    setSelected = (index : number) => {
        this.props.parentCallBack(index)
    };
    closeMenu = () => {
        this.props.parentCloseMenu();
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
    /**This function renders all the selections of a button in the format the we want. 
     * Notice the use of the maps function. This function requires that we iterate through a list 
     * of objects with a specific key. Each key must be unique in the array/list.*/         
    buttonFormat(currentPage:number){
        return this.pages.map(function(page, i){
            return(
                <View 
                key={i}
                style={{marginHorizontal: 3, justifyContent: 'center'}}>
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
                {this.displayCorrectMenu(this.props.selectedPage)}
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
        paddingLeft: 15,
        paddingVertical: 15,
        maxHeight: 50,
        fontSize: 16,
        color: '#9BA0A2'
    },
    menuSelectedText: {
        fontFamily: 'nunito-regular',
        paddingLeft: 15,
        paddingVertical: 15,
        maxHeight: 50,
        fontSize: 16,
    }

})