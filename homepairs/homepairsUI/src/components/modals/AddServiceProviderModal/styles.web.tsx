import React from 'react';
import {Platform, StyleSheet, Dimensions} from 'react-native';
import * as BaseStyles from 'homepairs-base-styles';
import { HomePairsDimensions } from 'homepairs-types';

export default function setInputStyles(){
    const {width} = Dimensions.get('window');
    const colors = BaseStyles.LightColorTheme;
    return StyleSheet.create({
        formTitle: {
            marginVertical: '3.5%',
            fontFamily: BaseStyles.FontTheme.primary,
            color: colors.lightGray,
        },
        input: {
            alignItems: 'center',
            alignSelf: 'center',
            margin: 0,
            minWidth: 40,
            width: BaseStyles.ContentWidth.max,
            height: 40,
            color: colors.lightGray,
            borderColor: colors.lightGray,
            borderWidth: 1,
            borderRadius: BaseStyles.BorderRadius.small,
            paddingHorizontal: BaseStyles.MarginPadding.mediumConst,
        },
        modalContainer: {
            flex: 1,
            maxWidth: HomePairsDimensions.MAX_PALLET,
            width: Platform.OS === 'web' ? width : BaseStyles.ContentWidth.max,
            alignSelf: 'center',
        },
        scrollStyle: {
            flex:1,
            width: '100%',
        },
        scrollContentContainerStyle: {
            maxWidth: HomePairsDimensions.MAX_CONTENT_SIZE,
            alignItems: 'center',
            justifyContent: 'center',
            alignSelf: 'center',
            width: BaseStyles.ContentWidth.reg,
            paddingVertical: BaseStyles.MarginPadding.large,
            flexGrow: Platform.OS === 'web' ? null : 1, // Needed to center the contents of the scroll container for mobile 
        },
        cardContainer: {
            backgroundColor: 'white',
            maxWidth: HomePairsDimensions.MAX_CONTENT_SIZE,
            width: BaseStyles.ContentWidth.reg,
            marginHorizontal: '5%',
            borderRadius: 7,
            shadowColor: 'black',
            shadowRadius: 20,
            shadowOffset: { width: 1, height: 1 },
            shadowOpacity: 100,
            elevation: 9,
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
            flex: 1,
        },
        cardTitle: {
            color: colors.tertiary,
            fontFamily: 'nunito-regular',
            fontSize: 20,
        },
        cardTitleContainer: {
            width: BaseStyles.ContentWidth.max,
            borderBottomColor: '#AFB3B5',
            paddingVertical: BaseStyles.MarginPadding.largeConst,
            paddingHorizontal: BaseStyles.MarginPadding.largeConst,
            borderBottomWidth: 1,
            alignSelf: 'center',
            justifyContent: 'flex-start',
        },
        cardWrapperStyle: {
            width: BaseStyles.ContentWidth.thin,
            marginTop: BaseStyles.MarginPadding.small,
            marginBottom: BaseStyles.MarginPadding.smallConst,
            alignSelf: 'center',
            justifyContent: 'center',
        },
        errorStyle: {
            fontFamily: BaseStyles.FontTheme.secondary, 
            fontSize: 16,
            margin: 0, 
            padding: 0,
        },
        menuStyle: {
            backgroundColor: colors.secondary,
            marginHorizontal: BaseStyles.MarginPadding.large,
            borderRadius: BaseStyles.BorderRadius.large,
            padding: BaseStyles.MarginPadding.large,
            paddingTop: 10,
            paddingBottom: 30,
            width: BaseStyles.ContentWidth.thin,
            alignSelf: 'center',
            borderColor: colors.lightGray,
            borderWidth: 1,
            overflow: 'hidden',
            marginBottom: 20,
        },
        titleText: {
            fontSize: BaseStyles.FontTheme.reg,
            fontFamily: 'nunito_regular',
        },
    });
}