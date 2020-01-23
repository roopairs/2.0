import { connect } from "react-redux";
import SignUpScreenBase from "./SignUpScreenBase";
import { AccountActions } from "homepair-redux-actions";
import { SignUpViewDispatchProps } from "./SignUpScreenBase";
import { Account, AccountTypes } from "homepair-types";
import strings from "homepair-strings";
import {
  AuthPassProps,
  withAuthPage,
  withDarkMode,
  withModal,
  SigningUpModal
} from "homepair-components";
import { LightColorTheme } from "homepair-base-styles";
import { withNavigation } from "react-navigation";

const signUpStrings = strings.signUpPage;
const authPageParam: AuthPassProps = {
  button: signUpStrings.button,
  subtitle: signUpStrings.subtitle,
  buttonColor: LightColorTheme.primary,
  underButtonText: signUpStrings.currentUserText,
  highlightedText: signUpStrings.signUpHighlight
};
const mapDispatchToProps: (dispatch: any) => SignUpViewDispatchProps = (
  dispatch: any
) => ({
  //TODO: Finish sign up when backend is ready
  generateHomePairsAccount: (
    details: Account,
    password: String,
    modalSetOff: () => any,
    navigationRouteCallback: () => any
  ) => {
    //TODO: Remember to Call dispatch when sign up is ready in backend
    if (details.accountType === AccountTypes.Landlord) {
      dispatch(
        AccountActions.generateAccountForPM(
          details,
          password,
          modalSetOff,
          navigationRouteCallback
        )
      );
    } else {
      dispatch(
        AccountActions.generateAccountForTenant(
          details,
          password,
          modalSetOff,
          navigationRouteCallback
        )
      );
    }
  }
});

const SignUpScreen = connect(null, mapDispatchToProps)(SignUpScreenBase);
const NavigationAuthPage = withNavigation(SignUpScreen)
const FormattedComponent = withAuthPage(NavigationAuthPage, authPageParam);
const ComponentWithModal = withModal(FormattedComponent, SigningUpModal);
export default withDarkMode(ComponentWithModal);
