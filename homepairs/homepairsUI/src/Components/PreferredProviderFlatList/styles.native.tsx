import React from 'react'
import {StyleSheet} from 'react-native';
import { HomePairsDimensions } from 'homepairs-types';

const styles = StyleSheet.create({
    container: {
        maxWidth: HomePairsDimensions.MAX_CONTENT_SIZE,
        width: '100%',
        backgroundColor: "#374245",
        minHeight: 80,
        maxHeight: 100,
        height: '17.5%',
        alignContent: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
    },
});

export {styles}