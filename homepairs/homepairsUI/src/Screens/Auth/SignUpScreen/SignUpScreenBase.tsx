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
import { isNullOrUndefined, isPasswordValid, isPhoneNumberValid, isEmailSyntaxValid, isAlphaCharacterOnly } from 'homepairs-utilities';
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
    phone: string;
    streetAddress: string;
    city: string;
    companyName: string;
    password: string;
    cPassword: string;
    error: {[id:string] : boolean};
};

const initalError : {[id:string] : boolean} = {
    firstName: false,
    lastName: false,
    email: false,
    phone: false,
    streetAddress: false,
    city: false,
    companyName: false,
    password: false,
    cPassword: false,
};

const initalState : SignUpState = {
    accountType: AccountTypes.Tenant,
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    streetAddress: '',
    city: '',
    companyName: '',
    password: '',
    cPassword: '',
    error: {...initalError},
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

        this.state = {...initalState};

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

    getFormPhone(childData: string) {
        this.setState({ phone: childData });
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

    getFormCompanyName(childData: string) {
        this.setState({ companyName: childData });
    }

    validateCredentials: () => boolean = () => {
        const { onChangeModalVisibility, setErrorState } = this.props;
        const {
            firstName,
            lastName,
            password,
            cPassword,
            email,
            phone,
        } = this.state;
        const newErrorState: {[id:string]: boolean} = {...initalError};
        let isValid:boolean = true;
        const errorMessages: string[] = [];
        
        // TODO: Add verfication for Company Type, Address, and others
        if(!isAlphaCharacterOnly(firstName)){
            isValid = false;
            newErrorState.firstName=true;
            errorMessages.push('You have entered an invalid first name!');
        }
        if(!isAlphaCharacterOnly(lastName)){
            isValid = false;
            newErrorState.lastName=true;
            errorMessages.push('You have entered an invalid last name!');
        }
        if(!isEmailSyntaxValid(email)){
            isValid = false;
            newErrorState.email=true;
            errorMessages.push('You have entered an invalid email!');
        }
        if(!isPhoneNumberValid(phone)){
            isValid = false;
            newErrorState.phone=true;
            errorMessages.push('You have entered an invalid phone number!');

        }
        if(!(password === cPassword)){
            isValid = false;
            newErrorState.password=true;
            newErrorState.cPassword=true;
            errorMessages.push("You're passwords do not match! Please enter them again.");
        }else if (!isPasswordValid(password)){
            isValid = false;
            newErrorState.password=true;
            newErrorState.cPassword=true;
            // TODO: Create a message that tells the user what values their password should have.
            errorMessages.push("You have entered an invalid password");
        } 

        this.setState({error: newErrorState});
        if(!isValid){
            const message = errorMessages.length > 1 ? 'Please fix the problems below' : errorMessages[0];
            setErrorState(true, message);
            onChangeModalVisibility(false);
        }

        return isValid;
    };

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
        onChangeModalVisibility(true);
        const details: Account = { ...this.state, roopairsToken: '' };
        if (this.validateCredentials()) {
            generateHomePairsAccount(
                details,
                password,
                this.setModalOff,
                navigation,
            );
            onChangeModalVisibility(false);
        }
    };

    toRoopairsLogin = () => {
        const { navigation } = this.props;
        navigation.navigate('Connect');
    };

    navigateMain() {
        const { navigation } = this.props;
        navigation.navigate('Main');
    }

    renderAllInputForms() {
        const {error} = this.state;
        const {firstName, lastName, email, password, cPassword, phone} = error;
        const {formTitle, input, errorFormTitle, errorInput} = this.inputFormStyle;
        const inputFormProps = [
            {
                key: signUpScreenStrings.inputForms.firstName,
                name: signUpScreenStrings.inputForms.firstName,
                parentCallBack: this.getFormFirstName,
                formTitleStyle: !firstName ? formTitle : errorFormTitle,
                inputStyle: !firstName ? input : errorInput,
            },
            {
                key: signUpScreenStrings.inputForms.lastName,
                name: signUpScreenStrings.inputForms.lastName,
                parentCallBack: this.getFormLastName,
                formTitleStyle: !lastName ? formTitle : errorFormTitle,
                inputStyle: !lastName ? input : errorInput,
            },
            {
                key: signUpScreenStrings.inputForms.email,
                name: signUpScreenStrings.inputForms.email,
                parentCallBack: this.getFormEmail,
                formTitleStyle: !email ? formTitle : errorFormTitle,
                inputStyle: !email ? input : errorInput,
            },
            {
                key: signUpScreenStrings.inputForms.phone,
                name: signUpScreenStrings.inputForms.phone,
                parentCallBack: this.getFormPhone,
                formTitleStyle: !phone? formTitle : errorFormTitle,
                inputStyle: !phone ? input : errorInput,
            },
            {
                key: signUpScreenStrings.inputForms.password,
                name: signUpScreenStrings.inputForms.password,
                parentCallBack: this.getFormPassword,
                formTitleStyle: !password ? formTitle : errorFormTitle,
                inputStyle: !password ? input : errorInput,
                secureTextEntry: true,
            },
            {
                key: signUpScreenStrings.inputForms.confirmPassword,
                name: signUpScreenStrings.inputForms.confirmPassword,
                parentCallBack: this.getFormCPassword,
                formTitleStyle: !cPassword ? formTitle : errorFormTitle,
                inputStyle: !cPassword ? input : errorInput,
                secureTextEntry: true,
            },
            {
                key: signUpScreenStrings.inputForms.address,
                name: signUpScreenStrings.inputForms.address,
                parentCallBack: this.getFormAddress,
                formTitleStyle: this.inputFormStyle.formTitle,
                inputStyle: this.inputFormStyle.input,
            },
            {
                key: signUpScreenStrings.inputForms.city,
                name: signUpScreenStrings.inputForms.city,
                parentCallBack: this.getFormCity,
                formTitleStyle: this.inputFormStyle.formTitle,
                inputStyle: this.inputFormStyle.input,
            },
            {
                key: signUpScreenStrings.inputForms.companyName,
                name: signUpScreenStrings.inputForms.companyName,
                parentCallBack: this.getFormCompanyName,
                formTitleStyle: this.inputFormStyle.formTitle,
                inputStyle: this.inputFormStyle.input,
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
                    secureTextEntry={properties.secureTextEntry}
                />
            );
        });
    }

    renderRoopairsLoginPage() {
        const { accountType } = this.state;
        return accountType === AccountTypes.Landlord ? (
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

    render() {
        const { primaryColorTheme } = this.props;
        return (
            <>
                <AccountTypeRadioButton
                    parentCallBack={this.getAccountType}
                    primaryColorTheme={primaryColorTheme}
                />
                {this.renderRoopairsLoginPage()}
                {this.renderAllInputForms()}
            </>
        );
    }
}
