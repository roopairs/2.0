import { View, Platform, StyleSheet, StatusBar } from 'react-native';
import React from 'react'
import {HomePairsHeaderTemplate, HeaderStyles} from './HomePairsHeaderTemplate';
import { HomePairsHeaderTitle } from './HomePairsHeaderTitle/HomePairsHeaderTitle';
import HomePairsMenu from './HomePairsHeaderMenu/HomePairsHeaderMenu';
import { SafeAreaView } from 'react-navigation';

export default class HomePairsHeaderBase extends HomePairsHeaderTemplate {

    render() {
        return (
        <SafeAreaView style={styles.container}>
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
        </SafeAreaView>
        )}
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: HeaderStyles.container.backgroundColor,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 1,
        shadowOffset: {width: 0, height: 2},
        elevation: 1,
    },
})