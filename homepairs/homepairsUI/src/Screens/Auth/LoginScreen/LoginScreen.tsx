import { connect } from "react-redux";
import { AccountActions } from "homepairs-redux-actions";
import {
  withAuthPage,
  AuthPassProps,
  withDarkMode,
  LoggingInModal,
  withModal,
} from "homepairs-components";
import strings from "homepairs-strings";
import HomePairColors from "res/colors";
import { withNavigation, NavigationSwitchProp } from "react-navigation";
import LoginScreenBase, { LoginViewDispatchProps } from "./LoginScreenBase";


const signInStrings = strings.signInPage;
const authPageParam: AuthPassProps = {
  button: signInStrings.button,
  subtitle: signInStrings.subtitle,
  buttonColor: HomePairColors.LightModeColors.blueButton,
  loadingModalText: signInStrings.modal,
  underButtonText: signInStrings.newUserText,
  highlightedText: signInStrings.signUpHighlight,
};
const mapDispatchToProps : (dispatch: any) => LoginViewDispatchProps = (dispatch: any) => ({
    onFetchAccountProfile: (username: string, password: string, 
        modalSetOff: () => any, navigation: NavigationSwitchProp) => {
        dispatch(AccountActions.fetchAccount(username, password, navigation, modalSetOff));
    },
});

/* * Inject the HOCs for the base login screen * */
const LoginScreen = connect(null, mapDispatchToProps)(LoginScreenBase);
const LoginScreenWithNav = withNavigation(LoginScreen);

/* * Now that the Base is prepared, wrap the base to get a complete Homepairs AuthScreen * */
const AuthPage = withAuthPage(LoginScreenWithNav, authPageParam);

export default AuthPage;
