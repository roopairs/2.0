import React from 'react';
import { InputForm, LoginButton} from 'homepairs-elements';
import {
    AccountTypeRadioButton,
    DarkModeInjectedProps,
    AuthPageInjectedProps,
} from 'homepairs-components';
import strings from 'homepairs-strings';
import { AccountTypes, Account } from 'homepairs-types';
import * as BaseStyles from 'homepairs-base-styles';
import { StyleSheet, View, Text } from 'react-native';
import { isNullOrUndefined, isPasswordValid, isEmailSyntaxValid, isAlphaCharacterOnly, isEmptyOrSpaces } from 'homepairs-utilities';
import { NavigationSwitchProp, NavigationSwitchScreenProps } from 'react-navigation';

export type SignUpViewDispatchProps = {
    generateHomePairsAccount: (
        details: Account,
        password: String,
        modalSetOff: () => any,
        navigation: NavigationSwitchProp,
    ) => any;
};

export type SignUpProps = DarkModeInjectedProps &
    SignUpViewDispatchProps &
    AuthPageInjectedProps &
    NavigationSwitchScreenProps;

type SignUpState = {
    accountType: AccountTypes;
    firstName: string;
    lastName: string;
    email: string;
    streetAddress: string;
    city: string;
    password: string;
    cPassword: string;
};

const baseState = {
    firstName: '',
    lastName: '',
    email: '',
    streetAddress: '',
    city: '',
    password: '',
    cPassword: '',
};

const initalState : SignUpState = {
    accountType: AccountTypes.Tenant,
    ...baseState,
};
const signUpScreenStrings = strings.signUpPage;

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
            color: colors.lightGray,
            borderColor: colors.lightGray,
            borderWidth: 1,
            borderRadius: BaseStyles.BorderRadius.small,
            paddingHorizontal: BaseStyles.MarginPadding.mediumConst,
        },
        errorFormTitle: {
            marginVertical: '3.5%',
            fontFamily: BaseStyles.FontTheme.primary,
            color: colors.red,
        },
        errorInput: {
            alignItems: 'center',
            alignSelf: 'center',
            margin: BaseStyles.MarginPadding.xsmallConst,
            minWidth: 40,
            width: BaseStyles.ContentWidth.max,
            height: 40,
            color: colors.red,
            borderColor: colors.red,
            shadowColor: colors.red,
            shadowRadius: 5,
            shadowOpacity: .5,
            borderWidth: 1,
            borderRadius: BaseStyles.BorderRadius.small,
            paddingHorizontal: BaseStyles.MarginPadding.mediumConst,
        },
    });
}

export default class SignUpScreenBase extends React.Component<
    SignUpProps,
    SignUpState
> {
    inputFormStyle;

    firstNameRef;

    lastNameRef;

    emailRef;

    addressRef;

    cityRef;

    passwordRef;

    cPasswordRef;

    constructor(props: Readonly<SignUpProps>) {
        super(props);
        this.inputFormStyle = setInputStyles(props.primaryColorTheme);
        this.getAccountType = this.getAccountType.bind(this);
        this.getFormFirstName = this.getFormFirstName.bind(this);
        this.getFormLastName = this.getFormLastName.bind(this);
        this.getFormEmail = this.getFormEmail.bind(this);
        this.getFormPassword = this.getFormPassword.bind(this);
        this.getFormCPassword = this.getFormCPassword.bind(this);
        this.getFormAddress = this.getFormAddress.bind(this);
        this.getFormCity = this.getFormCity.bind(this);
        this.setModalOff = this.setModalOff.bind(this);
        this.navigateMain = this.navigateMain.bind(this);
        this.resetForms = this.resetForms.bind(this);
        this.resetState = this.resetState.bind(this);

        this.state = {...initalState};
        this.firstNameRef = React.createRef();
        this.lastNameRef = React.createRef();
        this.emailRef = React.createRef();
        this.passwordRef = React.createRef();
        this.cPasswordRef = React.createRef();
        this.addressRef = React.createRef();
        this.cityRef = React.createRef();
        

        props.clickButton(this.clickSignUp);
        props.clickHighlightedText(this.clickSignIn);
    }

    setModalOff(error: string = 'Error Message') {
        const { onChangeModalVisibility, setErrorState } = this.props;
        onChangeModalVisibility(false);
        setErrorState(true, error);
    }

    getAccountType(childData: AccountTypes) {
        this.setState({ accountType: childData });
    }

    getFormFirstName(childData: string) {
        this.setState({ firstName: childData });
    }

    getFormLastName(childData: string) {
        this.setState({ lastName: childData });
    }

    getFormEmail(childData: string) {
        this.setState({ email: childData });
    }

    getFormPassword(childData: string) {
        this.setState({ password: childData });
    }

    getFormCPassword(childData: string) {
        this.setState({ cPassword: childData });
    }

    getFormAddress(childData: string) {
        this.setState({ streetAddress: childData });
    }

    getFormCity(childData: string) {
        this.setState({ city: childData });
    }

    /**
     * Event methods for when something occurs on this component.
     */
    clickSignIn = () => {
        const { navigation } = this.props;
        navigation.navigate('Login');
    };

    clickSignUp = () => {
        const { onChangeModalVisibility, generateHomePairsAccount, navigation } = this.props;
        const { password } = this.state;
        this.resetForms();
        if (this.validateForms()) {
            onChangeModalVisibility(true);
            const details: Account = { ...this.state, roopairsToken: '' };
            generateHomePairsAccount(details, password, this.setModalOff, navigation);
            onChangeModalVisibility(false);
        }
    };

    toRoopairsLogin = () => {
        const { navigation } = this.props;
        navigation.navigate('Connect');
    };

    validateForms() {
        const {firstName, lastName, password, cPassword, email, city, streetAddress, accountType} = this.state;
        let check = true;
        if (!isAlphaCharacterOnly(firstName)) {
            check = false;
            this.firstNameRef.current.setError(true);
        }
        if (!isAlphaCharacterOnly(lastName)) {
            check = false;
            this.lastNameRef.current.setError(true);
        }
        if (!isEmailSyntaxValid(email)) {
            check = false;
            this.emailRef.current.setError(true);
        }
        if (!isPasswordValid(password)) {
            check = false;
            this.passwordRef.current.setError(true);
        }
        if (!(password === cPassword)) {
            check = false;
            this.cPasswordRef.current.setError(true);
        }
        if (isEmptyOrSpaces(streetAddress) && accountType === AccountTypes.Tenant) {
            check = false;
            this.addressRef.current.setError(true);
        }
        if (isEmptyOrSpaces(city) && accountType === AccountTypes.Tenant) {
            check = false;
            this.cityRef.current.setError(true);
        }
        return check;
    }

    resetForms() {
        const {accountType} = this.state;
        if (accountType === AccountTypes.Tenant) {
            this.addressRef.current.setError(false);
            this.cityRef.current.setError(false);
        }
        this.firstNameRef.current.setError(false);
        this.lastNameRef.current.setError(false);
        this.emailRef.current.setError(false);
        this.passwordRef.current.setError(false);
        this.cPasswordRef.current.setError(false);
    }

    navigateMain() {
        const { navigation } = this.props;
        navigation.navigate('Main');
    }

    resetState() {
        this.setState(baseState);
    }

    renderInputForms() {
        const {formTitle, input } = this.inputFormStyle;
        const {accountType} = this.state;
        const inputFormProps = [
            {
                ref: this.firstNameRef,
                key: signUpScreenStrings.inputForms.firstName,
                name: signUpScreenStrings.inputForms.firstName,
                parentCallBack: this.getFormFirstName,
                formTitleStyle: formTitle,
                inputStyle: input,
                errorMessage: 'First Name cannot be empty',
            },
            {
                ref: this.lastNameRef,
                key: signUpScreenStrings.inputForms.lastName,
                name: signUpScreenStrings.inputForms.lastName,
                parentCallBack: this.getFormLastName,
                formTitleStyle: formTitle,
                inputStyle: input,
                errorMessage: 'Last Name cannot be empty',
            },
            {
                ref: this.addressRef,
                key: signUpScreenStrings.inputForms.address,
                name: signUpScreenStrings.inputForms.address,
                parentCallBack: this.getFormAddress,
                formTitleStyle: formTitle,
                inputStyle: input,
                errorMessage: 'Address cannot be empty',
            },
            {
                ref: this.cityRef,
                key: signUpScreenStrings.inputForms.city,
                name: signUpScreenStrings.inputForms.city,
                parentCallBack: this.getFormCity,
                formTitleStyle: formTitle,
                inputStyle: input,
                errorMessage: 'City cannot be empty',
            },
            {
                ref: this.emailRef,
                key: signUpScreenStrings.inputForms.email,
                name: signUpScreenStrings.inputForms.email,
                parentCallBack: this.getFormEmail,
                formTitleStyle: formTitle,
                inputStyle: input,
                errorMessage: 'Invalid email',
            },
            {
                ref: this.passwordRef,
                key: signUpScreenStrings.inputForms.password,
                name: signUpScreenStrings.inputForms.password,
                parentCallBack: this.getFormPassword,
                formTitleStyle: formTitle,
                inputStyle: input,
                secureTextEntry: true,
                errorMessage: 'Password is invalid! Must be at least 6 characters',
            },
            {
                ref: this.cPasswordRef,
                key: signUpScreenStrings.inputForms.confirmPassword,
                name: signUpScreenStrings.inputForms.confirmPassword,
                parentCallBack: this.getFormCPassword,
                formTitleStyle: formTitle,
                inputStyle: input,
                secureTextEntry: true,
                errorMessage: 'Passwords do not match',
            },
        ];
        const pmForms = (inputFormProps.filter(inputForm => (inputForm.name !== signUpScreenStrings.inputForms.address && inputForm.name !== signUpScreenStrings.inputForms.city)));
        const forms = accountType === AccountTypes.PropertyManager ? pmForms : inputFormProps;
        return forms.map(properties => {
            return (
                <InputForm
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

    renderRoopairsLoginButton() {
        const { accountType } = this.state;
        return accountType === AccountTypes.PropertyManager ? (
            <View style={{ marginTop: BaseStyles.MarginPadding.large }}>
                <LoginButton
                    name="Login with your Roopairs Account"
                    onClick={this.toRoopairsLogin}
                />
                <View
                    style={{
                        minHeight: 30,
                        alignItems: 'center',
                        marginTop: 20,
                    }}
                >
                    <Text style={{ fontSize: 20 }}>OR</Text>
                </View>
            </View>
        ) : (
            <></>
        );
    }


    // how to reset error messages when switch back and forth from radio button
    render() {
        const { primaryColorTheme } = this.props;
        return (
            <>
                <AccountTypeRadioButton
                    parentCallBack={this.getAccountType}
                    resetForms={this.resetForms}
                    primaryColorTheme={primaryColorTheme}
                />
                {this.renderRoopairsLoginButton()}
                {this.renderInputForms()}
            </>
        );
    }
}
