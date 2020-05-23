/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import {View} from 'react-native';
import * as BaseStyles from 'homepairs-base-styles';
import { AppState, AccountTypes } from 'homepairs-types';
import { connect } from 'react-redux';
import PreferredProviderFlatList from './PreferredProviderFlatList';

export type PreferredProviderFlatListInjectedProps = any

export function withPreferredProviderFlatList(WrappedComponent: any){

    function mapStateToProps(state: AppState){
        return {
            accountType: state.accountProfile.accountType,
        };
    }

    function WithPreferredProviderFlatList(props: any){
        const {accountType} = props;
        return( 
            <View style={{backgroundColor: BaseStyles.LightColorTheme.primary, flex:1}}>
                {accountType === AccountTypes.Tenant ?  <></> : <PreferredProviderFlatList />}
                <WrappedComponent {...props}/>
            </View>);
    };

    return connect(mapStateToProps)(WithPreferredProviderFlatList);
};