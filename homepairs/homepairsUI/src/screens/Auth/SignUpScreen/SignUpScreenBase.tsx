import React from 'react';
import { InputForm, LoginButton, GoogleInputForm} from 'homepairs-elements';
import {
    AccountTypeRadioButton,
    AuthPageInjectedProps,
} from 'homepairs-components';
import strings from 'homepairs-strings';
import { AccountTypes, Account } from 'homepairs-types';
import * as BaseStyles from 'homepairs-base-styles';
import { StyleSheet, View } from 'react-native';
import {isPasswordValid, isEmailSyntaxValid, 
    isAlphaCharacterOnly, isEmptyOrSpaces } from 'homepairs-utilities';
import { navigationPages, NavigationRouteHandler, NavigationRouteScreenProps } from 'homepairs-routes';
import {Divider} from 'react-native-elements';

export type SignUpViewDispatchProps = {
    generateHomePairsAccount: (
        details: Account,
        password: String,
        modalSetOff: () => any,
        navigation: NavigationRouteHandler,
    ) => any;
};

export type SignUpProps =
    SignUpViewDispatchProps &
    AuthPageInjectedProps &
    NavigationRouteScreenProps;

type SignUpState = {
    accountType: AccountTypes;
    firstName: string;
    lastName: string;
    email: string;
    address: string;
    password: string;
    cPassword: string;
};

const baseState = {
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    password: '',
    cPassword: '',
};

const initalState : SignUpState = {
    accountType: AccountTypes.Tenant,
    ...baseState,
};
const signUpScreenStrings = strings.signUpPage;
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


export class SignUpScreenBase extends React.Component<SignUpProps,SignUpState> {
    firstNameRef;

    lastNameRef;

    emailRef;

    addressRef;

    passwordRef;

    cPasswordRef;


    constructor(props: Readonly<SignUpProps>) {
        super(props);
        this.getAccountType = this.getAccountType.bind(this);
        this.getFormFirstName = this.getFormFirstName.bind(this);
        this.getFormLastName = this.getFormLastName.bind(this);
        this.getFormEmail = this.getFormEmail.bind(this);
        this.getFormPassword = this.getFormPassword.bind(this);
        this.getFormCPassword = this.getFormCPassword.bind(this);
        this.getFormAddress = this.getFormAddress.bind(this);
        this.setModalOff = this.setModalOff.bind(this);
        this.resetForms = this.resetForms.bind(this);
        this.resetState = this.resetState.bind(this);

        this.state = {...initalState};
        this.firstNameRef = React.createRef();
        this.lastNameRef = React.createRef();
        this.emailRef = React.createRef();
        this.passwordRef = React.createRef();
        this.cPasswordRef = React.createRef();
        this.addressRef = React.createRef();
        
        props.clickButton(this.clickSignUp);
        props.clickHighlightedText(this.clickSignIn);
    }

    setModalOff(error: string = 'Error Message') {
        const { setErrorState, navigation } = this.props;
        navigation.navigate(navigationPages.SignUpScreen);
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
        this.setState({ address: childData });
    }

    /**
     * Event methods for when something occurs on this component.
     */
    clickSignIn = () => {
        const { navigation } = this.props;
        navigation.navigate(navigationPages.LoginScreen);
    };

    clickSignUp = () => {
        const { generateHomePairsAccount, navigation} = this.props;
        const { password } = this.state;
        this.resetForms();
        if (this.validateForms()) {
            navigation.navigate(navigationPages.CreatingAccountModal, null, true);
            const details: Account = { ...this.state, roopairsToken: '' };
            generateHomePairsAccount(details, password, this.setModalOff, navigation);     
        }
    };

    toRoopairsLogin = () => {
        const { navigation } = this.props;
        navigation.navigate(navigationPages.RoopairsLogin);
    };

    validateForms() {
        const {firstName, lastName, password, cPassword, email, address, accountType} = this.state;
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
        if (isEmptyOrSpaces(address) && accountType === AccountTypes.Tenant) {
            check = false;
            this.addressRef.current.setError(true);
        }
        return check;
    }

    resetForms() {
        const {accountType} = this.state;
        if (accountType === AccountTypes.Tenant) {
            this.addressRef.current.setError(false);
        }
        this.firstNameRef.current.setError(false);
        this.lastNameRef.current.setError(false);
        this.emailRef.current.setError(false);
        this.passwordRef.current.setError(false);
        this.cPasswordRef.current.setError(false);
    }

    resetState() {
        this.setState(baseState);
    }

    renderInputForms() {
        const {formTitle, input } = styles;
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
        return inputFormProps.map(properties => {
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

    renderAddressForm() {
        const {address, accountType} = this.state;

        return accountType === AccountTypes.PropertyManager ? <></> : (
            <GoogleInputForm 
                ref={this.addressRef}
                key={signUpScreenStrings.inputForms.address}
                name={signUpScreenStrings.inputForms.address}
                parentCallBack={this.getFormAddress}
                formTitleStyle={styles.formTitle}
                inputStyle={styles.input}
                value={address}
                errorMessage='Address cannot be empty'        
            />
        );
    }

    renderRoopairsLoginButton() {
        const { accountType } = this.state;
        return accountType === AccountTypes.PropertyManager ? (
            <View style={{ marginTop: BaseStyles.MarginPadding.large }}>
                <LoginButton
                    name="Sign in with your Roopairs Account"
                    onClick={this.toRoopairsLogin}
                />
                <Divider style={{
                    alignItems: 'center',
                    marginTop: 25,
                    marginBottom: 20,
                    width: 400,
                }}/> 
            </View>
        ) : (
            <></>
        );
    }


    // how to reset error messages when switch back and forth from radio button
    render() {
        return (
            <>
                <AccountTypeRadioButton
                    parentCallBack={this.getAccountType}
                    resetForms={this.resetForms}/>
                {this.renderRoopairsLoginButton()}
                {this.renderAddressForm()}
                {this.renderInputForms()}
            </>
        );
    }
}
