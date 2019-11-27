import { View, Platform, StyleSheet, StatusBar } from 'react-native';
import React from 'react'
import {HomePairsHeaderTemplate, HeaderStyles} from './HomePairsHeaderTemplate';
import { HomePairsHeaderTitle } from './HomePairsHeaderTitle/HomePairsHeaderTitle';
import HomePairsMenu from './HomePairsHeaderMenu/HomePairsHeaderMenu'

export default class HomePairsHeader extends HomePairsHeaderTemplate {
    render() {
        return(
            <View style={styles.container}>
            <View style={{flexDirection: 'column'}}>
                <HomePairsHeaderTitle parentCallBack={this.toggleMenu}/>
                <HomePairsMenu 
                showMenu={this.state.showMenu} 
                navigation={this.props.navigation}
                selectedPage={this.props.currentPage}
                parentCallBack={this.toggleMenu}
                />
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
        elevation: 3,
    },
    ios11Container: {
        backgroundColor: HeaderStyles.container.backgroundColor,
    },
})
