/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import {View} from 'react-native';
import * as BaseStyles from 'homepairs-base-styles';
import { AppState, AccountTypes } from 'homepairs-types';
import { connect } from 'react-redux';
import PreferredProviderFlatList from './PreferredProviderFlatList';

export type PreferredProviderFlatListInjectedProps = any

/**
 * @deprecated since version 1.3
 * 
 * ------------------------------------------------------------------
 * withPreferredProviderFlatList 
 * ------------------------------------------------------------------
 * A HOC that adds the the preferred provider flatlist to the upper most 
 * position of a component. It will only render the Flatlist if the 
 * accountType stored in the redux-store is that for a Property Manager. 
 * 
 * This component has been deprecated. Now, the PreferredProviderFlatlist 
 * has this functionality.  
 */
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