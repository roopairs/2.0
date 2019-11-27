import { View, Platform, StyleSheet, StatusBar } from 'react-native';
import React from 'react'
import {HomePairsHeaderTemplate, HeaderStyles} from './HomePairsHeaderTemplate';
import { HomePairsHeaderTitle } from './HomePairsHeaderTitle/HomePairsHeaderTitle';
import HomePairsMenu from './HomePairsHeaderMenu/HomePairsHeaderMenu';
import { SafeAreaView } from 'react-navigation';

export default class HomePairsHeader extends HomePairsHeaderTemplate {

    render() {
        return (
        <SafeAreaView style={styles.ios11Container}>
            <View style={{flexDirection: 'column'}}>
                <HomePairsHeaderTitle parentCallBack={this.toggleMenu}/>
                <HomePairsMenu 
                showMenu={this.state.showMenu} 
                navigation={this.props.navigation}
                parentCallBack={this.toggleMenu}/>
            </View>
        </SafeAreaView>
        )}
}

const styles = StyleSheet.create({
    ios11Container: {
        backgroundColor: HeaderStyles.container.backgroundColor,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 1,
        shadowOffset: {width: 0, height: 2},
        elevation: 1,
    },
})