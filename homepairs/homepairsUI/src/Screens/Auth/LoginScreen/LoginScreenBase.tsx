import React from 'react';
import { InputForm } from 'homepairs-elements';
import strings from 'homepairs-strings';
import {AuthPageInjectedProps} from 'homepairs-components';
import * as BaseStyles from 'homepairs-base-styles';
import { StyleSheet} from 'react-native';
import { isEmailSyntaxValid, isPasswordValid } from 'homepairs-utilities';
import { 
    NavigationRouteHandler, 
    NavigationRouteScreenProps,
    navigationPages,
} from 'homepairs-routes';

export type LoginViewDispatchProps = {
    onFetchAccount: (
        username: string,
        password: string,
        modalSetOff: () => any,
        navigation: NavigationRouteHandler
    ) => void;
};

export type LoginProps = LoginViewDispatchProps &
    AuthPageInjectedProps &
    NavigationRouteScreenProps;

export type LoginState = {
    username: string;
    password: string;
};

const signInStrings = strings.signInPage;
const initialState: LoginState = {
    username: '',
    password: '',
};

const colors = BaseStyles.LightColorTheme;
const styles = StyleSheet.create({
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




/**
 * ---------------------------------------------------
 * Login Screen Base
 * ---------------------------------------------------
 * Basic forms used to when the user navigates to the homepairs website. These forms are intended
 * to have very basic authentication and assumes that the user has an account with Homepairs and 
 * Roopairs. Upon, failure to authenticate, this with set the error state of the parent component 
 * (withAuth) and will show errors within its input forms. This is intended to be used with the 
 * withAuth High Order Component and the redux store for full functionality.
 */
export class LoginScreenBase extends React.Component<LoginProps,LoginState> {

    loginRef;

    passwordRef;

    constructor(props: Readonly<LoginProps>) {
        super(props);
        this.getFormUsername = this.getFormUsername.bind(this);
        this.getFormPassword = this.getFormPassword.bind(this);
        this.setModalOff = this.setModalOff.bind(this);
        this.clickButton = this.clickButton.bind(this);
        this.clickHighlightedText = this.clickHighlightedText.bind(this);
        this.state = initialState;
        this.loginRef = React.createRef();
        this.passwordRef = React.createRef();
        props.clickButton(this.clickButton);
        props.clickHighlightedText(this.clickHighlightedText);
    }

    /**
     * Sets the state of the modal to hidden and then displays an error message. If none is passed
     * defaults to 'Error Message'
     */

     /* 
        TODO: There is no clean way to redirect from a modal. You must simply 
        navigate back to the previous page and then move forward from the previous page.
     */
     
    setModalOff(error?:string) {
        const { navigation, setErrorState } = this.props;
        navigation.navigate(navigationPages.LoginScreen);
        setErrorState(true, error);
    }

    getFormUsername(childData: string) {
        this.setState({ username: childData });
    }

    getFormPassword(childData: string) {
        this.setState({ password: childData });
    }

    clickHighlightedText() {
        const { navigation } = this.props;
        navigation.navigate(navigationPages.SignUpScreen);
    }

    validateForms(username: string, password: string) {
        let check = true;
        if (!isEmailSyntaxValid(username)) {
            this.loginRef.current.setError(true);
            check = false;
        }
        if (!isPasswordValid(password)) {
            this.passwordRef.current.setError(true);
            check = false;
        }
        return check;
    }

    resetForms() {
        this.loginRef.current.setError(false);
        this.passwordRef.current.setError(false);
    }

    clickButton() {
        const { onFetchAccount, navigation } = this.props;
        const { username, password } = this.state;
        this.resetForms();
        if (this.validateForms(username, password)) {
            navigation.navigate(navigationPages.LoggingInModal, null, true);
            onFetchAccount(username, password, this.setModalOff, navigation);
        }
    }

    render() {
        const inputFormProps = [
            {
                ref: this.loginRef,
                key: signInStrings.inputForms.email,
                name: signInStrings.inputForms.email,
                parentCallBack: this.getFormUsername,
                formTitleStyle: styles.formTitle,
                inputStyle: styles.input,
                errorMessage: 'Invalid Username! Must be an email',
            },
            {
                ref: this.passwordRef,
                key: signInStrings.inputForms.password,
                name: signInStrings.inputForms.password,
                parentCallBack: this.getFormPassword,
                formTitleStyle: styles.formTitle,
                inputStyle: styles.input,
                secureTextEntry: true,
                errorMessage: 'Invalid password. Must be at least 6 characters',
            },
        ];
        return inputFormProps.map((properties, index) => {
            const testID = `login-screen-input-form-${index.toString()}`;
            return (
                <InputForm
                    testID={testID}
                    ref={properties.ref}
                    key={properties.key}
                    name={properties.name}
                    parentCallBack={properties.parentCallBack}
                    formTitleStyle={properties.formTitleStyle}
                    inputStyle={properties.inputStyle}
                    secureTextEntry={properties.secureTextEntry}
                    errorMessage={properties.errorMessage}
                />
            );
        });
    }
}
