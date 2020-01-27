import React from 'react';
import {
    InputFormProps,
    LoginButton,
    renderInputForm,
} from 'homepairs-elements';
import {
    AccountTypeRadioButton,
    DarkModeInjectedProps,
    AuthPageInjectedProps,
} from 'homepairs-components';
import strings from 'homepairs-strings';
import { AccountTypes, Account } from 'homepairs-types';
import { NavigationStackScreenProps } from 'react-navigation-stack';
import * as BaseStyles from 'homepairs-base-styles';
import { StyleSheet, View, Text } from 'react-native';

export type SignUpViewDispatchProps = {
    generateHomePairsAccount: (
        details: Account,
        password: String,
        modalSetOff: () => any,
        navigationRouteCallback: () => any,
    ) => any;
};
export type SignUpProps = DarkModeInjectedProps &
    SignUpViewDispatchProps &
    AuthPageInjectedProps &
    NavigationStackScreenProps<any, any>;

type SignUpState = {
    accountType: AccountTypes;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    companyName: string;
    password: String;
    cPassword: String;
};

const initalState = {
    accountType: AccountTypes.Tenant,
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    companyName: '',
    password: '',
    cPassword: '',
};
const signUpScreenStrings = strings.signUpPage;

function setInputStyles(colorTheme?: BaseStyles.ColorTheme) {
    const colors = colorTheme == null ? BaseStyles.LightColorTheme : colorTheme;
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
    });
}

/* * TODO: Create a module and possibly HOC/HOOK for validating user input!! * */
function isEmptyOrSpaces(str: String) {
    return str === null || str.match(/^ *$/) !== null;
}

export default class SignUpScreenBase extends React.Component<
    SignUpProps,
    SignUpState
> {
    inputFormStyle: { formTitle: any; input: any };

    formProps: { [id: string]: InputFormProps };

    constructor(props: Readonly<SignUpProps>) {
        super(props);
        this.inputFormStyle = setInputStyles(props.primaryColorTheme);
        this.getAccountType = this.getAccountType.bind(this);
        this.getFormFirstName = this.getFormFirstName.bind(this);
        this.getFormLastName = this.getFormLastName.bind(this);
        this.getFormEmail = this.getFormEmail.bind(this);
        this.getFormPhone = this.getFormPhone.bind(this);
        this.getFormPassword = this.getFormPassword.bind(this);
        this.getFormCPassword = this.getFormCPassword.bind(this);
        this.getFormAddress = this.getFormAddress.bind(this);
        this.getFormCity = this.getFormCity.bind(this);
        this.getFormCompanyName = this.getFormCompanyName.bind(this);
        this.setModalOff = this.setModalOff.bind(this);
        this.navigateMain = this.navigateMain.bind(this);

        this.state = initalState;

        this.formProps = this.inputFormProps();
        props.clickButton(this.clickSignUp);
        props.clickHighlightedText(this.clickSignIn);
    }

    setModalOff(error: string = 'Error Message') {
        const { showModal, setErrorState } = this.props;
        showModal(false);
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

    getFormPhone(childData: string) {
        this.setState({ phone: childData });
    }

    getFormPassword(childData: String) {
        this.setState({ password: childData });
    }

    getFormCPassword(childData: String) {
        this.setState({ cPassword: childData });
    }

    getFormAddress(childData: string) {
        this.setState({ address: childData });
    }

    getFormCity(childData: string) {
        this.setState({ city: childData });
    }

    getFormCompanyName(childData: string) {
        this.setState({ companyName: childData });
    }

    validateCredentials: () => boolean = () => {
        const { password, cPassword } = this.state;
        const { showModal, setErrorState } = this.props;
        // TODO: Validate credentials via a whitelist of approved inputs Right now, only checking passwords
        if (!isEmptyOrSpaces(password) && password === cPassword) return true;

        showModal(false);
        setErrorState(true, 'Your passwords do not match. Please try again.');
        return false;
    };

    /**
     * Event functions for when something occurs on this component.
     */
    clickSignIn = () => {
        const { navigation } = this.props;
        navigation.navigate('Login');
    };

    clickSignUp = () => {
        const { showModal, generateHomePairsAccount } = this.props;
        const { password } = this.state;
        showModal(true, signUpScreenStrings.modal);
        const details: Account = { ...this.state, roopairsToken: '' };
        if (this.validateCredentials()) {
            generateHomePairsAccount(
                details,
                password,
                this.setModalOff,
                this.navigateMain,
            );
            showModal(false);
        }
    };

    toRoopairsLogin = () => {
        const { navigation } = this.props;
        navigation.navigate('Connect');
    };

    inputFormProps(): { [id: string]: InputFormProps } {
        return {
            firstName: {
                name: signUpScreenStrings.inputForms.firstName,
                parentCallBack: this.getFormFirstName,
                formTitleStyle: this.inputFormStyle.formTitle,
                inputStyle: this.inputFormStyle.input,
            },
            lastName: {
                name: signUpScreenStrings.inputForms.lastName,
                parentCallBack: this.getFormLastName,
                formTitleStyle: this.inputFormStyle.formTitle,
                inputStyle: this.inputFormStyle.input,
            },
            email: {
                name: signUpScreenStrings.inputForms.email,
                parentCallBack: this.getFormEmail,
                formTitleStyle: this.inputFormStyle.formTitle,
                inputStyle: this.inputFormStyle.input,
            },
            phone: {
                name: signUpScreenStrings.inputForms.phone,
                parentCallBack: this.getFormPhone,
                formTitleStyle: this.inputFormStyle.formTitle,
                inputStyle: this.inputFormStyle.input,
            },
            password: {
                name: signUpScreenStrings.inputForms.password,
                parentCallBack: this.getFormPassword,
                formTitleStyle: this.inputFormStyle.formTitle,
                inputStyle: this.inputFormStyle.input,
                secureTextEntry: true,
            },
            confirmPassword: {
                name: signUpScreenStrings.inputForms.confirmPassword,
                parentCallBack: this.getFormCPassword,
                formTitleStyle: this.inputFormStyle.formTitle,
                inputStyle: this.inputFormStyle.input,
                secureTextEntry: true,
            },
            address: {
                name: signUpScreenStrings.inputForms.address,
                parentCallBack: this.getFormAddress,
                formTitleStyle: this.inputFormStyle.formTitle,
                inputStyle: this.inputFormStyle.input,
            },
            city: {
                name: signUpScreenStrings.inputForms.city,
                parentCallBack: this.getFormCity,
                formTitleStyle: this.inputFormStyle.formTitle,
                inputStyle: this.inputFormStyle.input,
            },
            companyName: {
                name: signUpScreenStrings.inputForms.companyName,
                parentCallBack: this.getFormCompanyName,
                formTitleStyle: this.inputFormStyle.formTitle,
                inputStyle: this.inputFormStyle.input,
            },
        };
    }

    navigateMain() {
        const { navigation } = this.props;
        navigation.navigate('Main');
    }

    renderLoginButton(accountType: AccountTypes) {
        return accountType === AccountTypes.Landlord ? (
            <View style={{marginTop: BaseStyles.MarginPadding.large}}>
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

    render() {
        const { accountType } = this.state;
        const { primaryColorTheme } = this.props;
        const {
            firstName,
            lastName,
            email,
            phone,
            companyName,
            password,
            confirmPassword,
        } = this.formProps;
        return (
            <>
                <AccountTypeRadioButton
                    parentCallBack={this.getAccountType}
                    primaryColorTheme={primaryColorTheme}
                />
                {this.renderLoginButton(accountType)}
                {renderInputForm(firstName)}
                {renderInputForm(lastName)}
                {renderInputForm(email)}
                {renderInputForm(phone)}
                {renderInputForm(companyName)}
                {renderInputForm(password)}
                {renderInputForm(confirmPassword)}
            </>
        );
    }
}
