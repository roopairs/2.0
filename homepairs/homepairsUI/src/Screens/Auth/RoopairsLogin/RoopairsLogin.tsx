<<<<<<< HEAD
import React from 'react';
import { connect } from "react-redux";
import { AccountActions } from 'homepair-redux-actions';
import {withAuthPage, AuthPassProps, withDarkMode } from 'homepair-components'
import strings from 'homepair-strings'
import HomePairColors from 'homepair-colors';
import {Image, Text, View} from 'react-native';
import {roopairsLogo} from 'homepair-images';
import RoopairsLoginBase, {RoopairsLoginDispatchProps} from './RoopairsLoginBase';

const roopairsSubtitle = <View style= {{flexDirection: 'row'}}> 
        <Image style = {{width: 60, height: 60, resizeMode: 'contain'}} source={roopairsLogo}/>
        <Text style = {{color: HomePairColors.LightModeColors.roopairs, fontSize: 15, alignSelf: 'center'}}>Sign into your Roopairs account</Text>
    </View>;

const signInStrings = strings.signInPage
const authPageParam : AuthPassProps = {
=======
import { connect } from 'react-redux';
import { AccountActions } from 'homepair-redux-actions';
import { withAuthPage, AuthPassProps, withDarkMode } from 'homepair-components';
import strings from 'homepair-strings';
import HomePairColors from 'homepair-colors';
import { Image, Text, View } from 'react-native';
import { roopairsLogo } from 'homepair-images';
import React from 'react';
import RoopairsLoginBase, { RoopairsLoginDispatchProps } from './RoopairsLoginBase';


const roopairsSubtitle = (
    <View style={{ flexDirection: 'row' }}>
        <Image
            style={{ width: 60, height: 60, resizeMode: 'contain' }}
            source={roopairsLogo}
        />
        <Text
            style={{
                color: HomePairColors.LightModeColors.roopairs,
                fontSize: 15,
                alignSelf: 'center',
            }}
        >
            Sign into your Roopairs account
        </Text>
    </View>
);

const signInStrings = strings.signInPage;
const authPageParam: AuthPassProps = {
>>>>>>> 6c0abe500170f7c4f80d6b59e196169385a97584
    button: signInStrings.button,
    subtitle: roopairsSubtitle,
    buttonColor: HomePairColors.LightModeColors.roopairs,
    loadingModalText: signInStrings.modal,
    underButtonText: 'Back to Registration? ',
    highlightedText: 'Click Here',
<<<<<<< HEAD
}

const mapDispatchToProps : (dispatch: any) => RoopairsLoginDispatchProps = (dispatch: any) => ({
    onFetchAccountProfile: (username: string, password: string,
        modalSetOff: () => any, navigationRouteCallback: () => any) => {
        dispatch(AccountActions.fetchAccount(username, password, modalSetOff, navigationRouteCallback));
=======
};

const mapDispatchToProps: (dispatch: any) => RoopairsLoginDispatchProps = (
    dispatch: any,
) => ({
    onFetchAccountProfile: (
        username: string,
        password: string,
        type: string,
        modalSetOff: () => any,
        navigationRouteCallback: () => any,
    ) => {
        dispatch(
            AccountActions.fetchAccount(
                username,
                password,
                modalSetOff,
                navigationRouteCallback,
            ),
        );
>>>>>>> 6c0abe500170f7c4f80d6b59e196169385a97584
    },
});

const RoopairsLogin = connect(null, mapDispatchToProps)(RoopairsLoginBase);

export default withDarkMode(withAuthPage(RoopairsLogin, authPageParam));
