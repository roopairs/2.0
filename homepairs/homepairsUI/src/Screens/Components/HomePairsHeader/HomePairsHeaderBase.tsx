import { View, StyleSheet, StatusBar, Platform, TouchableOpacity, Text } from 'react-native';
import React from 'react'
import {HomePairsHeaderTemplate} from './HomePairsHeaderTemplate';
import { HomePairsHeaderTitle, HomePairsHeaderTitleProps } from './HomePairsHeaderTitle/HomePairsHeaderTitle';
import HomePairsMenu, {HomePairsMenuProps} from './HomePairsHeaderMenu/HomePairsHeaderMenu';
import { SafeAreaView, StackActions } from 'react-navigation';
import { HomePairsHeaderProps } from './HomePairsHeaderTemplate';
import * as BaseStyles from 'homepair-base-styles';
import { showGoBackButton } from '../../../state/header/actions';

const popAction = StackActions.pop({
    n: 1,
});
const backSymbol = '<'

class HomePairsHeaderBase extends HomePairsHeaderTemplate {
    colorScheme: BaseStyles.ColorTheme
    constructor(props: Readonly<HomePairsHeaderProps>){
        super(props)
        this.colorScheme = (props.primaryColorTheme == null) ? BaseStyles.LightColorTheme : props.primaryColorTheme
        styles = setColorTheme(this.colorScheme)
        this.goBack = this.goBack.bind(this)
    }

    private setHeaderTitleProps() : HomePairsHeaderTitleProps {
        return {
            showGoBackButton: this.props.header.showBackButton,
            toggleMenuCallBack: this.toggleMenu,
            isDropDown: this.props.header.isDropDown,
            allColors: this.props.allColors,
            primaryColorTheme: this.props.primaryColorTheme,
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

    showBackButton(){
        return this.props.header.showBackButton ? 
        <TouchableOpacity
            onPress={this.goBack}
            style={styles.goBackButton}>
                <Text style={styles.goBackSymbol}>{backSymbol}</Text>
            </TouchableOpacity>
        :
        <></>
    }

    /**
     * This function navigates to the previous screen and then hides the goBack button
     * if the screen is the first in the navigation stack.
     * */
    goBack(){
        this.props.navigation.dispatch(popAction)
        if(this.props.navigation.isFirstRouteInParent()){
            this.props.onShowGoBackbutton(false)
        }
        this.props.onToggleMenu(false)
    }

    render() {
        const homePairsMenuProps : HomePairsMenuProps = this.setMenuProps()
        const homePairsHeaderTitleProps : HomePairsHeaderTitleProps = this.setHeaderTitleProps()
        return (
        <SafeAreaView style={styles.container}>
            <View style={this.props.header.isDropDown ? {flexDirection: 'column'} : {flexDirection: 'row'}}>
                    <View style={{flexDirection: 'row'}}>
                        {this.showBackButton()}
                        <View style={this.showBackButton ? {marginLeft: BaseStyles.MarginPadding.largeConst, flex: 20} : {flex: 20}}>
                            <HomePairsHeaderTitle {...homePairsHeaderTitleProps}/>
                        </View>
                    </View>
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
            padding:BaseStyles.MarginPadding.mediumConst,
            paddingTop: 20, 
            alignItems: 'center', 
            position: 'absolute',
            zIndex: 1,
        }
    })
}

var styles = null;