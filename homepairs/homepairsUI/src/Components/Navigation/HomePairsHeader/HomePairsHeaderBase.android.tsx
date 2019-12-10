import { View, Platform, StyleSheet, StatusBar } from 'react-native';
import React from 'react'
import {HomePairsHeaderTemplate, HeaderStyles} from './HomePairsHeaderTemplate';
import { HomePairsHeaderTitle } from './HomePairsHeaderTitle/HomePairsHeaderTitle';
import HomePairsMenu from './HomePairsHeaderMenu/HomePairsHeaderMenu'

export default class HomePairsHeaderBase extends HomePairsHeaderTemplate {
    render() {
        return(
            <View style={styles.container}>
                <View style={this.props.header.isDropDown ? {flexDirection: 'column'} : {flexDirection: 'row'}}>
                    <HomePairsHeaderTitle
                    showGoBackButton={this.props.header.showBackButton} 
                    toggleMenuCallBack={this.toggleMenu}
                    isDropDown={this.props.header.isDropDown}/>
                    <HomePairsMenu
                    selectedPage={this.props.header.currentPage}
                    navigation={this.props.navigation}
                    parentCallBack={this.changePage}
                    parentCloseMenu={this.toggleMenu}
                    isDropDown={this.props.header.isDropDown}
                    showMenu={this.props.header.showMenu}/>
                </View>
            </View>
        )
  
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: HeaderStyles.container.backgroundColor,

        /**Notice android heights vary so we use the React 
         * library's StatusBar attributes. This is desgined for Android devices. 
        */
        marginTop : StatusBar.currentHeight,

        /**To create shadow in andriod, the elevation property must be set */
        elevation: 3, 
    },
})
