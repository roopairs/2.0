import { connect } from 'react-redux';
import { AccountActions } from 'homepairs-redux-actions';
import { withAuthPage, AuthPassProps, withDarkMode } from 'homepairs-components';
import strings from 'homepairs-strings';
import HomePairColors from 'homepairs-colors';
import { Image, Text, View } from 'react-native';
import { roopairsLogo } from 'homepairs-images';
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
    button: signInStrings.button,
    subtitle: roopairsSubtitle,
    buttonColor: HomePairColors.LightModeColors.roopairs,
    loadingModalText: signInStrings.modal,
    underButtonText: 'Back to Registration? ',
    highlightedText: 'Click Here',
};

const mapDispatchToProps: (dispatch: any) => RoopairsLoginDispatchProps = (
    dispatch: any,
) => ({
    onFetchAccountProfile: (
        username: string,
        password: string,
        navigation,
        modalSetOff: () => any,
    ) => {
        dispatch(
            AccountActions.fetchAccount(
                username,
                password,
                navigation,
                modalSetOff,
            ),
        );
    },
});

const RoopairsLogin = connect(null, mapDispatchToProps)(RoopairsLoginBase);

export default withDarkMode(withAuthPage(RoopairsLogin, authPageParam));
