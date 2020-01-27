import React from 'react';
import {
    InputFormProps,
    LoginButton,
    renderInputForm,
} from 'homepair-elements';
import {
    AccountTypeRadioButton,
    DarkModeInjectedProps,
    AuthPageInjectedProps,
} from 'homepair-components';
import strings from 'homepair-strings';
import { AccountTypes, Account } from 'homepair-types';
import { NavigationStackScreenProps } from 'react-navigation-stack';
import * as BaseStyles from 'homepair-base-styles';
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
<<<<<<< HEAD
    accountType: AccountTypes,
    firstName: string,
    lastName: string,
    email: string,
    phone: string, 
    address: string, 
    city: string,
    password: String,
    cPassword: String,
}
=======
    accountType: AccountTypes;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    companyName: string;
    companyType: string;
    password: String;
    cPassword: String;
};
>>>>>>> 6c0abe500170f7c4f80d6b59e196169385a97584

const initalState = {
    accountType: AccountTypes.Tenant,
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
<<<<<<< HEAD
    password : '',
    cPassword : '',
=======
    companyName: '',
    companyType: '',
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
>>>>>>> 6c0abe500170f7c4f80d6b59e196169385a97584
}

/* * TODO: Create a module and possibly HOC/HOOK for validating user input!! * */
function isEmptyOrSpaces(str: String) {
    return str === null || str.match(/^ *$/) !== null;
}

<<<<<<< HEAD
export default class SignUpScreenBase extends React.Component<SignUpProps, SignUpState>{
    private inputFormStyle
    constructor(props: Readonly<SignUpProps>){
        super(props)
        this.inputFormStyle = setInputStyles(props.primaryColorTheme)
        this.getAccountType = this.getAccountType.bind(this)
        this.getFormFirstName = this.getFormFirstName.bind(this)
        this.getFormLastName = this.getFormLastName.bind(this)
        this.getFormEmail = this.getFormEmail.bind(this)
        this.getFormPhone = this.getFormPhone.bind(this)
        this.getFormPassword = this.getFormPassword.bind(this)
        this.getFormCPassword = this.getFormCPassword.bind(this)
        this.getFormAddress = this.getFormAddress.bind(this)
        this.getFormCity = this.getFormCity.bind(this)
        this.setModalOff = this.setModalOff.bind(this)
        this.navigateMain = this.navigateMain.bind(this)
=======
export default class SignUpScreenBase extends React.Component<
    SignUpProps,
    SignUpState
> {
    inputFormStyle: { formTitle: any; input: any };
>>>>>>> 6c0abe500170f7c4f80d6b59e196169385a97584

    formProps: { [id: string]: InputFormProps };

<<<<<<< HEAD
        this.props.clickButton(this._clickSignUp)
        this.props.clickHighlightedText(this._clickSignIn)
    }

    setModalOff(error:string = "Error Message") {
        this.props.showModal(false)
        this.props.setErrorState(true, error)
    }

    navigateMain() {
        this.props.navigation.navigate('Main')
=======
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
        this.getFormCompanyType = this.getFormCompanyType.bind(this);
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
>>>>>>> 6c0abe500170f7c4f80d6b59e196169385a97584
    }

    getAccountType(childData: AccountTypes) {
        this.setState({ accountType: childData });
    }

<<<<<<< HEAD
    getFormFirstName(childData : string){
        this.setState({firstName : childData})
    }

    getFormLastName(childData : string){
        this.setState({lastName : childData})
    }

    getFormEmail(childData : string){
        this.setState({email : childData})
=======
    getFormFirstName(childData: string) {
        this.setState({ firstName: childData });
    }

    getFormLastName(childData: string) {
        this.setState({ lastName: childData });
    }

    getFormEmail(childData: string) {
        this.setState({ email: childData });
>>>>>>> 6c0abe500170f7c4f80d6b59e196169385a97584
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
<<<<<<< HEAD
 
=======

    getFormCompanyType(childData: string) {
        this.setState({ companyType: childData });
    }

    getFormCompanyName(childData: string) {
        this.setState({ companyName: childData });
    }
>>>>>>> 6c0abe500170f7c4f80d6b59e196169385a97584

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
<<<<<<< HEAD
        }
    }

    validateCredentials: () => boolean = () => {
        //TODO: Validate credentials via a whitelist of approved inputs Right now, only checking passwords
        if(!isEmptyOrSpaces(this.state.password) && (this.state.password === this.state.cPassword))
            return true
        else {
            this.props.showModal(false)
            this.props.setErrorState(true, 'Your passwords do not match. Please try again.')
        }
        return false
    } 
    
    /** 
     * Event functions for when something occurs on this component. 
    */
    _clickSignIn = () => {
       this.props.navigation.navigate('Login')
    };
    
    _clickSignUp = () => {
        this.props.showModal(true, signUpScreenStrings.modal)
        let details : Account = {...this.state, roopairsToken: ''}
        if(this.validateCredentials()){
            this.props.generateHomePairsAccount(details, this.state.password, this.setModalOff, this.navigateMain)
            this.props.showModal(false)
        }
    }

    toRoopairsLogin = () => {
        this.props.navigation.navigate('Connect')
    };


    render() {
        if (this.state.accountType === AccountTypes.Landlord) {
            return (
            <>
                <AccountTypeRadioButton 
                parentCallBack={this.getAccountType}
                primaryColorTheme={this.props.primaryColorTheme}/>
                <View style = {{minHeight: 25, marginTop: 16}}><LoginButton name='Login with your Roopairs Account' onClick={this.toRoopairsLogin}/></View>
                <View style={{minHeight: 40, marginBottom: 20, borderBottomColor: 'grey', borderBottomWidth: StyleSheet.hairlineWidth, alignSelf: 'stretch'}}></View>
                <InputForm {...this.inputFormProps().firstName} />
                <InputForm {...this.inputFormProps().lastName}/>
                <InputForm {...this.inputFormProps().email}/>
                <InputForm {...this.inputFormProps().phone}/>
                <InputForm {...this.inputFormProps().password}/>
                <InputForm {...this.inputFormProps().confirmPassword}/>
=======
            companyName: {
                name: signUpScreenStrings.inputForms.companyName,
                parentCallBack: this.getFormCompanyName,
                formTitleStyle: this.inputFormStyle.formTitle,
                inputStyle: this.inputFormStyle.input,
            },
            companyType: {
                name: signUpScreenStrings.inputForms.companyType,
                parentCallBack: this.getFormCompanyType,
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
            <>
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
>>>>>>> 6c0abe500170f7c4f80d6b59e196169385a97584
            </>
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
            companyType,
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
                {renderInputForm(companyType)}
                {renderInputForm(password)}
                {renderInputForm(confirmPassword)}
            </>
        );
    }
}
