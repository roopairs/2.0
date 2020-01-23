import React from "react";
import {
  InputForm,
  InputFormProps,
  LoginButton,
} from "src/Elements/Elements";
import {
  AccountTypeRadioButton,
  DarkModeInjectedProps
} from "homepair-components";
import strings from "homepair-strings";
import { AccountTypes, Account } from "homepair-types";
import { NavigationStackScreenProps } from "react-navigation-stack";
import { AuthPageInjectedProps } from "homepair-components";
import * as BaseStyles from "homepair-base-styles";
import { StyleSheet, View, Text } from "react-native";
import { FontTheme } from "homepair-base-styles";
import Divider from "react-native-divider";

export type SignUpViewDispatchProps = {
  generateHomePairsAccount: (
    details: Account,
    password: String,
    modalSetOff: () => any,
    navigationRouteCallback: () => any
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
  companyType: string;
  password: String;
  cPassword: String;
};

const initalState = {
  accountType: AccountTypes.Tenant,
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  companyName: "",
  companyType: "",
  password: "",
  cPassword: ""
};
const signUpScreenStrings = strings.signUpPage;

/**TODO: Create a module and possibly HOC/HOOK for validating user input!! */
function isEmptyOrSpaces(str: String) {
  return str === null || str.match(/^ *$/) !== null;
}

export default class SignUpScreenBase extends React.Component<
  SignUpProps,
  SignUpState
> {
  private inputFormStyle;
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

    this.props._clickButton(this._clickSignUp);
    this.props._clickHighlightedText(this._clickSignIn);
  }

  setModalOff(error: string = "Error Message") {
    this.props._onChangeModalVisibility(false);
    this.props._setErrorState(true, error);
  }
  navigateMain() {
    this.props.navigation.navigate("Main");
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

  getFormCompanyType(childData: string) {
    this.setState({ companyType: childData });
  }

  getFormCompanyName(childData: string) {
    this.setState({ companyName: childData });
  }

  private inputFormProps(): { [id: string]: InputFormProps } {
    return {
      firstName: {
        name: signUpScreenStrings.inputForms.firstName,
        parentCallBack: this.getFormFirstName,
        formTitleStyle: this.inputFormStyle.formTitle,
        inputStyle: this.inputFormStyle.input
      },
      lastName: {
        name: signUpScreenStrings.inputForms.lastName,
        parentCallBack: this.getFormLastName,
        formTitleStyle: this.inputFormStyle.formTitle,
        inputStyle: this.inputFormStyle.input
      },
      email: {
        name: signUpScreenStrings.inputForms.email,
        parentCallBack: this.getFormEmail,
        formTitleStyle: this.inputFormStyle.formTitle,
        inputStyle: this.inputFormStyle.input
      },
      phone: {
        name: signUpScreenStrings.inputForms.phone,
        parentCallBack: this.getFormPhone,
        formTitleStyle: this.inputFormStyle.formTitle,
        inputStyle: this.inputFormStyle.input
      },
      password: {
        name: signUpScreenStrings.inputForms.password,
        parentCallBack: this.getFormPassword,
        formTitleStyle: this.inputFormStyle.formTitle,
        inputStyle: this.inputFormStyle.input,
        secureTextEntry: true
      },
      confirmPassword: {
        name: signUpScreenStrings.inputForms.confirmPassword,
        parentCallBack: this.getFormCPassword,
        formTitleStyle: this.inputFormStyle.formTitle,
        inputStyle: this.inputFormStyle.input,
        secureTextEntry: true
      },
      address: {
        name: signUpScreenStrings.inputForms.address,
        parentCallBack: this.getFormAddress,
        formTitleStyle: this.inputFormStyle.formTitle,
        inputStyle: this.inputFormStyle.input
      },
      city: {
        name: signUpScreenStrings.inputForms.city,
        parentCallBack: this.getFormCity,
        formTitleStyle: this.inputFormStyle.formTitle,
        inputStyle: this.inputFormStyle.input
      },
      companyName: {
        name: signUpScreenStrings.inputForms.companyName,
        parentCallBack: this.getFormCompanyName,
        formTitleStyle: this.inputFormStyle.formTitle,
        inputStyle: this.inputFormStyle.input
      },
      companyType: {
        name: signUpScreenStrings.inputForms.companyType,
        parentCallBack: this.getFormCompanyType,
        formTitleStyle: this.inputFormStyle.formTitle,
        inputStyle: this.inputFormStyle.input
      }
    };
  }

  validateCredentials: () => boolean = () => {
    //TODO: Validate credentials via a whitelist of approved inputs Right now, only checking passwords
    if (!isEmptyOrSpaces(this.state.password) &&
        this.state.password === this.state.cPassword
    )
      return true;
    else {
      this.props._onChangeModalVisibility(false);
      this.props._setErrorState(
        true,
        "Your passwords do not match. Please try again."
      );
    }
    return false;
  };

  /**
   * Event functions for when something occurs on this component.
   */
  _clickSignIn = () => {
    this.props.navigation.navigate("Login");
  };
  _clickSignUp = () => {
    this.props._onChangeModalVisibility(true);
    let details: Account = { ...this.state, roopairsToken: "" };
    if (this.validateCredentials()) {
      this.props.generateHomePairsAccount(
        details,
        this.state.password,
        this.setModalOff,
        this.navigateMain
      );
      this.props._onChangeModalVisibility(false);
    }
  };

  toRoopairsLogin = () => {
    this.props.navigation.navigate("Connect");
  };

  renderRoopairsAccountButton() {
    return this.state.accountType === AccountTypes.Landlord ? (
      <>
        <LoginButton
          name="Login with your Roopairs Account"
          onClick={this.toRoopairsLogin}
        />
        <View style={{ minHeight: 30, alignItems: "center", marginTop: 20 }}>
          <Text style={{ fontSize: 20 }}>OR</Text>
        </View>
      </>
    ) : (
      <></>
    );
  }

  render() {
    return (
      <>
        <AccountTypeRadioButton
          parentCallBack={this.getAccountType}
          primaryColorTheme={this.props.primaryColorTheme}
        />
        {this.renderRoopairsAccountButton()}
        <InputForm {...this.inputFormProps().firstName} />
        <InputForm {...this.inputFormProps().lastName} />
        <InputForm {...this.inputFormProps().email} />
        <InputForm {...this.inputFormProps().phone} />
        <InputForm {...this.inputFormProps().companyName} />
        <InputForm {...this.inputFormProps().companyType} />
        <InputForm {...this.inputFormProps().password} />
        <InputForm {...this.inputFormProps().confirmPassword} />
      </>
    );
  }
}

function setInputStyles(colorTheme?: BaseStyles.ColorTheme) {
  let colors = colorTheme == null ? BaseStyles.LightColorTheme : colorTheme;
  return StyleSheet.create({
    formTitle: {
      marginVertical: "3.5%",
      fontFamily: FontTheme.primary,
      color: colors.lightGray
    },
    input: {
      alignItems: "center",
      alignSelf: "center",
      margin: BaseStyles.MarginPadding.xsmallConst,
      minWidth: 40,
      width: BaseStyles.ContentWidth.max,
      height: 40,
      color: colors.lightGray,
      borderColor: colors.lightGray,
      borderWidth: 1,
      borderRadius: BaseStyles.BorderRadius.small,
      paddingHorizontal: BaseStyles.MarginPadding.mediumConst
    }
  });
}
