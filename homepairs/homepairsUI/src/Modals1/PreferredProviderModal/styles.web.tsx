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
        subContainer: {
            marginBottom: '3.5%',
            paddingTop: 1,
            paddingHorizontal: 3,
            borderRadius: 4,
            width: '100%',
            opacity: 50,
        },
        modalContainer: {
            flex:1, // Might break on mobile devices 
            maxWidth: HomePairsDimensions.MAX_PALLET,
            width: Platform.OS === 'web' ? width : BaseStyles.ContentWidth.max,
            alignSelf: 'center',
        },
        scrollStyle: {
            // flex:1,
            width: '100%',
        },
        scrollContentContainerStyle: {
            maxWidth: HomePairsDimensions.MAX_CONTENT_SIZE,
            alignItems: 'center',
            justifyContent: 'center',
            alignSelf: 'center',
            width: BaseStyles.ContentWidth.reg,
            paddingVertical: BaseStyles.MarginPadding.large,
            flexGrow: 1, // Needed to center the contents of the scroll container
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
            // flex: 1,
        },
        cardTitle: {
            color: 'white',
            fontFamily: 'nunito-regular',
            fontSize: 20,
            alignSelf: 'center',
        },
        cardTitleContainer: {
            borderTopRightRadius: 7,
            borderTopLeftRadius: 7,
            width: BaseStyles.ContentWidth.max,
            backgroundColor: colors.primary, 
            paddingVertical: BaseStyles.MarginPadding.largeConst,
            paddingHorizontal: BaseStyles.MarginPadding.largeConst,
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
        },
        closeButton: {
            flex:1,
            fontSize: 20,
            color: colors.secondary, 
            fontFamily: BaseStyles.FontTheme.primary,
        },
        detailText: {
            fontSize: BaseStyles.FontTheme.reg + 2, 
            fontFamily: BaseStyles.FontTheme.primary, 
        },
        horizontalLine: {
            alignSelf: 'center',
            marginVertical: BaseStyles.MarginPadding.mediumConst,
            width: 80,
            borderBottomWidth: 3, 
            borderBottomColor: colors.primary,
        },
        payRateContainer: {
            flexDirection: 'row', 
            justifyContent: 'center',
        },
        payRate: {
            alignSelf: 'baseline',
            color: colors.primary, 
            fontSize: BaseStyles.FontTheme.reg, 
            fontFamily: BaseStyles.FontTheme.primary,
            fontWeight: 'bold',
        }, 
        starting: {
            alignSelf: 'baseline',
            color: colors.lightGray,
            fontSize: BaseStyles.FontTheme.small, 
            fontFamily: BaseStyles.FontTheme.primary,
        },
        companyName: {
            alignSelf: 'center', 
            fontSize: 22, 
            fontFamily: BaseStyles.FontTheme.secondary, 
            fontWeight: 'bold',
            color: BaseStyles.LightColorTheme.gray,
        },
        companyImage: {
            alignSelf: 'center',
            marginVertical: 17,
            width: 200,
            height: 200,
        },
        tileContainer: {
            maxHeight: 200,
            alignSelf: 'center', 
            marginVertical: 19,
        },
    });
}