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
                navigation={this.props.navigation}/>
            </View>
        </SafeAreaView>
        )}
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: HeaderStyles.container.backgroundColor,

        /**Notice how this header is resolved based on IOS or Android. IOS versions below 11 
         * have a default header height of 20, while android heights vary so we use the React 
         * libraries StatusBar attributes. This is desgined for Android devices. 
        */
        marginTop : (Platform.OS === 'ios') ? 20 : StatusBar.currentHeight,
    },
    ios11Container: {
        backgroundColor: HeaderStyles.container.backgroundColor,
    },
})

//export default withNavigation(HomePairsHeader);