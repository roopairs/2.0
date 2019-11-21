import { View, StyleSheet} from 'react-native';
import React from 'react'
import {HomePairsHeaderTemplate, HeaderStyles} from './HomePairsHeaderTemplate';
import { HomePairsHeaderTitle } from './HomePairsHeaderTitle/HomePairsHeaderTitle';
import HomePairsMenu from './HomePairsHeaderMenu/HomePairsHeaderMenu';

export default class HomePairsHeader extends HomePairsHeaderTemplate {
render() {
    return (
       <View style={styles.container}>
           <View style={{flexDirection: 'column'}}>
            <HomePairsHeaderTitle parentCallBack={this.toggleMenu}/>
           </View>
       </View>
    )
 }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: HeaderStyles.container.backgroundColor,
        marginTop : 20,
    }
})