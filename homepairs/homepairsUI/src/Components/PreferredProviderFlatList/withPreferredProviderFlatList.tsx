/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import {View} from 'react-native';
import * as BaseStyles from 'homepairs-base-styles';
import PreferredProviderFlatList from './PreferredProviderFlatList';

export type PreferredProviderFlatListInProps = any

export function withPreferredProviderFlatList(WrappedComponent: any){
    return function WithPreferredProviderFlatList(props: any){
        return( 
            <View style={{backgroundColor: BaseStyles.LightColorTheme.primary, flex:1}}>
                <PreferredProviderFlatList />
                <WrappedComponent {...props}/>
            </View>);
        };
};