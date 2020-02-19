import React from 'react';
import {Text, StyleSheet, View} from 'react-native';
import {LoadingModal} from './LoadingModal';

const styles = StyleSheet.create({
    container: {
        flex:1,
        width: '50%',
        minWidth: 100,
        justifyContent: 'center',
        alignSelf:'center',
        alignItems:'center',
    },
});

export function LoggingInModal(){
    return <View style={styles.container}><LoadingModal><Text>Logging In...</Text></LoadingModal></View>;
}

export function CreatingAccountModal(){
    return <View style={styles.container}><LoadingModal><Text>Creating Your Account...</Text></LoadingModal></View>;
}