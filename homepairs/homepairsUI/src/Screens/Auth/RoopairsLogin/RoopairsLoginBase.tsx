import React from 'react';
import { InputForm, InputFormProps } from 'homepairs-elements';
import strings from 'homepairs-strings';
import { NavigationStackScreenProps } from 'react-navigation-stack';
import {
    AuthPageInjectedProps,
    DarkModeInjectedProps,
} from 'homepairs-components';
import * as BaseStyles from 'homepairs-base-styles';
import { StyleSheet } from 'react-native';
import { isNullOrUndefined } from 'homepairs-utilities';

export type RoopairsLoginDispatchProps = {
    onFetchAccountProfile: (
        username: string,
        password: string,
        type: string,
        modalSetOff: () => any,
        navigationRouteCallback: () => any,
    ) => void;
};

export type LoginProps = DarkModeInjectedProps &
    RoopairsLoginDispatchProps &
    AuthPageInjectedProps &
    NavigationStackScreenProps<any, any>;
export type LoginState = {
    username: string;
    password: string;
};

const signInStrings = strings.signInPage;
const initialState: LoginState = {
    username: '',
    password: '',
};

function setInputStyles(colorTheme?: BaseStyles.ColorTheme) {
    const colors = isNullOrUndefined(colorTheme)
        ? BaseStyles.LightColorTheme
        : colorTheme;
    return StyleSheet.create({
        formTitle: {
            marginVertical: '3.5%',
            fontFamily: BaseStyles.FontTheme.primary,
            color: colors.lightGray,
        },
        input: {
            alignItems: 'center',
            alignSelf: 'center',
            margin: BaseStyles.MarginPadding.xsmallConst,
            minWidth: 40,
            width: BaseStyles.ContentWidth.max,
            height: 40,
            color: colors.tertiary,
            borderColor: colors.lightGray,
            borderWidth: 1,
            borderRadius: BaseStyles.BorderRadius.small,
            paddingHorizontal: BaseStyles.MarginPadding.mediumConst,
        },
    });
}

export default class RoopairsLoginBase extends React.Component<
    LoginProps,
    LoginState
> {
    inputFormStyle;

    constructor(props: Readonly<LoginProps>) {
        super(props);
        this.inputFormStyle = setInputStyles(props.primaryColorTheme);
        this.getFormUsername = this.getFormUsername.bind(this);
        this.getFormPassword = this.getFormPassword.bind(this);
        this.setModalOff = this.setModalOff.bind(this);
        this.navigateToMain = this.navigateToMain.bind(this);
        this.clickButton = this.clickButton.bind(this);
        this.clickHighlightedText = this.clickHighlightedText.bind(this);
        this.state = initialState;

        // Insert the callback functions to the AuthInjected bound functions
        props.clickButton(this.clickButton);
        props.clickHighlightedText(this.clickHighlightedText);
    }

    setModalOff(error: string = 'Error Message') {
        const { onChangeModalVisibility, setErrorState } = this.props;
        onChangeModalVisibility(false);
        setErrorState(true, error);
    }

    getFormUsername(childData: string) {
        this.setState({ username: childData });
    }

    getFormPassword(childData: string) {
        this.setState({ password: childData });
    }

    clickHighlightedText() {
        const {navigation} = this.props;
        navigation.navigate('SignUp');
    }

    clickButton() {
        const {onChangeModalVisibility, onFetchAccountProfile} = this.props;
        const {username, password} = this.state;

        onChangeModalVisibility(true);
        onFetchAccountProfile(
            username,
            password,
            'Roopairs',
            this.setModalOff,
            this.navigateToMain,
        );
    }

    navigateToMain() {
        const { navigation } = this.props;
        navigation.navigate('Main');
    }

    inputFormProps(): { [id: string]: InputFormProps } {
        return {
            email: {
                name: signInStrings.inputForms.email,
                parentCallBack: this.getFormUsername,
                formTitleStyle: this.inputFormStyle.formTitle,
                inputStyle: this.inputFormStyle.input,
            },
            password: {
                name: signInStrings.inputForms.password,
                parentCallBack: this.getFormPassword,
                formTitleStyle: this.inputFormStyle.formTitle,
                inputStyle: this.inputFormStyle.input,
                secureTextEntry: true,
            },
        };
    }

    render() {
        const inputFormProps = [
            {   
                key: 'email',
                name: signInStrings.inputForms.email,
                parentCallBack: this.getFormUsername,
                formTitleStyle: this.inputFormStyle.formTitle,
                inputStyle: this.inputFormStyle.input,
            },
            {   
                key: 'password',
                name: signInStrings.inputForms.password,
                parentCallBack: this.getFormPassword,
                formTitleStyle: this.inputFormStyle.formTitle,
                inputStyle: this.inputFormStyle.input,
                secureTextEntry: true,
            },
        ];

        return inputFormProps.map(properties => {
            return (
                <InputForm
                    key={properties.key}
                    name={properties.name}
                    parentCallBack={properties.parentCallBack}
                    formTitleStyle={properties.formTitleStyle}
                    inputStyle={properties.inputStyle}
                />
            );
        });
    }
}
