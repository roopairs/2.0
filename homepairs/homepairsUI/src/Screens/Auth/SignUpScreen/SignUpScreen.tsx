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
  CreatingAccountModal,
  withModal
} from "homepair-components";
import HomePairColors from "res/colors";
import { withNavigation } from "react-navigation";

const signUpStrings = strings.signUpPage;
const authPageParam: AuthPassProps = {
  button: signUpStrings.button,
  subtitle: signUpStrings.subtitle,
  loadingModalText: signUpStrings.modal,
  buttonColor: HomePairColors.LightModeColors.blueButton,
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

const AuthPage = withAuthPage(SignUpScreen, authPageParam);
const AuthPageWithNav = withNavigation(AuthPage);
const AuthWithModal = withModal(AuthPageWithNav, CreatingAccountModal);
export default withDarkMode(AuthWithModal);
