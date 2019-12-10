import { View, StyleSheet} from 'react-native';
import React from 'react'
import {HomePairsHeaderTemplate, HeaderStyles} from './HomePairsHeaderTemplate';
import { HomePairsHeaderTitle } from './HomePairsHeaderTitle/HomePairsHeaderTitle';
import HomePairsMenu from './HomePairsHeaderMenu/HomePairsHeaderMenu';

export default class HomePairsHeaderBase extends HomePairsHeaderTemplate {

    render() {
        return (
            <View style={styles.container}>
                <View style={!this.props.header.isDropDown? {flexDirection: 'row'} : {flexDirection: 'column'}}>
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
        width: '100%',
        shadowColor: '#000',
        minWidth: 300,
        shadowOpacity: 0.1,
        shadowRadius: 1,
        shadowOffset: {width: 0, height: 2},
    }
})