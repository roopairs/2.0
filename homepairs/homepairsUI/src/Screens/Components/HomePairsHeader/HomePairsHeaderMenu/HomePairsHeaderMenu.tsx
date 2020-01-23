import { View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react'
import { NavigationInjectedProps, withNavigation } from 'react-navigation'
import { FontTheme } from 'homepair-base-styles';
import { MainAppStackType} from 'homepair-types';
import { MainAppStack } from '../../../../Routes/Routes';
import { DarkModeInjectedProps } from '../../WithDarkMode/WithDarkMode';
import HomePairColors from 'homepair-colors';

export type HomePairsMenuProps = DarkModeInjectedProps & {
    selectedPage : MainAppStackType;
    parentCallBack?: (arg0?: any) => any;
    isDropDown?: boolean;
    showMenu?: boolean;
    parentCloseMenu?: (arg0?:any) => any;
}

type Props = NavigationInjectedProps & HomePairsMenuProps 

class HomePairsMenu extends React.Component<Props>{
    pages : any[]
    colorScheme : any
    constructor(props: Readonly<Props>) {
        super(props);

        this.navigatePages = this.navigatePages.bind(this)
        this.setSelected = this.setSelected.bind(this)
        this.closeMenu = this.closeMenu.bind(this)
        this.buttonFormat = this.buttonFormat.bind(this)
        this.displayCorrectMenu = this.displayCorrectMenu.bind(this)

        this.colorScheme = (props.allColors == null) ? HomePairColors.LightModeColors : props.allColors
        styles = setColorScheme(this.colorScheme, baseStyles, props.isDropDown)
    }


    navigatePages(value: MainAppStackType){
        this.setSelected(value);
        this.closeMenu() 
        this.props.navigation.navigate(value.navigate)
    }

    setSelected(value : MainAppStackType){
        var page = value 
        if(value.key === MainAppStack[MainAppStack.length-1].key)
            page = MainAppStack[0]
        this.props.parentCallBack(page)
    };

    closeMenu(){
        this.props.parentCloseMenu();
    }
  
    displayCorrectMenu(currentPage: MainAppStackType){
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
    buttonFormat(currentPage:MainAppStackType){
        return MainAppStack.map((page, i) => {
            return(
                <View 
                key={i}
                style={{marginHorizontal: 3, justifyContent: 'center'}}>
                    <TouchableOpacity
                    onPress={() => this.navigatePages(page)}>
                        <Text 
                        style={page === currentPage ? styles.menuSelectedText : styles.menuText}>
                            {page.title}
                        </Text>
                    </TouchableOpacity>
                </View>
            )
        });
    }

    render() {
        styles = setColorScheme(this.colorScheme, baseStyles, this.props.isDropDown)

        return (
            <View style={ !this.props.isDropDown ? styles.container : styles.containerDropDown}>
                    {this.displayCorrectMenu(this.props.selectedPage)}
             </View>
        )
    }
}
export default withNavigation(HomePairsMenu)

const setColorScheme = (colorScheme:any, baseStyles: any, isDropDown: boolean) => {
    let newStyle = StyleSheet.create({
        container: {...baseStyles.container, backgroundColor: colorScheme.primary},
        containerDropDown: {...baseStyles.containerDropDown, backgroundColor: colorScheme.primary},
        menuText: {...baseStyles.menuText, color: colorScheme.formTitle, paddingLeft: isDropDown ? 33 : 15},
        menuSelectedText: {...baseStyles.menuSelectedText, color: colorScheme.primaryText,  paddingLeft: isDropDown ? 33 : 15}
    })
    return newStyle
}

var styles = null
/**
 * Native Applications can read from the StyleSheet directly. However, react-native-web is unable to do this 
 * so we will simply pass in a dictionary to stylize our color scheme.
 */
const baseStyles = {
    container: {
        flexDirection: 'row',
        width: '100%',
        maxHeight: 150,
        minWidth: 500,
    },
    containerDropDown: {
        flexDirection: 'column',
        width: '100%',
        minWidth: 500,
    },
    menuText: {
        fontFamily: FontTheme.primary,
        paddingVertical: 15,
        maxHeight: 50,
        fontSize: 16,
    },
    menuSelectedText: {
        fontFamily: FontTheme.primary,
        paddingVertical: 15,
        maxHeight: 50,
        fontSize: 16,
    }
}
