import { connect } from "react-redux";
import {
  withAuthPage,
  AuthPassProps,
} from "homepairs-components";
import strings from "homepairs-strings";
import HomePairColors from "res/colors";
import { withNavigation } from "react-navigation";
import { withRouter } from "react-router-dom";
import { Platform } from "react-native";
import { fetchAccount } from 'homepairs-endpoints';
import {NavigationRouteHandler} from 'homepairs-utilities';
import { withNavigationRouteHandler } from 'src/utility/NavigationRouterHandler';
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
    onFetchAccount: async (username: string, password: string, 
        modalSetOff: (error?:string) => any, navigation: NavigationRouteHandler) => {
        await dispatch(fetchAccount(username, password, navigation, modalSetOff));
    },
});

/* * Inject the HOCs for the base login screen * */
const LoginScreen = connect(null, mapDispatchToProps)(LoginScreenBase);
const NavigateReadyLoginScreen = withNavigationRouteHandler(LoginScreen);
const NavigableLoginScreen = Platform.OS === 'web' ? withRouter(NavigateReadyLoginScreen) : withNavigation(NavigateReadyLoginScreen);

/* * Now that the Base is prepared, wrap the base to get a complete Homepairs AuthScreen * */
const AuthPage = withAuthPage(NavigableLoginScreen, authPageParam);

export default AuthPage;
