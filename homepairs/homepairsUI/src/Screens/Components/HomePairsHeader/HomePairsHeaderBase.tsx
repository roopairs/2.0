import { View, StyleSheet, StatusBar, Platform } from 'react-native';
import React from 'react'
import {HomePairsHeaderTemplate} from './HomePairsHeaderTemplate';
import { HomePairsHeaderTitle, HomePairsHeaderTitleProps } from './HomePairsHeaderTitle/HomePairsHeaderTitle';
import HomePairsMenu, {HomePairsMenuProps} from './HomePairsHeaderMenu/HomePairsHeaderMenu';
import { SafeAreaView } from 'react-navigation';
import { HomePairsHeaderProps } from './HomePairsHeaderTemplate';
import * as BaseStyles from 'homepair-base-styles';


class HomePairsHeaderBase extends HomePairsHeaderTemplate {
    colorScheme: BaseStyles.ColorTheme
    constructor(props: Readonly<HomePairsHeaderProps>){
        super(props)
        this.colorScheme = (props.primaryColorTheme == null) ? BaseStyles.LightColorTheme : props.primaryColorTheme
        styles = setColorTheme(this.colorScheme)
    }

    private setHeaderTitleProps() : HomePairsHeaderTitleProps {
        return {
            showGoBackButton: this.props.header.showBackButton,
            toggleMenuCallBack: this.toggleMenu,
            isDropDown: this.props.header.isDropDown,
            allColors: this.props.allColors,
            primaryColorTheme: this.props.primaryColorTheme
        }
    }
    
    private setMenuProps() : HomePairsMenuProps {
        return {
            selectedPage: this.props.header.currentPage,
            parentCallBack: this.changePage,
            parentCloseMenu: this.toggleMenu, 
            isDropDown: this.props.header.isDropDown,
            showMenu: this.props.header.showMenu,
            allColors: this.props.allColors,
            primaryColorTheme: this.props.primaryColorTheme
        }
    }

    render() {
        const homePairsMenuProps : HomePairsMenuProps = this.setMenuProps()
        const homePairsHeaderTitleProps : HomePairsHeaderTitleProps = this.setHeaderTitleProps()
        return (
        <SafeAreaView style={styles.container}>
            <View style={this.props.header.isDropDown ? {flexDirection: 'column'} : {flexDirection: 'row'}}>
                    <HomePairsHeaderTitle {...homePairsHeaderTitleProps}/>
                    <HomePairsMenu {...homePairsMenuProps}/>
                </View>
        </SafeAreaView>
        )}
}
export default HomePairsHeaderBase

function setColorTheme(colorScheme?:BaseStyles.ColorTheme){
    let colors = (colorScheme == null) ? BaseStyles.LightColorTheme : colorScheme
    return StyleSheet.create({
        container: {
            shadowOpacity: 0.1,
            shadowRadius: 1,
            shadowOffset: {width: 0, height: 2},
            elevation: 1,
            marginTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight,
            backgroundColor: colors.primary, 
            shadowColor: colors.shadow,
        }
    })
}

var styles = null;