import { connect } from "react-redux";
import LoginScreenBase from "./LoginScreenBase";
import { AccountActions } from "homepair-redux-actions";
import { LoginViewDispatchProps } from "./LoginScreenBase";
import {
  withAuthPage,
  AuthPassProps,
  withDarkMode,
  LoggingInModal,
  withModal
} from "homepair-components";
import strings from "homepair-strings";
import HomePairColors from "res/colors";
import { withNavigation } from "react-navigation";

const signInStrings = strings.signInPage;
const authPageParam: AuthPassProps = {
  button: signInStrings.button,
  subtitle: signInStrings.subtitle,
  buttonColor: HomePairColors.LightModeColors.blueButton,
  loadingModalText: signInStrings.modal,
  underButtonText: signInStrings.newUserText,
  highlightedText: signInStrings.signUpHighlight
};
const mapDispatchToProps: (dispatch: any) => LoginViewDispatchProps = (
  dispatch: any
) => ({
  onFetchAccountProfile: (
    username: string,
    password: string,
    modalSetOff: () => any,
    navigationRouteCallback: () => any
  ) => {
    dispatch(
      AccountActions.fetchAccount(
        username,
        password,
        modalSetOff,
        navigationRouteCallback
      )
    );
  }
});

const LoginScreen = connect(null, mapDispatchToProps)(LoginScreenBase);
const AuthPage = withAuthPage(LoginScreen, authPageParam);
const AuthPageWithNav = withNavigation(AuthPage);
const AuthWithModal = withModal(AuthPageWithNav, LoggingInModal);
export default withDarkMode(AuthWithModal);
